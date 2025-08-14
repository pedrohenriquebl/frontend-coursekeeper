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
  | "OUTROS";

export type CourseStatus = "NAO_INICIADO" | "EM_PROGRESSO" | "CONCLUIDO";

export type GoalStatus = "ATIVA" | "CONCLUIDA" | "VENCIDA";

export interface Course {
  id: number;
  name: string;
  platform: Platform | string; // permite custom
  platformCustom?: string;
  duration: number;
  studiedHours: number;
  topic: Topic | string; // permite custom
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

export type CreateCourseData = Omit<Course, "id" | "progress" | "rating" | "comment" | "status"> & {
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

type GoalUnit = "HORAS" | "CURSOS" | "DIAS";

type GoalType =
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
  status: CourseStatus;
  createdAt: string;
  completedAt?: string;
}

export interface CreateGoalData {
  title: string;
  type: GoalType;
  topic?: Topic | null;
  target: number;
  unit: GoalUnit;
  deadline: Date;
  description?: string | null;
}

export interface OverviewGoals {
  activeGoals: number;
  goalsCompleted: number;
  goalsRating: number;
  totalProgressInHours: number;
  totalGoalInHours: number;
}