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

        console.log("Updating profile with data: ", userData);

        const filteredData = Object.fromEntries(
            Object.entries({
                firstName: userData.firstName,
                lastName: userData.lastName,
                description: userData.description,
                profileImage: userData.profileImage,
                email: userData.email,
                github: userData.github,
                linkedin: userData.linkedin,
                website: userData.website,
            }).filter(([_, value]) => value !== null && value !== '')
        );

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
