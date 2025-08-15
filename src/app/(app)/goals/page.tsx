'use client'

import { Plus } from "lucide-react";
import { useState } from "react";
import { useGoals } from "./hooks/useGoals";
import { GoalsCard } from "./components/GoalsCard";
import { CreateGoalData, TabType } from "@/types";
import { GoalModal } from "./components/GoalModal";
import GoalsTab from "./components/GoalsTab";
import GoalsList from "./components/GoalsList";

export default function PageGoals() {
    const {
        overviewGoals,
        createGoal,
        allGoals,
        activeGoalsSize,
        completedGoalsSize,
        allGoalsSize
    } = useGoals();

    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedTab, setSelectedTab] = useState<TabType>("ATIVA");

    const handleChangeSelect = (tab: TabType) => {
        setSelectedTab(tab);
    };

    const handleCreateGoal = async (goalData: CreateGoalData) => {
        try {
            await createGoal(goalData);
            setShowAddModal(false);
        } catch (error) {
            console.error("Error creating goal:", error);
        }
    };

    const filteredGoals = allGoals.filter(goal => {
        if (selectedTab === "TODAS") return true;
        return goal.status === selectedTab;
    });

    const goalStats = {
        activeGoals: overviewGoals?.activeGoals || 0,
        goalsCompleted: overviewGoals?.goalsCompleted || 0,
        goalsRating: overviewGoals?.goalsRating || 0,
        totalProgressInHours: overviewGoals?.totalProgressInHours || 0,
        totalGoalInHours: overviewGoals?.totalGoalInHours || 0,
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Metas de Estudo</h1>
                    <p className="text-gray-400">
                        Defina objetivos e acompanhe seu progresso educacional
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="cursor-pointer flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium"
                >
                    <Plus className="h-5 w-5" />
                    Adicionar Meta
                </button>
            </div>

            <GoalsCard {...goalStats} />

            <GoalsTab
                selectedTab={selectedTab}
                setSelectedTab={handleChangeSelect}
                activeGoals={activeGoalsSize}
                completedGoals={completedGoalsSize}
                allGoals={allGoalsSize}
            />

            <div className="h-[600px] overflow-auto">
                <GoalsList filteredGoals={filteredGoals} />
            </div>

            <GoalModal
                showModal={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSave={handleCreateGoal}
            />
        </div>
    )
}