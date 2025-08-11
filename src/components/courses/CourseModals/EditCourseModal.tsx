'use client'

import { useState } from "react";
import { X, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "../../../components/ui/Spinner";
import { EditCourseModalProps } from "./types";
import { getLanguageSymbol } from "./CourseIcons";
import { STATUS_OPTIONS } from "./constants";
import { useCourseProgress } from "./hooks/useCourseProgress";
import { FormInput, FormSelect, FormTextarea } from "./FormControls";

export const EditCourseModal = ({
    show,
    course,
    onClose,
    onUpdate,
    loading,
}: EditCourseModalProps) => {
    const {
        course: editCourse,
        studyHours,
        setStudyHours,
        updateProgress,
        addStudyHours
    } = useCourseProgress(course);

    const [editRating, setEditRating] = useState(course.rating);
    const [editComment, setEditComment] = useState(course.comment);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({
            ...editCourse,
            rating: editRating,
            comment: editComment,
        });
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6 gap-1">
                        <h2 className="text-xl font-semibold text-white">Editar Curso</h2>
                        <button
                            onClick={onClose}
                            className="cursor-pointer text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Course Info Preview */}
                        <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-lg">
                            <span className="text-2xl">
                                {getLanguageSymbol(editCourse.topic, editCourse.name)}
                            </span>
                            <div>
                                <div className="font-medium text-white">{editCourse.name}</div>
                                <div className="text-sm text-gray-400">
                                    {editCourse.platform} • {editCourse.duration} • {editCourse.topic}
                                </div>
                            </div>
                        </div>

                        {/* Progress Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Progresso ({editCourse.progress}%)
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={editCourse.progress}
                                onChange={(e) => updateProgress(parseInt(e.target.value))}
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

                            <div className="flex gap-2 mt-3">
                                {[25, 50, 75, 100].map((percent) => (
                                    <button
                                        key={percent}
                                        type="button"
                                        onClick={() => updateProgress(percent)}
                                        className={cn(
                                            "flex-1 py-1 px-2 text-white text-xs rounded transition-colors duration-200",
                                            percent === 100
                                                ? "bg-emerald-600 hover:bg-emerald-700"
                                                : "bg-gray-700 hover:bg-gray-600"
                                        )}
                                    >
                                        {percent}%
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Study Hours Section */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Horas de Estudo Adicionais
                            </label>
                            <div className="flex items-center gap-2">
                                <FormInput
                                    label="Horas de estudo"
                                    type="number"
                                    min="0"
                                    max="10"
                                    step="0.5"
                                    placeholder="0"
                                    value={studyHours || ""}
                                    onChange={(e) => setStudyHours(parseFloat(e.target.value) || 0)}
                                />
                                <button
                                    type="button"
                                    onClick={() => addStudyHours(studyHours)}
                                    disabled={!studyHours || studyHours <= 0}
                                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 text-sm"
                                >
                                    + Adicionar
                                </button>
                            </div>

                            <div className="mt-2 p-2 bg-gray-700/20 rounded text-xs text-gray-400">
                                <div>Duração total: {editCourse.duration}</div>
                                <div>
                                    Horas estudadas:{" "}
                                    {Math.round(
                                        (editCourse.progress / 100) *
                                        (parseInt(editCourse.duration.replace(/\D/g, "")) || 0) *
                                        10
                                    ) / 10}
                                    h
                                </div>
                                <div>Progresso atual: {editCourse.progress}%</div>
                            </div>
                        </div>

                        {/* Status */}
                        <FormSelect
                            label="Status"
                            value={editCourse.status}
                            onChange={(e) => updateProgress(
                                e.target.value === "Concluído" ? 100 :
                                    e.target.value === "Em Progresso" ? Math.max(editCourse.progress, 1) :
                                        0
                            )}
                            options={STATUS_OPTIONS}
                        />

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
                        <FormTextarea
                            label="Comentário"
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                            rows={3}
                            placeholder="Sua opinião sobre o curso..."
                        />

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