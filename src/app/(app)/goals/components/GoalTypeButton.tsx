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
          ? "border-emerald-500 bg-emerald-600/20 text-emerald-400"
          : "border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500",
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <div>
          <div className="font-medium">{label}</div>
          <div className="text-xs text-gray-400">Medido em {unit}</div>
        </div>
      </div>
    </button>
  );
}