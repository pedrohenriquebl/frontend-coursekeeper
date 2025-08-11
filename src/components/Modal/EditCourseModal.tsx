'use client'

import React, { useState } from "react";
import { X, Star, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/Spinner";
import { Course, CourseStatus } from "@/types";
import { getLanguageSymbol } from "./CourseIcons";

interface EditCourseModalProps {
    show: boolean;
    course: Course;
    onClose: () => void;
    onUpdate: (course: Course) => void;
    loading: boolean;
}

export const EditCourseModal: React.FC<EditCourseModalProps> = ({
    show,
    course,
    onClose,
    onUpdate,
    loading,
}) => {
    const [editCourse, setEditCourse] = useState<Course>(course);
    const [editRating, setEditRating] = useState(course.rating);
    const [editComment, setEditComment] = useState(course.comment);
    const [studyHours, setStudyHours] = useState<number>(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({
            ...editCourse,
            rating: editRating,
            comment: editComment,
        });
        onClose();
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6 gap-1">
                        <h2 className="text-xl font-semibold text-white">
                            Editar Curso
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Course Info */}
                        <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-lg">
                            <span className="text-2xl">
                                {getLanguageSymbol(editCourse.topic, editCourse.name)}
                            </span>
                            <div>
                                <div className="font-medium text-white">
                                    {editCourse.name}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {editCourse.platform} • {editCourse.duration} •{" "}
                                    {editCourse.topic}
                                </div>
                            </div>
                        </div>

                        {/* Progress */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Progresso ({editCourse.progress}%)
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={editCourse.progress}
                                onChange={(e) => {
                                    const newProgress = parseInt(e.target.value);
                                    setEditCourse(prev => ({
                                        ...prev,
                                        progress: newProgress,
                                        status: newProgress === 100 ? "Concluído" : 
                                               newProgress > 0 ? "Em Progresso" : "Não Iniciado",
                                        endDate: newProgress === 100 ? new Date().toISOString().split("T")[0] : prev.endDate
                                    }));
                                }}
                                className="w-full h-3 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${editCourse.progress}%, #4b5563 ${editCourse.progress}%, #4b5563 100%)`,
                                }}
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                <span>0%</span>
                                <span>25%</span>
                                <span>50%</span>
                                <span>75%</span>
                                <span>100%</span>
                            </div>

                            {/* Quick Progress Buttons */}
                            <div className="flex gap-2 mt-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditCourse(prev => ({
                                            ...prev,
                                            progress: 25,
                                            status: "Em Progresso"
                                        }));
                                    }}
                                    className="flex-1 py-1 px-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors duration-200"
                                >
                                    25%
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditCourse(prev => ({
                                            ...prev,
                                            progress: 50,
                                            status: "Em Progresso"
                                        }));
                                    }}
                                    className="flex-1 py-1 px-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors duration-200"
                                >
                                    50%
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditCourse(prev => ({
                                            ...prev,
                                            progress: 75,
                                            status: "Em Progresso"
                                        }));
                                    }}
                                    className="flex-1 py-1 px-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded transition-colors duration-200"
                                >
                                    75%
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditCourse(prev => ({
                                            ...prev,
                                            progress: 100,
                                            status: "Concluído",
                                            endDate: new Date().toISOString().split("T")[0]
                                        }));
                                    }}
                                    className="flex-1 py-1 px-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded transition-colors duration-200"
                                >
                                    Concluir
                                </button>
                            </div>
                        </div>

                        {/* Study Hours Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Horas de Estudo Adicionais
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.5"
                                    placeholder="0"
                                    value={studyHours || ""}
                                    onChange={(e) =>
                                        setStudyHours(parseFloat(e.target.value) || 0)
                                    }
                                    className="flex-1 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (studyHours > 0) {
                                            const totalDuration = parseInt(editCourse.duration.replace(/\D/g, "")) || 1;
                                            const currentStudied = (editCourse.progress / 100) * totalDuration;
                                            const newStudied = currentStudied + studyHours;
                                            const newProgress = Math.min(
                                                Math.round((newStudied / totalDuration) * 100),
                                                100,
                                            );

                                            setEditCourse(prev => ({
                                                ...prev,
                                                progress: newProgress,
                                                status: newProgress === 100 ? "Concluído" : 
                                                       newProgress > 0 ? "Em Progresso" : "Não Iniciado",
                                                endDate: newProgress === 100 ? new Date().toISOString().split("T")[0] : prev.endDate
                                            }));

                                            setStudyHours(0);
                                        }
                                    }}
                                    disabled={!studyHours || studyHours <= 0}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm"
                                >
                                    + Adicionar
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 gap-4 sm:gap-0">
                                Adicione horas estudadas para atualizar o progresso
                                automaticamente
                            </p>

                            {/* Current Study Info */}
                            <div className="mt-2 p-2 bg-gray-700/20 rounded text-xs text-gray-400">
                                <div>Duração total: {editCourse.duration}</div>
                                <div>
                                    Horas estudadas:{" "}
                                    {Math.round(
                                        (editCourse.progress / 100) *
                                        (parseInt(editCourse.duration.replace(/\D/g, "")) || 0) *
                                        10,
                                    ) / 10}
                                    h
                                </div>
                                <div>Progresso atual: {editCourse.progress}%</div>
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Status
                            </label>
                            <select
                                value={editCourse.status}
                                onChange={(e) =>
                                    setEditCourse(prev => ({
                                        ...prev,
                                        status: e.target.value as CourseStatus
                                    }))
                                }
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                            >
                                <option value="Não Iniciado" className="bg-gray-800">
                                    Não Iniciado
                                </option>
                                <option value="Em Progresso" className="bg-gray-800">
                                    Em Progresso
                                </option>
                                <option value="Concluído" className="bg-gray-800">
                                    Concluído
                                </option>
                            </select>
                        </div>

                        {/* Rating */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Avaliação
                            </label>
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setEditRating(star)}
                                        className={cn(
                                            "text-2xl transition-colors duration-200",
                                            star <= editRating
                                                ? "text-yellow-400"
                                                : "text-gray-600 hover:text-yellow-400",
                                        )}
                                    >
                                        <Star
                                            className={cn(
                                                "h-6 w-6",
                                                star <= editRating && "fill-current",
                                            )}
                                        />
                                    </button>
                                ))}
                                <span className="ml-2 text-gray-400">({editRating}/5)</span>
                            </div>
                        </div>

                        {/* Comment */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Comentário
                            </label>
                            <textarea
                                rows={3}
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                                placeholder="Sua opinião sobre o curso..."
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg transition-colors duration-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className={cn(
                                    "flex-1 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2",
                                    loading
                                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                        : "bg-emerald-600 hover:bg-emerald-700 text-white",
                                )}
                            >
                                {loading ? (
                                    <>
                                        <Spinner
                                            size="sm"
                                            className="border-gray-300 border-t-transparent"
                                        />
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