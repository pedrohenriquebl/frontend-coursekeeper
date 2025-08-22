import { useAuthUser } from "@/context/authUserContext";
import { QuickActions } from "./QuickActions";
import { HoursGoal } from "./HoursGoal";
import { FadeSlide } from "@/components/animation/FadeSlide";

interface SidebarProps {
  onAddCourse: () => void;
  onOpenGoalModal: () => void;
}

export function Sidebar({ onAddCourse, onOpenGoalModal }: SidebarProps) {
  const { user } = useAuthUser();

  const goalData = {
    title: user?.goalsStats?.latestGoal?.title || '',
    studiedHours: user?.goalsStats?.latestGoal?.current || 0,
    goalHours: user?.goalsStats?.latestGoal?.target || 0,
    status: user?.goalsStats?.latestGoal?.status || ''
  };

  return (
    <FadeSlide>
      <div className="space-y-6">
        <HoursGoal userGoals={goalData} />
        <QuickActions onAddCourse={onAddCourse} onOpenGoalModal={onOpenGoalModal} />
      </div>
    </FadeSlide>
  );
}