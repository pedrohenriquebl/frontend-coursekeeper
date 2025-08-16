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
                bgColor="bg-emerald-600/20"
                value={activeGoals}
                label="Metas Ativas"
            />
            <GoalOverviewCard
                icon={Trophy}
                iconColor="text-green-400"
                bgColor="bg-green-600/20"
                value={goalsCompleted}
                label="Metas Concluídas"
            />
            <GoalOverviewCard
                icon={TrendingUp}
                iconColor="text-purple-400"
                bgColor="bg-purple-600/20"
                value={`${goalsRating.toFixed(2)}%`}
                label="Taxa de Sucesso"
            />
            <GoalOverviewCard
                icon={BookOpen}
                iconColor="text-orange-400"
                bgColor="bg-orange-600/20"
                value={totalProgress}
                label="Progresso Anual"
            />
        </div>
    );
}