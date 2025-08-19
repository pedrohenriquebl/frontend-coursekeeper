'use client'

import { BookOpen, Target, TrendingUp, Trophy } from "lucide-react";
import { GoalOverviewCard } from "./GoalOverviewCard";

interface GoalsCardsProps {
    activeGoals: number;
    goalsCompleted: number;
    goalsRating: number;
    totalProgressInHours: number;
    totalGoalInHours: number;
}

export function GoalsOverviewCard({
    activeGoals,
    goalsCompleted,
    goalsRating,
    totalProgressInHours,
    totalGoalInHours
}: GoalsCardsProps) {
    const totalProgress = `${totalProgressInHours}/${totalGoalInHours}h`
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <GoalOverviewCard
                icon={Target}
                iconColor="text-emerald-400"
                gradientFrom="rgba(16,185,129,0.2)"
                gradientTo="rgba(5,150,105,0.2)"
                value={activeGoals}
                label="Metas Ativas"
            />
            <GoalOverviewCard
                icon={Trophy}
                iconColor="text-green-400"
                gradientFrom="rgba(34,197,94,0.2)"
                gradientTo="rgba(22,163,74,0.2)"
                value={goalsCompleted}
                label="Metas Concluídas"
            />
            <GoalOverviewCard
                icon={TrendingUp}
                iconColor="text-purple-400"
                gradientFrom="rgba(168,85,247,0.2)"
                gradientTo="rgba(139,92,246,0.2)"
                value={`${goalsRating.toFixed(2)}%`}
                label="Taxa de Sucesso"
            />
            <GoalOverviewCard
                icon={BookOpen}
                iconColor="text-orange-400"
                gradientFrom="rgba(251,191,36,0.2)"
                gradientTo="rgba(245,158,11,0.2)"
                value={totalProgress}
                label="Progresso Anual"
            />
        </div>
    );
}
