import { cn } from "@/lib/utils";
import { TabType } from "@/types";

interface GoalsTabProps {
    activeGoals: number;
    completedGoals: number;
    allGoals: number;
    missedGoals: number;
    selectedTab: TabType;
    setSelectedTab: (tab: TabType) => void;
}

export default function GoalsTab({
    activeGoals,
    completedGoals,
    allGoals,
    missedGoals,
    selectedTab,
    setSelectedTab
}: GoalsTabProps) {
    

    return (
    <div className="flex space-x-1 mb-6 bg-[color:var(--goals-tab-bg,#23272f)]/60 backdrop-blur-sm rounded-lg p-1 flex-wrap">
            <button
                onClick={() => setSelectedTab("ATIVA")}
                className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
                    selectedTab === "ATIVA"
                        ? "bg-[color:var(--goals-tab-active-bg,#059669)] text-[color:var(--goals-tab-active-text,#fff)]"
                        : "text-[color:var(--goals-tab-inactive,#a3a3a3)] hover:text-[color:var(--goals-tab-hover,#fff)] hover:bg-[color:var(--goals-tab-hover-bg,#52525b)]/50",
                )}
            >
                Metas Ativas ({activeGoals})
            </button>
            <button
                onClick={() => setSelectedTab("CONCLUIDA")}
                className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
                    selectedTab === "CONCLUIDA"
                        ? "bg-[color:var(--goals-tab-active-bg,#059669)] text-[color:var(--goals-tab-active-text,#fff)]"
                        : "text-[color:var(--goals-tab-inactive,#a3a3a3)] hover:text-[color:var(--goals-tab-hover,#fff)] hover:bg-[color:var(--goals-tab-hover-bg,#52525b)]/50",
                )}
            >
                Concluídas ({completedGoals})
            </button>
            <button
                onClick={() => setSelectedTab("VENCIDA")}
                className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
                    selectedTab === "VENCIDA"
                        ? "bg-[color:var(--goals-tab-active-bg,#059669)] text-[color:var(--goals-tab-active-text,#fff)]"
                        : "text-[color:var(--goals-tab-inactive,#a3a3a3)] hover:text-[color:var(--goals-tab-hover,#fff)] hover:bg-[color:var(--goals-tab-hover-bg,#52525b)]/50",
                )}
            >
                Vencidas ({missedGoals})
            </button>
            <button
                onClick={() => setSelectedTab("TODAS")}
                className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
                    selectedTab === "TODAS"
                        ? "bg-[color:var(--goals-tab-active-bg,#059669)] text-[color:var(--goals-tab-active-text,#fff)]"
                        : "text-[color:var(--goals-tab-inactive,#a3a3a3)] hover:text-[color:var(--goals-tab-hover,#fff)] hover:bg-[color:var(--goals-tab-hover-bg,#52525b)]/50",
                )}
            >
                Todas ({allGoals})
            </button>
        </div>
    )
}
