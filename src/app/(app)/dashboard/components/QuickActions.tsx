import { Plus, Target, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuickActionsProps {
  onAddCourse: () => void;
}

export function QuickActions({ onAddCourse }: QuickActionsProps) {
  const router = useRouter();

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
      <div className="space-y-3">
        <button
          onClick={onAddCourse}
          className="w-full text-left p-3 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 flex items-center gap-3"
        >
          <Plus className="h-4 w-4 text-emerald-400" />
          <span className="text-sm text-gray-300">Adicionar Curso</span>
        </button>
        <button
          onClick={() => router.push('/metas')}
          className="w-full text-left p-3 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 flex items-center gap-3"
        >
          <Target className="h-4 w-4 text-purple-400" />
          <span className="text-sm text-gray-300">Definir Meta</span>
        </button>
        <button
          onClick={() => router.push('/relatorios')}
          className="w-full text-left p-3 rounded-lg hover:bg-gray-700/50 transition-colors duration-200 flex items-center gap-3"
        >
          <Calendar className="h-4 w-4 text-green-400" />
          <span className="text-sm text-gray-300">Ver Relatórios</span>
        </button>
      </div>
    </div>
  );
}