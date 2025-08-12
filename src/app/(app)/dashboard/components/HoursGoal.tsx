export function HoursGoal() {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Meta de Horas</h3>
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{0}h estudadas</span>
          <span>{0}h meta</span>
        </div>
        <div className="bg-gray-600 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-emerald-600 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(0, 100)}%` }}
          />
        </div>
      </div>
      <p className="text-sm text-gray-400">
        Faltam {Math.max(0 - 0, 0)}h para atingir sua meta!
      </p>
    </div>
  );
}