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
    <div className="bg-gray-700/30 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-400 mb-2">
        Preview da Meta:
      </h3>
      <div className="flex items-center gap-3">
        <div className="bg-emerald-600/20 p-2 rounded-lg">{typeIcon}</div>
        <div>
          <div className="font-medium text-white">{title}</div>
          <div className="text-sm text-gray-400">
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