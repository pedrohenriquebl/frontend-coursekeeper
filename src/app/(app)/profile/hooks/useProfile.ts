"use client";

import { useAuthUser } from "@/context/authUserContext";
import { userService } from "@/services/api/user/userService";
import { User } from "@/types";
import { useCallback } from "react";

export function useProfile() {
  const { user, setUser } = useAuthUser();

  const updateProfile = useCallback(
    async (userData: Partial<User>) => {
      if (!user) return;

      const filteredData: Partial<User> = {};
      for (const field of [
        "firstName",
        "lastName",
        "description",
        "profileImage",
        "email",
        "github",
        "linkedin",
        "website",
      ] as const) {
        const value = userData[field];
        if (value !== null && value !== "") filteredData[field] = value;
      }

      const updatedUser = await userService.updateProfile(
        user.id,
        filteredData
      );

      setUser(updatedUser);
    },
    [user, setUser]
  );

  const uploadAvatar = useCallback(
    async (file: File) => {
      const result = await userService.uploadAvatar(file);

      if (result.user) {
        setUser(result.user);
      }

      return result;
    },
    [setUser]
  );

  return {
    user,
    updateProfile,
    uploadAvatar,
  };
}
