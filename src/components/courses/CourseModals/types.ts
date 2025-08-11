export type Topic = "Frontend" | "Backend" | "Design" | "Data Science" | "DevOps" | "Mobile" | "Full Stack" | "Outro";
export type Platform = "Udemy" | "Coursera" | "YouTube" | "edX" | "Pluralsight" | "LinkedIn Learning" | "Vue Mastery" | "Rocketseat" | "Outro";
export type Language = "Português" | "English" | "Español" | "Français" | "Outro";
export type Status = "Não Iniciado" | "Em Progresso" | "Concluído";

export interface BaseCourseData {
  name: string;
  platform: Platform;
  platformCustom?: string;
  duration: string;
  topic: Topic;
  topicCustom?: string;
  startDate: string;
  description: string;
  instructor: string;
  language: Language;
  languageCustom?: string;
}

export interface CreateCourseData extends BaseCourseData {
  progress: number;
  rating: number;
  comment: string;
  status: Status;
}

export interface Course extends CreateCourseData {
  id: string;
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