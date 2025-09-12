'use client'

import { Eye, Edit2, Trash2, Star } from "lucide-react";
import { Course } from "@/types";
import { getLanguageSymbol } from "@/components/courses/CourseModals/CourseIcons";
import { handleStatusLabel } from "@/utils/handleStatusLabel";
interface CourseCardProps {
    course: Course;
    onEdit: (course: Course) => void;
    onDelete: (course: Course) => void;
    onViewDetails: (course: Course) => void;
}

export function CourseCard({ course, onEdit, onDelete, onViewDetails }: CourseCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "CONCLUIDO":
                return "bg-[color:var(--modal-completed-bg,rgba(22,163,74,0.2))] text-[color:var(--modal-completed-icon,#22c55e)]";
            case "EM_PROGRESSO":
                return "bg-[color:var(--modal-progress-bg,#059669)]/20 text-[color:var(--modal-progress-bar,#10b981)]";
            case "NAO_INICIADO":
                return "bg-[color:var(--modal-preview-bg,#52525b)]/20 text-[color:var(--modal-preview-meta,#a3a3a3)]";
            case "NAO_CONCLUIDO":
                return "bg-[color:var(--modal-delete-bg,#dc2626)]/20 text-[color:var(--modal-delete-bg,#dc2626)]";
            default:
                return "bg-[color:var(--modal-preview-bg,#52525b)]/20 text-[color:var(--modal-preview-meta,#a3a3a3)]";
        }
    };

    return (
        <div
            className="bg-[color:var(--modal-bg,#23272f)]/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border hover:scale-105
             border-[color:var(--modal-preview-bg,#52525b)]/50 hover:border-[color:var(--modal-submit-bg,#059669)]/50 transition-all duration-200"
        >
            {/* Cabeçalho */}
            <div className="flex items-start justify-between mb-4 flex-wrap sm:no-wrap">
                <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl">{getLanguageSymbol(course.topic || "Outro", course.name)}</span>
                    <div className="flex-1">
                        <h3
                            className="text-lg font-semibold text-[color:var(--modal-title,#fff)] mb-2 cursor-pointer hover:text-[color:var(--modal-submit-bg,#059669)] transition-colors duration-200"
                            onClick={() => onViewDetails(course)}
                        >
                            {course.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-[color:var(--modal-preview-meta,#a3a3a3)] mb-3">
                            <span>{course.platform}</span>
                            <span>•</span>
                            <span>{course.duration}h</span>
                            <span>•</span>
                            <span className="bg-[color:var(--modal-preview-bg,#52525b)]/50 px-2 py-1 rounded text-xs text-[color:var(--modal-preview-comment,#d4d4d8)]">{course.topic}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => onViewDetails(course)} className="p-2 text-[color:var(--modal-close,#a3a3a3)] hover:text-[color:var(--topic-frontend,#60a5fa)] hover:bg-[color:var(--modal-preview-bg,#52525b)]/50 rounded-lg">
                        <Eye className="h-4 w-4" />
                    </button>
                    {
                        course.status !== "NAO_CONCLUIDO" && (
                            <button onClick={() => onEdit(course)} className="p-2 text-[color:var(--modal-close,#a3a3a3)] hover:text-[color:var(--modal-submit-bg,#059669)] hover:bg-[color:var(--modal-preview-bg,#52525b)]/50 rounded-lg">
                                <Edit2 className="h-4 w-4" />
                            </button>
                        )
                    }
                    <button onClick={() => onDelete(course)} className="p-2 text-[color:var(--modal-close,#a3a3a3)] hover:text-[color:var(--modal-delete-bg,#dc2626)] hover:bg-[color:var(--modal-preview-bg,#52525b)]/50 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Barra de progresso */}
            <div className="mb-4">
                <div className="flex justify-between text-sm text-[color:var(--modal-preview-meta,#a3a3a3)] mb-2">
                    <span>Progresso</span>
                    <span>{course.progress || 0}%</span>
                </div>
                <div className="bg-[color:var(--modal-progress-bg,#52525b)] rounded-full h-2">
                    <div className="bg-[color:var(--modal-progress-bar,#10b981)] h-2 rounded-full transition-all duration-300" style={{ width: `${course.progress || 0}%` }} />
                </div>
            </div>

            {/* Avaliação */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-[color:var(--modal-preview-meta,#a3a3a3)]">Avaliação:</span>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.round(course.rating || 0) ? "text-[color:var(--modal-star,#facc15)] fill-current" : "text-[color:var(--modal-star-empty,#52525b)]"}`}
                            />
                        ))}
                    </div>
                    {(course.rating ?? 0) > 0 && <span className="text-sm text-[color:var(--modal-preview-meta,#a3a3a3)] ml-1">({(course.rating ?? 0).toFixed(1)})</span>}
                </div>
                {course.comment && <p className="text-sm text-[color:var(--modal-preview-meta,#a3a3a3)] italic">{`"${course.comment}"`}</p>}
            </div>

            {/* Status e datas */}
            <div className="flex items-center justify-between gap-4 sm:gap-0">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.status || "Não Iniciado")}`}>
                    {handleStatusLabel(course.status)}
                </span>
                <div className="text-xs text-[color:var(--modal-preview-meta,#a3a3a3)]">
                    {course.startDate && <>Iniciado: {new Date(course.startDate).toLocaleDateString("pt-BR")}</>}
                    {course.endDate && (course.status === "CONCLUIDO" || course.status === "NAO_CONCLUIDO") && (
                        <> • {course.status === "CONCLUIDO" ? "Concluído" : "Vencimento"}: {new Date(course.endDate).toLocaleDateString("pt-BR")}</>
                    )}
                </div>
            </div>
        </div>
    );
}
