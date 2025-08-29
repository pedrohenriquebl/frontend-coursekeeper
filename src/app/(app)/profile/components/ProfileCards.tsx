'use client'

import { Award, BookOpen, Clock, Target } from "lucide-react";
import { ProfileCard } from "./ProfileCard";

interface ProfileCardsProps {
    totalCourses: number;
    coursesCompleted: number;
    totalProgressInHours: number;
    currentLoginStreak: number;
}

export function ProfileCards({
    totalCourses,
    coursesCompleted,
    totalProgressInHours,
    currentLoginStreak,
}: ProfileCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ProfileCard
                icon={BookOpen}
                iconColor="text-emerald-400"
                gradientFrom="rgba(16,185,129,0.2)"
                gradientTo="rgba(5,150,105,0.2)"
                value={totalCourses}
                label="Total de Cursos"
            />
            <ProfileCard
                icon={Award}
                iconColor="text-green-400"
                gradientFrom="rgba(34,197,94,0.2)"
                gradientTo="rgba(22,163,74,0.2)"
                value={coursesCompleted}
                label="Concluídos"
            />
            <ProfileCard
                icon={Clock}
                iconColor="text-purple-400"
                gradientFrom="rgba(168,85,247,0.2)"
                gradientTo="rgba(139,92,246,0.2)"
                value={`${totalProgressInHours}h`}
                label="Horas Estudadas"
            />
            <ProfileCard
                icon={Target}
                iconColor="text-orange-400"
                gradientFrom="rgba(251,191,36,0.2)"
                gradientTo="rgba(245,158,11,0.2)"
                value={currentLoginStreak}
                label="Dias Consecutivos"
            />
        </div>
    );
}
