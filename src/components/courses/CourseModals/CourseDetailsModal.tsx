'use client'

import { X, Calendar, Clock, Monitor, Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTopicIcon, getLanguageSymbol, getStatusColor } from "./CourseIcons";
import { Course } from "@/types";
import { handleStatusLabel } from "@/utils/handleStatusLabel";

interface CourseDetailsModalProps {
  show: boolean;
  course: Course;
  onClose: () => void;
}

export const CourseDetailsModal = ({
  show,
  course,
  onClose,
}: CourseDetailsModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-[color:var(--modal-overlay-bg,rgba(0,0,0,0.5))] flex items-center justify-center z-50 p-4">
      <div className="bg-[color:var(--modal-bg,#23272f)] rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6 gap-1">
            <h2 className="text-xl font-semibold text-[color:var(--modal-title,#fff)]">
              Detalhes do Curso
            </h2>
            <button
              onClick={onClose}
              className="cursor-pointer text-[color:var(--modal-close,#a3a3a3)] hover:text-[color:var(--modal-close-hover,#fff)] transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Cabeçalho do Curso */}
            <div className="flex items-start gap-4">
              <span className="text-4xl">
                {getLanguageSymbol(course.topic, course.name)}
              </span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-[color:var(--modal-preview-title,#fff)] mb-2">
                  {course.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  {getTopicIcon(course.topic)}
                  <span className="text-[color:var(--modal-preview-meta,#a3a3a3)]">{course.topic}</span>
                </div>
                <span
                  className={cn(
                    "inline-block px-3 py-1 rounded-full text-sm",
                    `${getStatusColor(handleStatusLabel(course.status) || "Não Iniciado")}`
                  )}
                >
                  {handleStatusLabel(course.status)}
                </span>
              </div>
            </div>

            {/* Grid de Informações */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[color:var(--modal-preview-bg,rgba(55,65,81,0.3))] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="h-4 w-4 text-[color:var(--modal-preview-meta,#a3a3a3)]" />
                  <span className="text-sm text-[color:var(--modal-preview-meta,#a3a3a3)]">Plataforma</span>
                </div>
                <span className="text-[color:var(--modal-preview-title,#fff)] font-medium">
                  {course.platform}
                </span>
              </div>

              <div className="bg-[color:var(--modal-preview-bg,rgba(55,65,81,0.3))] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-[color:var(--modal-preview-meta,#a3a3a3)]" />
                  <span className="text-sm text-[color:var(--modal-preview-meta,#a3a3a3)]">Duração</span>
                </div>
                <span className="text-[color:var(--modal-preview-title,#fff)] font-medium">
                  {course.duration}
                </span>
              </div>

              <div className="bg-[color:var(--modal-preview-bg,rgba(55,65,81,0.3))] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-[color:var(--modal-preview-meta,#a3a3a3)]" />
                  <span className="text-sm text-[color:var(--modal-preview-meta,#a3a3a3)]">Início</span>
                </div>
                <span className="text-[color:var(--modal-preview-title,#fff)] font-medium">
                  {new Date(course.startDate).toLocaleDateString("pt-BR")}
                </span>
              </div>

              <div className="bg-[color:var(--modal-preview-bg,rgba(55,65,81,0.3))] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-[color:var(--modal-preview-meta,#a3a3a3)]" />
                  <span className="text-sm text-[color:var(--modal-preview-meta,#a3a3a3)]">Progresso</span>
                </div>
                <span className="text-[color:var(--modal-preview-title,#fff)] font-medium">
                  {course.progress}%
                </span>
              </div>
            </div>

            {/* Barra de Progresso */}
            <div>
              <div className="flex justify-between text-sm text-[color:var(--modal-preview-meta,#a3a3a3)] mb-2">
                <span>Progresso do Curso</span>
                <span>{course.progress}%</span>
              </div>
              <div className="bg-[color:var(--modal-progress-bg,#52525b)] rounded-full h-3">
                <div
                  className="bg-[color:var(--modal-progress-bar,#10b981)] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>

            {/* Avaliação */}
            {(course.rating ?? 0) > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-[color:var(--modal-preview-meta,#a3a3a3)]">Sua Avaliação:</span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < (course.rating ?? 0)
                            ? "text-[color:var(--modal-star,#facc15)] fill-current"
                            : "text-[color:var(--modal-star-empty,#52525b)]"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-[color:var(--modal-preview-meta,#a3a3a3)]">({course.rating}/5)</span>
                </div>
                {course.comment && (
                  <div className="bg-[color:var(--modal-preview-bg,rgba(55,65,81,0.3))] rounded-lg p-3">
                    <p className="text-[color:var(--modal-preview-comment,#d4d4d8)] italic">{`"${course.comment}"`}</p>
                  </div>
                )}
              </div>
            )}

            {/* Descrição */}
            {course.description && (
              <div>
                <h4 className="text-sm font-medium text-[color:var(--modal-preview-label,#a3a3a3)] mb-2">
                  Descrição
                </h4>
                <p className="text-[color:var(--modal-preview-comment,#d4d4d8)] leading-relaxed">
                  {course.description}
                </p>
              </div>
            )}

            {/* Data de Conclusão */}
            {course.endDate && course.status === "CONCLUIDO" && (
              <div className="bg-[color:var(--modal-completed-bg,rgba(22,163,74,0.2))] border border-[color:var(--modal-completed-border,rgba(22,163,74,0.5))] rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-[color:var(--modal-completed-icon,#22c55e)]" />
                  <span className="text-[color:var(--modal-completed-icon,#22c55e)] font-medium">
                    Curso concluído em{" "}
                    {new Date(course.endDate).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};