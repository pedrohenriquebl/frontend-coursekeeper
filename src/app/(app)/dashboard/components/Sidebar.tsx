import { HoursGoal } from "./HoursGoal";
import { QuickActions } from "./QuickActions";

interface SidebarProps {
  onAddCourse: () => void;
}

export function Sidebar({ onAddCourse }: SidebarProps) {
  return (
    <div className="space-y-6">
      <HoursGoal />
      {/* <RecentAchievements /> */}
      <QuickActions onAddCourse={onAddCourse} />
    </div>
  );
}