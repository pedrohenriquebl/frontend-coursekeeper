interface GoalPreviewProps {
  title: string;
  target: number;
  unit: string;
  topic?: string;
  deadline?: string;
  typeIcon: React.ReactNode;
}

export function GoalPreview({
  title,
  target,
  unit,
  topic,
  deadline,
  typeIcon,
}: GoalPreviewProps) {
  return (
    <div className="bg-[color:var(--goal-preview-bg,#23272f)]/30 rounded-lg p-4">
      <h3 className="text-sm font-medium text-[color:var(--goal-preview-label,#a3a3a3)] mb-2">
        Preview da Meta:
      </h3>
      <div className="flex items-center gap-3">
        <div className="bg-[color:var(--goal-preview-icon-bg,#059669)]/20 p-2 rounded-lg">{typeIcon}</div>
        <div>
          <div className="font-medium text-[color:var(--goal-preview-title,#fff)]">{title}</div>
          <div className="text-sm text-[color:var(--goal-preview-meta,#a3a3a3)]">
            {target} {unit}
            {topic && ` em ${topic}`}
            {deadline &&
              ` até ${new Date(deadline).toLocaleDateString("pt-BR")}`}
          </div>
        </div>
      </div>
    </div>
  );
}