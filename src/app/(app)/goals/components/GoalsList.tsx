'use client';

import { Goal } from "@/types";
import GoalCard from "./GoalCard";
import { Search } from "lucide-react";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/courses/CourseModals/ConfirmDeleteModal";
import { cn } from "@/lib/utils";

interface GoalsListProps {
    filteredGoals: Goal[];
    onDelete: (goalId: number) => void;
    gridView: 1 | 2 | 3 | 4;
}

export default function GoalsList({ filteredGoals, onDelete, gridView }: GoalsListProps) {
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
            <div
                className={cn(
                    "grid gap-6 pb-4",
                    !hasFilteredGoals && "grid-cols-1",
                    hasFilteredGoals && gridView === 1 && "grid-cols-1",
                    hasFilteredGoals && gridView === 2 && "grid-cols-1 sm:grid-cols-2",
                    hasFilteredGoals && gridView === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
                    hasFilteredGoals && gridView === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                )}
            >
                {hasFilteredGoals ? (
                    filteredGoals.map((goal: Goal) => (
                        <GoalCard
                            key={goal.id}
                            goal={goal}
                            onDelete={handleDeleteClick}
                        />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <div className="bg-[color:var(--goals-list-icon-bg,#52525b)]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="h-8 w-8 text-[color:var(--goals-list-icon,#a3a3a3)]" />
                            </div>
                            <h3 className="text-lg font-medium text-[color:var(--goals-list-title,#fff)] mb-2">Nenhuma meta encontrada</h3>
                            <p className="text-[color:var(--goals-list-meta,#a3a3a3)]">Tente ajustar os filtros ou adicionar uma nova meta</p>
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