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
  | "OUTROS"
  | string;
export type Status = "NAO_INICIADO" | "EM_PROGRESSO" | "CONCLUIDO";

export interface BaseCourseData {
  id: number;
  name: string;
  platform: Platform;
  platformCustom?: string;
  duration: number;
  studiedHours: number;
  progress: number;
  topic: Topic;
  topicCustom?: string;
  startDate: string;
  description: string;
  instructor: string;
  language: Language;
  languageCustom?: string;
  status: Status;
}

export interface CreateCourseData extends BaseCourseData {
  rating: number;
  comment: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateCourseData
  extends BaseCourseData,
    Omit<CreateCourseData, "status"> {
  rating: number;
  comment: string;
}

export interface Course extends CreateCourseData {
  id: number;
  endDate?: string;
}

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
  onUpdate: (course: Course) => void;
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
  onSaveCourse: (course: CreateCourseData) => void;
  onUpdateCourse: (course: Course) => void;
}

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
