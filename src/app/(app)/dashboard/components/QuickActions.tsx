import { Plus, Target, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuickActionsProps {
  onAddCourse: () => void;
  onOpenGoalModal: () => void;
}

export function QuickActions({ onAddCourse, onOpenGoalModal }: QuickActionsProps) {
  const router = useRouter();

  return (
    <div className="bg-[color:var(--dashboard-card-bg,#23272f)]/60 backdrop-blur-sm rounded-xl shadow-lg border border-[color:var(--dashboard-card-border,#52525b)]/50 p-6">
      <h3 className="text-lg font-semibold text-[color:var(--dashboard-card-title,#fff)] mb-4">Ações Rápidas</h3>
      <div className="space-y-3">
        <button
          onClick={onAddCourse}
          className="cursor-pointer w-full text-left p-3 rounded-lg hover:bg-[color:var(--dashboard-card-hover-bg,#52525b)]/50 transition-colors duration-200 flex items-center gap-3"
        >
          <Plus className="h-4 w-4 text-[color:var(--dashboard-action-plus,#34d399)]" />
          <span className="text-sm text-[color:var(--dashboard-card-text,#d1d5db)]">Adicionar Curso</span>
        </button>
        <button
          onClick={onOpenGoalModal}
          className="cursor-pointer w-full text-left p-3 rounded-lg hover:bg-[color:var(--dashboard-card-hover-bg,#52525b)]/50 transition-colors duration-200 flex items-center gap-3"
        >
          <Target className="h-4 w-4 text-[color:var(--dashboard-action-target,#a78bfa)]" />
          <span className="text-sm text-[color:var(--dashboard-card-text,#d1d5db)]">Definir Meta</span>
        </button>
        <button
          onClick={() => router.push('/report')}
          className="cursor-pointer w-full text-left p-3 rounded-lg hover:bg-[color:var(--dashboard-card-hover-bg,#52525b)]/50 transition-colors duration-200 flex items-center gap-3"
        >
          <Calendar className="h-4 w-4 text-[color:var(--dashboard-action-calendar,#22c55e)]" />
          <span className="text-sm text-[color:var(--dashboard-card-text,#d1d5db)]">Ver Relatórios</span>
        </button>
      </div>
    </div>
  );
}