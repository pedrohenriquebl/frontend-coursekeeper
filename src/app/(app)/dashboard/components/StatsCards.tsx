'use client'

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
        iconColor="text-[color:var(--modal-submit-bg,#059669)]"
        gradientFrom="rgba(16,185,129,0.2)"
        gradientTo="rgba(5,150,105,0.2)"
        value={totalCourses}
        label="Total de Cursos"
      />
      <StatsCard
        icon={Award}
        iconColor="text-[color:var(--modal-completed-icon,#22c55e)]"
        gradientFrom="rgba(34,197,94,0.2)"
        gradientTo="rgba(22,163,74,0.2)"
        value={completedCourses}
        label="Cursos Concluídos"
      />
      <StatsCard
        icon={Clock}
        iconColor="text-[color:var(--modal-progress-bar,#a78bfa)]"
        gradientFrom="rgba(168,85,247,0.2)"
        gradientTo="rgba(139,92,246,0.2)"
        value={`${studyHours}h`}
        label="Horas de Estudo"
      />
      <StatsCard
        icon={Target}
        iconColor="text-[color:var(--topic-datascience,#fb923c)]"
        gradientFrom="rgba(251,191,36,0.2)"
        gradientTo="rgba(245,158,11,0.2)"
        value={`${Math.round(currentGoalPercent)}%`}
        label="Meta Atual"
      />
    </div>
  );
}
