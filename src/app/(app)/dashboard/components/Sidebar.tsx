import { useAuthUser } from "@/context/authUserContext";
import { QuickActions } from "./QuickActions";
import { HoursGoal } from "./HoursGoal";

interface SidebarProps {
  onAddCourse: () => void;
}

export function Sidebar({ onAddCourse }: SidebarProps) {
  const { user } = useAuthUser();
  
  const goalData = {
    title: user?.goalsStats?.latestGoal?.title || '',
    studiedHours: user?.goalsStats?.latestGoal?.current || 0,
    goalHours: user?.goalsStats?.latestGoal?.target || 0,
    status: user?.goalsStats?.latestGoal?.status || ''
  };

  return (
    <div className="space-y-6">
      <HoursGoal userGoals={goalData} />
      <QuickActions onAddCourse={onAddCourse} />
    </div>
  );
}