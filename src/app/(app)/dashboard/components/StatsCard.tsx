import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  value: string | number;
  label: string;
}

export function StatsCard({ icon: Icon, iconColor, bgColor, value, label }: StatsCardProps) {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <span className="text-2xl font-bold text-white">{value}</span>
      </div>
      <h3 className="text-sm font-medium text-gray-400">{label}</h3>
    </div>
  );
}