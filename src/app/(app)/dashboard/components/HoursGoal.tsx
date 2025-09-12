type HoursGoalProps = {
  userGoals?: {
    title?: string | null;
    studiedHours?: number | null;
    goalHours?: number | null;
  };
}

export function HoursGoal({ userGoals }: HoursGoalProps) {
  const hasValidGoals =
    userGoals?.title &&
    typeof userGoals?.studiedHours === 'number' &&
    typeof userGoals?.goalHours === 'number' &&
    userGoals.goalHours > 0;

  if (!hasValidGoals) {
    return (
      <div className="bg-[color:var(--dashboard-card-bg,#23272f)]/60 backdrop-blur-sm rounded-xl shadow-lg border border-[color:var(--dashboard-card-border,#52525b)]/50 p-6">
        <h3 className="text-lg font-semibold text-[color:var(--dashboard-card-title,#fff)] mb-4">Suas metas</h3>
        <p className="text-[color:var(--dashboard-card-meta,#a3a3a3)]">Você ainda não tem metas definidas.</p>
      </div>
    );
  }
  
  const progress = Math.min(
    ((userGoals.studiedHours || 0) / (userGoals.goalHours || 1)) * 100,
    100
  );

  const remainingHours = Math.max((userGoals.goalHours || 0) - (userGoals.studiedHours || 0), 0);

  return (
    <div className="bg-[color:var(--dashboard-card-bg,#23272f)]/60 backdrop-blur-sm rounded-xl shadow-lg border border-[color:var(--dashboard-card-border,#52525b)]/50 p-6">
      <h3 className="text-lg font-semibold text-[color:var(--dashboard-card-title,#fff)] mb-4">{userGoals.title}</h3>
      <div className="mb-4">
        <div className="flex justify-between text-sm text-[color:var(--dashboard-card-meta,#a3a3a3)] mb-2">
          <span>{userGoals.studiedHours}h estudadas</span>
          <span>{userGoals.goalHours}h meta</span>
        </div>
        <div className="bg-[color:var(--dashboard-progress-bg,#52525b)] rounded-full h-3">
          <div
            className="bg-gradient-to-r from-[color:var(--dashboard-progress-from,#059669)] to-[color:var(--dashboard-progress-to,#22c55e)] h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <p className="text-sm text-[color:var(--dashboard-card-meta,#a3a3a3)]">
        Faltam {remainingHours}h para atingir sua meta!
      </p>
    </div>
  );
}