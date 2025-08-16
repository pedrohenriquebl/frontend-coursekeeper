import { Goal } from "@/types";
import GoalCard from "./GoalCard";

interface GoalsListProps {
    filteredGoals: Goal[];
}

export default function GoalsList({ filteredGoals }: GoalsListProps) {
    const hasFilteredGoals = filteredGoals && filteredGoals.length > 0;
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-visible">
            {
                hasFilteredGoals ? (
                    filteredGoals.map((goal: Goal) => (
                        <GoalCard 
                            key={goal.id}
                            goal={goal}
                        />
                    ))
                ) : (
                    <div>
                        <p className="text-sm text-gray-500">
                            Você ainda não tem metas definidas.
                        </p>
                    </div>
                )
            }
        </div>
    )
}