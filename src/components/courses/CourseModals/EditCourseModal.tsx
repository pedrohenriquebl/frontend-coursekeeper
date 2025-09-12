'use client'

import { useState, useEffect } from "react";
import { X, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/Spinner";
import { getLanguageSymbol, getStatusColor } from "./CourseIcons";
import { FormInput, FormTextarea } from "./FormControls";
import { EditCourseModalProps, UpdateCoursePayload } from "@/types";
import { handleStatusLabel } from "@/utils/handleStatusLabel";

export const EditCourseModal = ({
  show,
  course,
  onClose,
  onUpdate,
}: EditCourseModalProps) => {
  const [editCourse, setEditCourse] = useState(course);
  const [studyHours, setStudyHours] = useState(0);
  const [editRating, setEditRating] = useState(course.rating ?? 0);
  const [editComment, setEditComment] = useState(course.comment ?? "");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditCourse(course);
    setEditRating(course.rating ?? 0);
    setEditComment(course.comment ?? "");
    setStudyHours(0);
  }, [course]);

  if (!show || !editCourse) return null;

  const hasChanges = () => {
    if (!editCourse || !course) return false;

    return (
      editCourse.studiedHours !== (course.studiedHours || 0) ||
      editCourse.progress !== (course.progress || 0) ||
      editRating !== (course.rating || 0) ||
      editComment !== (course.comment || "")
    );
  };

  const addStudyHours = (hours: number) => {
    if (!hours || !editCourse) return;

    const totalStudied = (editCourse.studiedHours || 0) + hours;

    const duration = editCourse.duration || 1;
    const newProgress = Math.min(Math.round((totalStudied / duration) * 100), 100);

    setEditCourse({
      ...editCourse,
      studiedHours: totalStudied,
      progress: newProgress,
      status:
        newProgress === 100
          ? "CONCLUIDO"
          : newProgress > 0
            ? "EM_PROGRESSO"
            : "NAO_INICIADO",
      endDate: newProgress === 100 ? new Date().toISOString() : editCourse.endDate,
    });

    setStudyHours(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCourse) return;

    setIsSaving(true);

    const studiedHours = Math.round((editCourse.progress / 100) * (editCourse.duration || 1) * 10) / 10;

    const payload: UpdateCoursePayload = {
      id: editCourse.id,
      studiedHours,
      rating: editRating,
      comment: editComment,
      status: editCourse.status,
      endDate: editCourse.progress === 100 ? new Date().toISOString() : editCourse.endDate,
    };

    await onUpdate(payload);
    await new Promise(res => setTimeout(res, 700));

    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[color:var(--modal-overlay-bg,rgba(0,0,0,0.5))] flex items-center justify-center z-50 p-4">
      <div className="bg-[color:var(--modal-bg,#23272f)] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 gap-1">
            <h2 className="text-xl font-semibold text-[color:var(--modal-title,#fff)]">Editar Curso</h2>
            <button
              onClick={onClose}
              className="cursor-pointer text-[color:var(--modal-close,#a3a3a3)] hover:text-[color:var(--modal-close-hover,#fff)] transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Curso preview */}
            <div className="flex items-center gap-3 p-4 bg-[color:var(--modal-preview-bg,rgba(55,65,81,0.3))] rounded-lg">
              <span className="text-2xl">
                {getLanguageSymbol(editCourse.topic, editCourse.name)}
              </span>
              <div>
                <div className="font-medium text-[color:var(--modal-preview-title,#fff)]">{editCourse.name}</div>
                <div className="text-sm text-[color:var(--modal-preview-meta,#a3a3a3)]">
                  {editCourse.platform} • {editCourse.duration}h • {editCourse.topic}
                </div>
              </div>
            </div>

            {/* Progresso */}
            <div>
              <label className="block text-sm font-medium text-[color:var(--modal-preview-label,#a3a3a3)] mb-2">
                Progresso ({editCourse.progress}%)
              </label>
              <progress
                value={editCourse.progress}
                max={100}
                className="w-full h-3 rounded-lg"
                style={{ accentColor: "var(--modal-progress-bar,#10b981)" }}
              />
              <div className="flex gap-2 mt-3">
                {[25, 50, 75].map((percent) => (
                  <button
                    key={percent}
                    type="button"
                    onClick={() =>
                      setEditCourse({
                        ...editCourse,
                        studiedHours: editCourse.duration || 0,
                        progress: percent,
                        status: "EM_PROGRESSO",
                      })
                    }
                    className="flex-1 py-1 px-2 bg-[color:var(--modal-preview-bg,rgba(55,65,81,0.3))] hover:bg-[color:var(--modal-preview-bg-hover,#52525b)] text-[color:var(--modal-preview-title,#fff)] text-xs rounded transition-colors duration-200"
                  >
                    {percent}%
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setEditCourse({
                      ...editCourse,
                      progress: 100,
                      status: "CONCLUIDO",
                      endDate: new Date().toISOString(),
                    })
                  }
                  className="flex-1 py-1 px-2 bg-[color:var(--modal-submit-bg,#059669)] hover:bg-[color:var(--modal-submit-bg-hover,#047857)] text-[color:var(--modal-submit-text,#fff)] text-xs rounded transition-colors duration-200"
                >
                  Concluir
                </button>
              </div>
            </div>

            {/* Horas de estudo adicionais */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Horas de Estudo Adicionais
              </label>
              <div className="flex items-end gap-2 w-full">
                <FormInput
                  label="Horas de estudo"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={studyHours || ""}
                  onChange={(e) => setStudyHours(parseFloat(e.target.value) || 0)}
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => addStudyHours(studyHours)}
                  disabled={!studyHours || studyHours <= 0}
                  className="cursor-pointer h-[50px] px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm"
                >
                  + Adicionar
                </button>
              </div>
              <div className="mt-2 p-2 bg-[color:var(--modal-preview-bg,rgba(55,65,81,0.2))] rounded text-xs text-[color:var(--modal-preview-meta,#a3a3a3)]">
                <div>Duração total: {editCourse.duration} horas</div>
                <div>
                  Horas estudadas:{" "}
                  {Math.round((editCourse.progress / 100) * editCourse.duration * 10) / 10}h
                </div>
                <div>Progresso atual: {editCourse.progress}%</div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between gap-4 sm:gap-0">
              <span
                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(handleStatusLabel(course.status) || "Não Iniciado")}`}
              >
                {handleStatusLabel(course.status)}
              </span>
              <div className="text-xs text-[color:var(--modal-preview-meta,#a3a3a3)]">
                {course.startDate && (
                  <>
                    Iniciado:{" "}
                    {new Date(course.startDate).toLocaleDateString("pt-BR")}
                  </>
                )}
                {course.endDate && course.status === "CONCLUIDO" && (
                  <span>
                    {" "}
                    • Concluído:{" "}
                    {new Date(course.endDate).toLocaleDateString("pt-BR")}
                  </span>
                )}
              </div>
            </div>

            {/* Avaliação */}
            <div>
              <label className="block text-sm font-medium text-[color:var(--modal-preview-label,#a3a3a3)] mb-2">
                Avaliação
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      if (editRating === star && star === 1) {
                        setEditRating(0);
                      } else {
                        setEditRating(star);
                      }
                    }}
                    className={cn(
                      "text-2xl transition-colors duration-200",
                      star <= editRating
                        ? "text-[color:var(--modal-star,#facc15)]"
                        : "text-[color:var(--modal-star-empty,#52525b)] hover:text-[color:var(--modal-star,#facc15)]"
                    )}
                  >
                    <Star className={cn("h-6 w-6", star <= editRating && "fill-current")} />
                  </button>
                ))}
                <span className="ml-2 text-[color:var(--modal-preview-meta,#a3a3a3)]">({editRating}/5)</span>
              </div>
            </div>

            {/* Comentário */}
            <FormTextarea
              label="Comentário"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
              rows={3}
              placeholder="Sua opinião sobre o curso..."
            />

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-[color:var(--modal-cancel-bg,#52525b)] hover:bg-[color:var(--modal-cancel-bg-hover,#3f3f46)] text-[color:var(--modal-cancel-text,#fff)] py-3 rounded-lg transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!hasChanges() || isSaving}
                className={cn(
                  "flex-1 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2",
                  !hasChanges()
                    ? "bg-[color:var(--modal-submit-bg-disabled,#52525b)] text-[color:var(--modal-submit-text-disabled,#d4d4d8)] cursor-not-allowed"
                    : isSaving
                      ? "bg-[color:var(--modal-submit-bg-disabled,#52525b)] text-[color:var(--modal-submit-text-disabled,#d4d4d8)] cursor-not-allowed"
                      : "bg-[color:var(--modal-submit-bg,#059669)] hover:bg-[color:var(--modal-submit-bg-hover,#047857)] text-[color:var(--modal-submit-text,#fff)]"
                )}
              >
                {isSaving ? (
                  <>
                    <Spinner size="sm" className="border-[color:var(--modal-spinner,#d4d4d8)] border-t-transparent" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Alterações"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
