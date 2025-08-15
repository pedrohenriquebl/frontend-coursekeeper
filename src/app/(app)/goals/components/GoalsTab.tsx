import { cn } from "@/lib/utils";
import { TabType } from "@/types";

interface GoalsTabProps {
    activeGoals: number;
    completedGoals: number;
    allGoals: number;
    selectedTab: TabType;
    setSelectedTab: (tab: TabType) => void;
}

export default function GoalsTab({
    activeGoals,
    completedGoals,
    allGoals,
    selectedTab,
    setSelectedTab
}: GoalsTabProps) {
    return (
        <div className="flex space-x-1 mb-6 bg-gray-800/60 backdrop-blur-sm rounded-lg p-1">
            <button
                onClick={() => setSelectedTab("ATIVA")}
                className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
                    selectedTab === "ATIVA"
                        ? "bg-emerald-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50",
                )}
            >
                Metas Ativas ({activeGoals})
            </button>
            <button
                onClick={() => setSelectedTab("CONCLUIDA")}
                className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
                    selectedTab === "CONCLUIDA"
                        ? "bg-emerald-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50",
                )}
            >
                Concluídas ({completedGoals})
            </button>
            <button
                onClick={() => setSelectedTab("TODAS")}
                className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
                    selectedTab === "TODAS"
                        ? "bg-emerald-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-700/50",
                )}
            >
                Todas ({allGoals})
            </button>
        </div>
    )
}
