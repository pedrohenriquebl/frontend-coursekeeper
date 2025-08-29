'use client'

import { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import { useProfile } from "../hooks/useProfile";
import { User } from "@/types";
import { ProfileCards } from "./ProfileCards";
import { useAchievements } from "../hooks/useAchievements";
import AchievementsCard from "./AchievementsCard";
import SocialInfo from "./SocialInfo";

export default function ProfileClient() {
    const { updateProfile, user, uploadAvatar } = useProfile();
    const { achievements } = useAchievements();
    const [editedProfile, setEditedProfile] = useState<User | null>(user);
    const [isEditing, setIsEditing] = useState(false);

    console.log(user);

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

    const generalCoursesInfo = user?.generalCoursesInfo ?? {
        totalCourses: 0,
        totalCompletedCourses: 0,
        totalStudiedHours: 0,
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
            <ProfileCards
                totalCourses={generalCoursesInfo.totalCourses ?? 0}
                coursesCompleted={generalCoursesInfo.totalCompletedCourses ?? 0}
                totalProgressInHours={generalCoursesInfo.totalStudiedHours ?? 0}
                currentLoginStreak={user?.currentLoginStreak ?? 0}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AchievementsCard achievements={achievements} />
                <SocialInfo profile={editedProfile} />
            </div>
        </div>
    )
}