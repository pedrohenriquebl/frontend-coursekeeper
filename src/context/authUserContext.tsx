'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { userService } from "@/services/api/user/userService";
import { User } from "@/types";

export interface AuthUserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoadingUser: boolean;
  loginUser: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logoutUser: () => void;
  authError: string | null;
  setAuthError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthUserContext = createContext<AuthUserContextType | undefined>(undefined);

export const AuthUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const token = sessionStorage.getItem("auth_token");
    if (token) {
      userService.getMe()
        .then((fetchedUser) => {
          if (isMounted) setUser(fetchedUser);
        })
        .catch(() => {
          if (isMounted) {
            sessionStorage.removeItem("auth_token");
            setUser(null);
          }
        })
        .finally(() => {
          if (isMounted) setIsLoadingUser(false);
        });
    } else {
      setIsLoadingUser(false);
    }

    return () => { isMounted = false; };
  }, []);

  async function loginUser(email: string, password: string): Promise<{ success: boolean; message?: string }> {
    setIsLoadingUser(true);
    setAuthError(null);
    try {
      const loginResponse = await userService.login(email, password);
      if (loginResponse?.access_token) {
        sessionStorage.setItem("auth_token", loginResponse.access_token);
        setUser(loginResponse.user);

        const fullUser = await userService.getMe();
        setUser(fullUser);

        return { success: true };
      }
      setAuthError("Credenciais inválidas.");
      return { success: false, message: "Credenciais inválidas." };
    } catch (error: unknown) {
      let message = "Erro ao fazer login.";
      if (
        typeof error === "object" &&
        error !== null &&
        "isAxiosError" in error &&
        (error as { isAxiosError?: boolean }).isAxiosError &&
        "response" in error &&
        typeof (error as { response?: unknown }).response === "object" &&
        (error as { response?: unknown }).response !== null
      ) {
        const response = (error as { response: unknown }).response;
        if (
          typeof response === "object" &&
          response !== null &&
          "data" in response &&
          typeof (response as { data?: unknown }).data === "object" &&
          (response as { data?: unknown }).data !== null
        ) {
          const data = (response as { data: unknown }).data;
          if (
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof (data as { message?: unknown }).message === "string"
          ) {
            message = (data as { message: string }).message || "";
          }
        }
      } else if (error instanceof Error && typeof error.message === "string") {
        message = error.message;
      }
      setAuthError(message);
      return { success: false, message };
    } finally {
      setIsLoadingUser(false);
    }
  }

  async function logoutUser() {
    sessionStorage.removeItem("auth_token");
    setUser(null);
  }

  return (
    <AuthUserContext.Provider value={{ user, setUser, loginUser, logoutUser, isLoadingUser, authError, setAuthError }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUser = () => {
  const context = useContext(AuthUserContext);
  if (!context) throw new Error("useAuthUser must be used within AuthUserProvider");
  return context;
};