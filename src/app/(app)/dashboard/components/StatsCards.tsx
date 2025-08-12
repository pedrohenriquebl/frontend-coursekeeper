import { BookOpen, Award, Clock, Target } from "lucide-react";
import { StatsCard } from "./StatsCard";

interface StatsCardsProps {
  totalCourses: number;
  completedCourses: number;
  studyHours: number;
  currentGoalPercent: number;
}

export function StatsCards({ 
  totalCourses, 
  completedCourses, 
  studyHours, 
  currentGoalPercent 
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        icon={BookOpen}
        iconColor="text-emerald-400"
        bgColor="bg-emerald-600/20"
        value={totalCourses}
        label="Total de Cursos"
      />
      <StatsCard
        icon={Award}
        iconColor="text-green-400"
        bgColor="bg-green-600/20"
        value={completedCourses}
        label="Cursos Concluídos"
      />
      <StatsCard
        icon={Clock}
        iconColor="text-purple-400"
        bgColor="bg-purple-600/20"
        value={`${studyHours}h`}
        label="Horas de Estudo"
      />
      <StatsCard
        icon={Target}
        iconColor="text-orange-400"
        bgColor="bg-orange-600/20"
        value={`${Math.round(currentGoalPercent)}%`}
        label="Meta Atual"
      />
    </div>
  );
}