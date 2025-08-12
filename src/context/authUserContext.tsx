'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, userService } from "@/services/api/user/userService";

export interface AuthUserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoadingUser: boolean;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
}

const AuthUserContext = createContext<AuthUserContextType | undefined>(undefined);

export const AuthUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

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

  async function loginUser(email: string, password: string) {
    setIsLoadingUser(true);
    try {
      const loginResponse = await userService.login(email, password);
      if (loginResponse?.access_token) {
        sessionStorage.setItem("auth_token", loginResponse.access_token);
        setUser(loginResponse.user);

        const fullUser = await userService.getMe();
        setUser(fullUser);

        return true;
      }
      return false;
    } finally {
      setTimeout(() => setIsLoadingUser(false), 0);
    }
  }

  async function logoutUser() {
    sessionStorage.removeItem("auth_token");
    setUser(null);
  }

  return (
    <AuthUserContext.Provider value={{ user, setUser, loginUser, logoutUser, isLoadingUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export const useAuthUser = () => {
  const context = useContext(AuthUserContext);
  if (!context) throw new Error("useAuthUser must be used within AuthUserProvider");
  return context;
};