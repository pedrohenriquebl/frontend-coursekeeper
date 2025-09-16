'use client'

import { BookAlertIcon, Plus } from "lucide-react";
import { useState } from "react";
import { useGoals } from "./hooks/useGoals";
import { GoalsOverviewCard } from "./components/GoalsOverviewCard";
import { CreateGoalData, TabType } from "@/types";
import { GoalModal } from "./components/GoalModal";
import GoalsTab from "./components/GoalsTab";
import GoalsList from "./components/GoalsList";
import { FadeSlide } from "@/components/animation/FadeSlide";
import { List, Grid2x2, Grid3x3, LayoutGrid } from "lucide-react";

export default function PageGoals() {
    const {
        overviewGoals,
        createGoal,
        allGoals,
        activeGoalsSize,
        completedGoalsSize,
        allGoalsSize,
        deleteGoal
    } = useGoals();

    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState<TabType>("ATIVA");
    const [gridView, setGridView] = useState<1 | 2 | 3 | 4>(2);

    const handleChangeSelect = (tab: TabType) => {
        setSelectedTab(tab);
    };

    const handleCreateGoal = async (goalData: CreateGoalData) => {
        await createGoal(goalData);
    };

    const filteredGoals = allGoals.filter(goal => {
        if (selectedTab === "TODAS") return true;
        return goal.status === selectedTab;
    });

    const missedGoals = allGoals.filter(goal => goal.status === "VENCIDA").length || 0;

    const goalStats = {
        activeGoals: overviewGoals?.activeGoals || 0,
        goalsCompleted: overviewGoals?.goalsCompleted || 0,
        goalsRating: overviewGoals?.goalsRating || 0,
        totalProgressInHours: overviewGoals?.totalProgressInHours || 0,
        totalGoalInHours: overviewGoals?.totalGoalInHours || 0,
    }

    const hasGoals = Array.isArray(allGoals) && allGoals.length > 0;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 text-[color:var(--goals-page-text,#fff)]">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[color:var(--goals-page-title,#fff)] mb-2">Metas de Estudo</h1>
                    <p className="text-[color:var(--goals-page-meta,#a3a3a3)]">
                        Defina objetivos e acompanhe seu progresso educacional
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="cursor-pointer flex items-center gap-2 bg-[color:var(--goals-page-action-bg,#059669)] text-[color:var(--goals-page-action,#fff)] px-6 py-3 rounded-lg hover:bg-[color:var(--goals-page-action-hover-bg,#059669)] transition-colors duration-200 font-medium"
                >
                    <Plus className="h-5 w-5" />
                    Adicionar Meta
                </button>
            </div>

            <GoalsOverviewCard {...goalStats} />

            <FadeSlide>
                <div className="flex items-center justify-between gap-2">
                    <GoalsTab
                        selectedTab={selectedTab}
                        setSelectedTab={handleChangeSelect}
                        activeGoals={activeGoalsSize}
                        completedGoals={completedGoalsSize}
                        allGoals={allGoalsSize}
                        missedGoals={missedGoals}
                    />
                    <div className="hidden lg:flex justify-end gap-2 mb-4">
                        <button
                            onClick={() => setGridView(1)}
                            className={`p-2 rounded-md transition ${gridView === 1 ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <List className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => setGridView(2)}
                            className={`p-2 rounded-md transition ${gridView === 2 ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <Grid2x2 className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => setGridView(3)}
                            className={`p-2 rounded-md transition ${gridView === 3 ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <Grid3x3 className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => setGridView(4)}
                            className={`p-2 rounded-md transition ${gridView === 4 ? "bg-emerald-600 text-white" : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </FadeSlide>

            <div>
                {hasGoals ? (
                    <FadeSlide>
                        <GoalsList filteredGoals={filteredGoals} onDelete={deleteGoal} gridView={gridView}/>
                    </FadeSlide>
                ) : (
                    <div className="text-center py-12">
                        <div className="bg-gray-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookAlertIcon className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-[color:var(--goals-page-empty-title,#fff)] mb-2">Nenhuma meta definida</h3>
                    </div>
                )}
            </div>

            <GoalModal
                showModal={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleCreateGoal}
            />
        </div>
    )
}