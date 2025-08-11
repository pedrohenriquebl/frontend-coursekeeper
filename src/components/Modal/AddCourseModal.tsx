'use client'

import React, { useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/Spinner";
import { CreateCourseData } from "@/types";
import { getLanguageSymbol } from "./CourseIcons";

interface AddCourseModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (course: CreateCourseData) => void;
    loading: boolean;
}

const topics = [
    "Frontend",
    "Backend",
    "Design",
    "Data Science",
    "DevOps",
    "Mobile",
    "Full Stack",
    "Outro"
];

const platforms = [
    "Udemy",
    "Coursera",
    "YouTube",
    "edX",
    "Pluralsight",
    "LinkedIn Learning",
    "Vue Mastery",
    "Rocketseat",
    "Outro",
];

const languages = ["Português", "English", "Español", "Français"];

export const AddCourseModal: React.FC<AddCourseModalProps> = ({
    show,
    onClose,
    onSave,
    loading,
}) => {
    const [newCourse, setNewCourse] = useState({
        name: "",
        platform: "",
        platformCustom: "",
        duration: "",
        topic: "Frontend",
        topicCustom: "",
        startDate: new Date().toISOString().split("T")[0],
        description: "",
        instructor: "",
        language: "Português",
        languageCustom: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            newCourse.name &&
            newCourse.platform &&
            newCourse.duration &&
            newCourse.topic
        ) {
            onSave({
                ...newCourse,
                progress: 0,
                rating: 0,
                comment: "",
                status: "Não Iniciado",
            });
            setNewCourse({
                name: "",
                platform: "",
                platformCustom: "",
                duration: "",
                topic: "Frontend",
                topicCustom: "",
                startDate: new Date().toISOString().split("T")[0],
                description: "",
                instructor: "",
                language: "Português",
                languageCustom: "",
            });
            onClose();
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6 gap-1">
                        <h2 className="text-xl font-semibold text-white">
                            Adicionar Novo Curso
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nome do Curso */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Nome do Curso *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={newCourse.name}
                                    onChange={(e) =>
                                        setNewCourse({ ...newCourse, name: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    placeholder="Ex: React 18 Completo - Do Zero ao Avançado"
                                />
                            </div>

                            {/* Plataforma */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Plataforma *
                                </label>
                                <select
                                    required
                                    value={newCourse.platform}
                                    onChange={(e) =>
                                        setNewCourse({ ...newCourse, platform: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                >
                                    <option value="">Selecione uma plataforma</option>
                                    {platforms.map((platform) => (
                                        <option
                                            key={platform}
                                            value={platform}
                                            className="bg-gray-800"
                                        >
                                            {platform}
                                        </option>
                                    ))}
                                </select>
                                {newCourse.platform === "Outro" && (
                                    <input
                                        type="text"
                                        placeholder="Digite a plataforma"
                                        value={newCourse.platformCustom || ""}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, platformCustom: e.target.value })
                                        }
                                        className="mt-2 w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    />
                                )}
                            </div>

                            {/* Duração */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Duração *
                                </label>
                                <input
                                    type="number"
                                    required
                                    value={newCourse.duration}
                                    onChange={(e) =>
                                        setNewCourse({ ...newCourse, duration: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    placeholder="Ex: 42 (horas)"
                                />
                            </div>

                            {/* Tópico */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Tópico *
                                </label>
                                <select
                                    required
                                    value={newCourse.topic}
                                    onChange={(e) =>
                                        setNewCourse({ ...newCourse, topic: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                >
                                    {topics.map((topic) => (
                                        <option
                                            key={topic}
                                            value={topic}
                                            className="bg-gray-800"
                                        >
                                            {topic}
                                        </option>
                                    ))}
                                </select>

                                {newCourse.topic === "outro" && (
                                    <input
                                        type="text"
                                        placeholder="Digite o tópico"
                                        value={newCourse.topicCustom || ""}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, topicCustom: e.target.value })
                                        }
                                        className="mt-2 w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    />
                                )}
                            </div>

                            {/* Idioma */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Idioma
                                </label>
                                <select
                                    value={newCourse.language}
                                    onChange={(e) =>
                                        setNewCourse({ ...newCourse, language: e.target.value })
                                    }
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                >
                                    {languages.map((lang) => (
                                        <option key={lang} value={lang} className="bg-gray-800">
                                            {lang}
                                        </option>
                                    ))}
                                    <option value="Outro">Outro</option>
                                </select>

                                {/* Mostrar input para "Outro" */}
                                {newCourse.language === "Outro" && (
                                    <input
                                        type="text"
                                        placeholder="Digite o idioma"
                                        value={newCourse.languageCustom || ""}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, languageCustom: e.target.value })
                                        }
                                        className="mt-2 w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    />
                                )}
                            </div>

                            {/* Data de Início */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Data de Início
                                </label>
                                <input
                                    type="date"
                                    value={newCourse.startDate}
                                    onChange={(e) =>
                                        setNewCourse({
                                            ...newCourse,
                                            startDate: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                />
                            </div>

                            {/* Instrutor */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Instrutor
                                </label>
                                <input
                                    type="text"
                                    value={newCourse.instructor}
                                    onChange={(e) =>
                                        setNewCourse({
                                            ...newCourse,
                                            instructor: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                                    placeholder="Nome do instrutor"
                                />
                            </div>

                            {/* Descrição */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Descrição
                                </label>
                                <textarea
                                    rows={3}
                                    value={newCourse.description}
                                    onChange={(e) =>
                                        setNewCourse({
                                            ...newCourse,
                                            description: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                                    placeholder="Descrição do curso e objetivos de aprendizado..."
                                />
                            </div>
                        </div>

                        {/* Preview */}
                        {newCourse.name && (
                            <div className="bg-gray-700/30 rounded-lg p-4">
                                <h3 className="text-sm font-medium text-gray-400 mb-2">
                                    Preview do Curso:
                                </h3>
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">
                                        {getLanguageSymbol(newCourse.topic, newCourse.name)}
                                    </span>
                                    <div>
                                        <div className="font-medium text-white">
                                            {newCourse.name}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {newCourse.platform} • {newCourse.duration} •{" "}
                                            {newCourse.topic}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

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
                                        Adicionando...
                                    </>
                                ) : (
                                    "Adicionar Curso"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};