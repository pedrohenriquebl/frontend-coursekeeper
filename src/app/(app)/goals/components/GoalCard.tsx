import { getGoalProgress, getStatusColor, getStatusIcon } from "@/components/courses/CourseModals/CourseIcons";
import { cn } from "@/lib/utils";
import { Goal } from "@/types";
import { TrendingUp, Trophy, XCircle } from "lucide-react";

type GoalCardProps = {
    goal: Goal;
};


export default function GoalCard({ goal }: GoalCardProps) {
    return (
        <div
            key={goal.id}
            className={cn(
                "bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border transition-all hover:scale-105 duration-200",
                goal.status === "CONCLUIDA"
                    ? "border-green-600/50"
                    : goal.status === "VENCIDA"
                        ? "border-red-600/50"
                        : "border-gray-700/50 hover:border-emerald-500/50",
            )}
        >
            {/* Goal Header */}
            <div className="flex items-start justify-between mb-4 flex-wrap sm:no-wrap">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                        {goal.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                        {goal.description}
                    </p>
                    {goal.topic ? (
                        <span className="inline-block bg-gray-600/50 px-2 py-1 rounded text-xs text-gray-300 min-h-[20px]">
                            {goal.topic}
                        </span>
                    ) : (
                        <div className="min-h-[20px]" /> 
                    )}
                </div>
                <span
                    className={cn(
                        "flex items-center gap-1 text-xs px-2 py-1 rounded-full",
                        getStatusColor(goal.status),
                    )}
                >
                    {getStatusIcon(goal.status)}
                    {goal.status === "ATIVA"
                        ? "Ativa"
                        : goal.status === "CONCLUIDA"
                            ? "Concluída"
                            : "Vencida"}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progresso</span>
                    <span>
                        {goal.current}/{goal.target} {goal.unit}
                    </span>
                </div>
                <div className="bg-gray-600 rounded-full h-3">
                    <div
                        className={cn(
                            "h-3 rounded-full transition-all duration-300",
                            goal.status === "CONCLUIDA"
                                ? "bg-green-500"
                                : goal.status === "VENCIDA"
                                    ? "bg-red-500"
                                    : "bg-emerald-500",
                        )}
                        style={{
                            width: `${Math.min(getGoalProgress(goal), 100)}%`,
                        }}
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1 gap-4 sm:gap-0">
                    <span>{Math.round(getGoalProgress(goal))}% concluído</span>
                    <span>
                        {goal.status === "ATIVA"
                            ? `Prazo: ${new Date(goal.deadline).toLocaleDateString("pt-BR")}`
                            : goal.completedAt
                                ? `Concluída: ${new Date(goal.completedAt).toLocaleDateString("pt-BR")}`
                                : `Venceu: ${new Date(goal.deadline).toLocaleDateString("pt-BR")}`}
                    </span>
                </div>
            </div>

            {/* Achievement Notification */}
            {goal.status === "CONCLUIDA" && (
                <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-3 flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    <div>
                        <p className="text-sm font-medium text-green-400">
                            Meta Atingida!
                        </p>
                        <p className="text-xs text-green-300">
                            Parabéns pelo seu empenho e dedicação
                        </p>
                    </div>
                </div>
            )}

            {/* Near Completion Notification */}
            {goal.status === "ATIVA" && getGoalProgress(goal) >= 90 && (
                <div className="bg-yellow-600/20 border border-yellow-600/50 rounded-lg p-3 flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-yellow-400" />
                    <div>
                        <p className="text-sm font-medium text-yellow-400">
                            Quase lá!
                        </p>
                        <p className="text-xs text-yellow-300">
                            Você está muito perto de atingir esta meta
                        </p>
                    </div>
                </div>
            )}

            {goal.status === "VENCIDA" && (
                <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-3 flex items-center gap-3">
                    <XCircle className="h-5 w-5 text-red-400" />
                    <div>
                        <p className="text-sm font-medium text-red-400">
                            Meta Perdida
                        </p>
                        <p className="text-xs text-red-300">
                            Infelizmente, você não conseguiu atingir esta meta
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}