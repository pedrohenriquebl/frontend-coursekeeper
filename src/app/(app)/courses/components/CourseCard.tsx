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
                return "bg-green-600/20 text-green-400";
            case "EM_PROGRESSO":
                return "bg-emerald-600/20 text-emerald-400";
            case "NAO_INICIADO":
                return "bg-gray-600/20 text-gray-400";
            default:
                return "bg-gray-600/20 text-gray-400";
        }
    };

    return (
        <div
            className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-200"
        >
            {/* Cabeçalho */}
            <div className="flex items-start justify-between mb-4 flex-wrap sm:no-wrap">
                <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl">{getLanguageSymbol(course.topic || "Outro", course.name)}</span>
                    <div className="flex-1">
                        <h3
                            className="text-lg font-semibold text-white mb-2 cursor-pointer hover:text-emerald-400 transition-colors duration-200"
                            onClick={() => onViewDetails(course)}
                        >
                            {course.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                            <span>{course.platform}</span>
                            <span>•</span>
                            <span>{course.duration}h</span>
                            <span>•</span>
                            <span className="bg-gray-600/50 px-2 py-1 rounded text-xs text-gray-300">{course.topic}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button onClick={() => onViewDetails(course)} className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded-lg">
                        <Eye className="h-4 w-4" />
                    </button>
                    <button onClick={() => onEdit(course)} className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-gray-700/50 rounded-lg">
                        <Edit2 className="h-4 w-4" />
                    </button>
                    <button onClick={() => onDelete(course)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Barra de progresso */}
            <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Progresso</span>
                    <span>{course.progress || 0}%</span>
                </div>
                <div className="bg-gray-600 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full transition-all duration-300" style={{ width: `${course.progress || 0}%` }} />
                </div>
            </div>

            {/* Avaliação */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400">Avaliação:</span>
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-4 w-4 ${i < Math.round(course.rating || 0) ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                            />
                        ))}
                    </div>
                    {(course.rating ?? 0) > 0 && <span className="text-sm text-gray-400 ml-1">({(course.rating ?? 0).toFixed(1)})</span>}
                </div>
                {course.comment && <p className="text-sm text-gray-400 italic">{`"${course.comment}"`}</p>}
            </div>

            {/* Status e datas */}
            <div className="flex items-center justify-between gap-4 sm:gap-0">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.status || "Não Iniciado")}`}>
                    {handleStatusLabel(course.status)}
                </span>
                <div className="text-xs text-gray-500">
                    {course.startDate && <>Iniciado: {new Date(course.startDate).toLocaleDateString("pt-BR")}</>}
                    {course.endDate && course.status === "CONCLUIDO" && <> • Concluído: {new Date(course.endDate).toLocaleDateString("pt-BR")}</>}
                </div>
            </div>
        </div>
    );
}
