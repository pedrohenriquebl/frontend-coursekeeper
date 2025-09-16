import { getGoalProgress, getStatusIcon } from "@/components/courses/CourseModals/CourseIcons";
import { cn } from "@/lib/utils";
import { Goal } from "@/types";
import { Trash2, TrendingUp, Trophy, XCircle } from "lucide-react";

type GoalCardProps = {
    goal: Goal;
    onDelete: (goal: Goal) => void;
};


export default function GoalCard({ goal, onDelete }: GoalCardProps) {
    const getGoalStatusColor = (status: string) => {
        switch (status) {
            case "concluida":
                return "bg-[color:var(--modal-completed-bg,rgba(22,163,74,0.2))] text-[color:var(--modal-completed-icon,#22c55e)]";
            case "ativa":
                return "bg-[color:var(--modal-progress-bg,rgba(16,185,129,0.2))] text-[color:var(--modal-progress-bar,#10b981)]";
            case "vencida":
                return "bg-[color:var(--modal-delete-bg,rgba(220,38,38,0.2))] text-[color:var(--modal-delete-bg,#dc2626)]";
            default:
                return "bg-[color:var(--modal-preview-bg,rgba(55,65,81,0.2))] text-[color:var(--modal-preview-meta,#a3a3a3)]";
        }
    };

    return (
        <div
            key={goal.id}
            className={cn(
                "bg-[color:var(--goal-card-bg,#23272f)]/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border transition-all hover:scale-105 duration-200",
                goal.status === "CONCLUIDA"
                    ? "border-[color:var(--goal-card-border-success,#22c55e)]/50"
                    : goal.status === "VENCIDA"
                        ? "border-[color:var(--goal-card-border-fail,#ef4444)]/50"
                        : "border-[color:var(--goal-card-border,#52525b)]/50 hover:border-[color:var(--goal-card-border-hover,#059669)]/50",
            )}
        >
            {/* Goal Header */}
            <div className="flex items-start justify-between mb-4 flex-wrap sm:no-wrap">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[color:var(--goal-card-title,#fff)] mb-2">
                        {goal.title}
                    </h3>
                    <p className="text-sm text-[color:var(--goal-card-meta,#a3a3a3)] mb-2">
                        {goal.description}
                    </p>
                    {goal.topic ? (
                        <span className="inline-block bg-[color:var(--goal-card-topic-bg,#52525b)]/50 px-2 py-1 rounded text-xs text-[color:var(--goal-card-topic,#d1d5db)] min-h-[24px]">
                            {goal.topic.toLocaleLowerCase().replace(/\b\w/g, char => char.toUpperCase())}
                        </span>
                    ) : (
                        <div className="min-h-[24px]" />
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span
                        className={cn(
                            "flex items-center gap-1 text-xs px-2 py-1 rounded-full",
                            getGoalStatusColor(goal.status.toLocaleLowerCase()),
                        )}
                    >
                        {getStatusIcon(goal.status)}
                        {goal.status === "ATIVA"
                            ? "Ativa"
                            : goal.status === "CONCLUIDA"
                                ? "Concluída"
                                : "Vencida"}
                    </span>
                    <button onClick={() => onDelete(goal)} className="p-2 text-[color:var(--goal-card-action,#a3a3a3)] hover:text-[color:var(--goal-card-action-hover,#ef4444)] hover:bg-[color:var(--goal-card-action-bg,#52525b)]/50 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>

            </div>

            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between text-sm text-[color:var(--goal-card-meta,#a3a3a3)] mb-2">
                    <span>Progresso</span>
                    <span>
                        {goal.current}/{goal.target} {goal.unit.toLowerCase().replace(/^\w/, (char) => char.toUpperCase())}
                    </span>
                </div>
                <div className="bg-[color:var(--goal-card-progress-bg,#52525b)] rounded-full h-3">
                    <div
                        className={cn(
                            "h-3 rounded-full transition-all duration-300",
                            goal.status === "CONCLUIDA"
                                ? "bg-[color:var(--goal-card-progress-success,#22c55e)]"
                                : goal.status === "VENCIDA"
                                    ? "bg-[color:var(--goal-card-progress-fail,#ef4444)]"
                                    : "bg-[color:var(--goal-card-progress,#059669)]",
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