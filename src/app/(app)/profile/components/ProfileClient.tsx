'use client'

import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import { useProfile } from "../hooks/useProfile";
import { User } from "@/types";

export default function ProfileClient() {
    const { updateProfile, user, uploadAvatar } = useProfile();
    const [editedProfile, setEditedProfile] = useState<User | null>(user);
    const [isEditing, setIsEditing] = useState(false);

    if (!user || !editedProfile) return null;

    const handleSetEditedProfile = (profile: Partial<User>) => {
        setEditedProfile(prev => prev ? { ...prev, ...profile } : prev);
    };

    const handleSave = () => {
        updateProfile(editedProfile as Partial<User>);
        setIsEditing(false);
    };

    const handleAvatarChange = async (file: File) => {
        const result = await uploadAvatar(file);

        if (result?.path) {
            handleSetEditedProfile({ profileImage: result.path });
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <ProfileHeader
                profile={editedProfile}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                setEditedProfile={handleSetEditedProfile}
                handleSave={handleSave}
                onAvatarChange={handleAvatarChange}
            />
        </div>
    )
}