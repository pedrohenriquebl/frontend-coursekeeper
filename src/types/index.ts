export type Platform =
  | "UDEMY"
  | "COURSERA"
  | "YOUTUBE"
  | "EDX"
  | "VUE MASTERY"
  | "ROCKETSEAT"
  | "ALURA"
  | "OUTROS";

export type Language =
  | "PORTUGUES"
  | "INGLES"
  | "ESPANHOL"
  | "FRANCES"
  | "OUTROS";

export type Topic =
  | "FRONTEND"
  | "BACKEND"
  | "DESIGN"
  | "DATA SCIENCE"
  | "DEVOPS"
  | "MOBILE"
  | "FULL STACK"
  | "DATABASE"
  | "OUTROS";

export type FilterTopic = Topic | "all";

export type FilterPlatform = Platform | "all";

export type FilterStatus = CourseStatus | "all";

export type FilterPeriod =
  | "7days"
  | "30days"
  | "3months"
  | "6months"
  | "1year"
  | "all";

export type CourseStatus =
  | "NAO_INICIADO"
  | "EM_PROGRESSO"
  | "CONCLUIDO"
  | "NAO_CONCLUIDO";

export type GoalStatus = "ATIVA" | "CONCLUIDA" | "VENCIDA";

export type TabType = GoalStatus | "TODAS";

export interface GeneralCoursesInfo {
  totalCourses: number;
  totalCompletedCourses: number;
  totalStudiedHours: number;
}

export interface LatestGoalInfo {
  title: string;
  target: number;
  current: number;
  status: GoalStatus;
}

export interface GeneralGoalsInfo {
  goalsProgressPercent: number;
  latestGoal: LatestGoalInfo;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  profileImage?: string;
  description?: string;
  maxLoginStreak?: number;
  currentLoginStreak?: number;
  linkedin?: string;
  github?: string;
  website?: string;
  createdAt: string;
  generalCoursesInfo?: GeneralCoursesInfo;
  goalsStats?: GeneralGoalsInfo;
  subscriptionPlan: "FREE" | "GOLD" | "PLATINUM";
  subscriptionValidUntil?: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface Course {
  id: number;
  name: string;
  platform: Platform | string;
  platformCustom?: string;
  duration: number;
  studiedHours: number;
  topic: Topic | string;
  topicCustom?: string;
  progress: number;
  rating?: number;
  comment?: string;
  status: CourseStatus;
  startDate: string;
  endDate?: string;
  description?: string;
  instructor?: string;
  language?: Language | string;
  languageCustom?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateCourseData = Omit<
  Course,
  "id" | "progress" | "rating" | "comment" | "status"
> & {
  progress?: number;
  rating?: number;
  comment?: string;
  status?: CourseStatus;
};

export interface CreateCoursePayload {
  name: string;
  duration: number;
  studiedHours?: number;
  topic: string;
  platform: string;
  language: string;
  description?: string;
  instructor?: string;
  startDate?: string;
}

export type UpdateCoursePayload = {
  id: number;
  name?: string;
  platform?: Platform | string;
  platformCustom?: string;
  duration?: number;
  studiedHours?: number;
  topic?: Topic | string;
  topicCustom?: string;
  progress?: number;
  rating?: number;
  comment?: string;
  status?: CourseStatus;
  endDate?: string;
  description?: string;
  instructor?: string;
  language?: Language | string;
  languageCustom?: string;
  startDate?: string;
};

export type UpdateCourseData = Course;

export interface CourseModalProps {
  show: boolean;
  onClose: () => void;
}

export interface AddCourseModalProps extends CourseModalProps {
  onSave: (course: CreateCourseData) => void;
  loading: boolean;
}

export interface EditCourseModalProps extends CourseModalProps {
  course: Course;
  onUpdate: (course: UpdateCoursePayload) => void;
  loading: boolean;
}

export interface CourseDetailsModalProps extends CourseModalProps {
  course: Course;
}

export interface CourseModalsProps {
  showAddModal: boolean;
  showEditModal: boolean;
  showDetailsModal: boolean;
  editingCourse: Course | null;
  detailsCourse: Course | null;
  onCloseAdd: () => void;
  onCloseEdit: () => void;
  onCloseDetails: () => void;
  onUpdateCourse: (course: UpdateCoursePayload) => void;
}

export type GoalUnit = "HORAS" | "CURSOS" | "DIAS";

export type GoalType =
  | "HORAS_TOTAIS"
  | "HORAS_TOPICO"
  | "CURSOS_CONCLUIDOS"
  | "PERIODO_ESTUDO";

export interface Goal {
  id: number;
  title: string;
  description: string;
  type: GoalType;
  target: number;
  current: number;
  unit: string;
  topic: Topic;
  deadline: string;
  status: GoalStatus;
  createdAt: string;
  completedAt?: string;
}

export interface CreateGoalData {
  title: string;
  type: GoalType;
  topic?: Topic | null;
  target: number;
  unit: GoalUnit;
  deadline: string;
  description?: string | null;
}

export interface OverviewGoals {
  activeGoals: number;
  goalsCompleted: number;
  goalsRating: number;
  totalProgressInHours: number;
  totalGoalInHours: number;
}

export type SubscriptionPlan = "FREE" | "GOLD" | "PLATINUM";

export type Duration = "MONTHLY" | "ANNUAL";

export type PaymentMethod = "CREDIT" | "DEBIT" | "PIX";

export interface Plan {
  name: SubscriptionPlan;
  title: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  popular?: boolean;
}

export interface CardData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

export interface CardErrors {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

export interface SubscriptionPlansProps {
  currentPlan: SubscriptionPlan;
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: SubscriptionPlan | null;
  currentPlan: SubscriptionPlan;
  onSubscriptionSuccess?: (newPlan: SubscriptionPlan) => void;
}

export interface UpdateSubscriptionPayload {
  subscriptionPlan: SubscriptionPlan;
  duration?: string;
}
