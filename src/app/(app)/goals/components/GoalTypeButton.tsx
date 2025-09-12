import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface GoalTypeButtonProps {
  label: string;
  icon: LucideIcon;
  unit: string;
  isSelected: boolean;
  onClick: () => void;
}

export function GoalTypeButton({
  label,
  icon: Icon,
  unit,
  isSelected,
  onClick,
}: GoalTypeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "p-4 rounded-lg border transition-all duration-200 text-left",
        isSelected
          ? "border-[color:var(--goal-type-selected-border,#059669)] bg-[color:var(--goal-type-selected-bg,#059669)]/20 text-[color:var(--goal-type-selected-text,#34d399)]"
          : "border-[color:var(--goal-type-border,#52525b)] bg-[color:var(--goal-type-bg,#23272f)]/30 text-[color:var(--goal-type-text,#d1d5db)] hover:border-[color:var(--goal-type-hover-border,#a3a3a3)]",
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <div>
          <div className="font-medium">{label}</div>
          <div className="text-xs text-[color:var(--goal-type-meta,#a3a3a3)]">Medido em {unit}</div>
        </div>
      </div>
    </button>
  );
}