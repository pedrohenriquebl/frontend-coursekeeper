'use client';

import { Goal } from "@/types";
import GoalCard from "./GoalCard";
import { Search } from "lucide-react";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/courses/CourseModals/ConfirmDeleteModal";

interface GoalsListProps {
    filteredGoals: Goal[];
    onDelete: (goalId: number) => void;
}

export default function GoalsList({ filteredGoals, onDelete }: GoalsListProps) {
    const hasFilteredGoals = filteredGoals && filteredGoals.length > 0;
    const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
    const handleDeleteClick = (goal: Goal) => setGoalToDelete(goal);

    const handleConfirmDelete = () => {
        if (goalToDelete) {
            onDelete(goalToDelete.id);
            setGoalToDelete(null);
        }
    }

    const handleCancelDelete = () => setGoalToDelete(null);

    return (
        <>
            <div className={`grid grid-cols-1 lg:grid-cols-${hasFilteredGoals ? 2 : 1} gap-6 overflow-visible`}>
                {hasFilteredGoals ? (
                    filteredGoals.map((goal: Goal) => (
                        <GoalCard
                            key={goal.id}
                            goal={goal}
                            onDelete={handleDeleteClick} // 🚀 aqui
                        />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <div className="bg-gray-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Nenhuma meta encontrada</h3>
                        <p className="text-gray-400">Tente ajustar os filtros ou adicionar uma nova meta</p>
                    </div>
                )}
            </div>

            <ConfirmDeleteModal
                show={!!goalToDelete}
                courseName={goalToDelete?.title}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
    );
}