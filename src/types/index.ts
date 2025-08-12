export type CourseStatus = "NAO_INICIADO" | "EM_PROGRESSO" | "CONCLUIDO";

type GoalType =
  | "Horas_totais"
  | "Horas_topico"
  | "Cursos_concluidos"
  | "Periodo_estudo";

type Topic =
  | "Frontend"
  | "Backend"
  | "Devops"
  | "Fullstack"
  | "Mobile"
  | "Data Science"
  | "Fullstack"
  | "Design";

export interface Course {
  id: number;
  name: string;
  platform: string;
  platformCustom?: string;
  duration: number;
  topic: string;
  topicCustom?: string;
  progress: number;
  rating: number;
  comment: string;
  status: CourseStatus;
  startDate: string;
  endDate?: string;
  description?: string;
  instructor?: string;
  language?: string;
  languageCustom?: string;
}

export interface CreateCourseData
  extends Omit<Course, "id" | "progress" | "rating" | "comment" | "status"> {
  progress?: number;
  rating?: number;
  comment?: string;
  status?: Course["status"];
}

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
