'use client'

import { Search, Edit2, Trash2, Star, Eye } from "lucide-react";
import { useState } from "react";
import { Course } from "@/types";
import { Spinner } from "@/components/ui/Spinner";
import { getLanguageSymbol } from "@/components/courses/CourseModals/CourseIcons";

interface CoursesListProps {
    courses: Course[];
    onEdit: (course: Course) => void;
    onDelete: (courseId: number) => void;
    onViewDetails: (course: Course) => void;
    isLoading?: boolean;
}

export function CoursesList({
    courses,
    onEdit,
    onDelete,
    onViewDetails,
    isLoading = false,
}: CoursesListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("all");
    const [selectedPlatform, setSelectedPlatform] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    console.log('COURSES -> ', courses)

    const topics = ["all", "Frontend", "Backend", "Design", "Mobile", "Data Science", "DevOps"];
    const platforms = ["all", "Udemy", "Coursera", "YouTube", "Alura", "edX", "Pluralsight"];
    const statuses = ["all", "Não Iniciado", "Em Progresso", "Concluído"];

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesTopic = selectedTopic === "all" || course.topic === selectedTopic;
        const matchesPlatform = selectedPlatform === "all" || course.platform === selectedPlatform;
        const matchesStatus = selectedStatus === "all" || course.status === selectedStatus;

        return matchesSearch && matchesTopic && matchesPlatform && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Concluído":
                return "bg-green-600/20 text-green-400";
            case "Em Progresso":
                return "bg-emerald-600/20 text-emerald-400";
            case "Não Iniciado":
                return "bg-gray-600/20 text-gray-400";
            default:
                return "bg-gray-600/20 text-gray-400";
        }
    };


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="mt-8">
            {/* Filtros */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar cursos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        />
                    </div>

                    {/* Topic Filter */}
                    <select
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                        {topics.map((topic) => (
                            <option key={topic} value={topic} className="bg-gray-800">
                                {topic === "all" ? "Todos os tópicos" : topic}
                            </option>
                        ))}
                    </select>

                    {/* Platform Filter */}
                    <select
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                        {platforms.map((platform) => (
                            <option key={platform} value={platform} className="bg-gray-800">
                                {platform === "all" ? "Todas as plataformas" : platform}
                            </option>
                        ))}
                    </select>

                    {/* Status Filter */}
                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                        {statuses.map((status) => (
                            <option key={status} value={status} className="bg-gray-800">
                                {status === "all" ? "Todos os status" : status}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Lista de Cursos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                    <div
                        key={course.id}
                        className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-200"
                    >
                        {/* Cabeçalho do Curso */}
                        <div className="flex items-start justify-between mb-4 flex-wrap sm:no-wrap">
                            <div className="flex items-start gap-3 flex-1">
                                <span className="text-2xl">
                                    {getLanguageSymbol(course.topic || "Outro", course.name)}
                                </span>
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
                                        <span className="bg-gray-600/50 px-2 py-1 rounded text-xs text-gray-300">
                                            {course.topic}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onViewDetails(course)}
                                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                                    title="Ver detalhes"
                                >
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => onEdit(course)}
                                    className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                                    title="Editar curso"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => onDelete(course.id)}
                                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
                                    title="Deletar curso"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Barra de Progresso */}
                        <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-400 mb-2">
                                <span>Progresso</span>
                                <span>{course.progress || 0}%</span>
                            </div>
                            <div className="bg-gray-600 rounded-full h-2">
                                <div
                                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${course.progress || 0}%` }}
                                />
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-sm text-gray-400">Avaliação:</span>
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < Math.round(course.rating || 0)
                                                    ? "text-yellow-400 fill-current"
                                                    : "text-gray-600"
                                                }`}
                                        />
                                    ))}
                                </div>
                                {course.rating > 0 && (
                                    <span className="text-sm text-gray-400 ml-1">
                                        ({course.rating.toFixed(1)})
                                    </span>
                                )}
                            </div>
                            {course.comment && (
                                <p className="text-sm text-gray-400 italic">
                                    {`"${course.comment}"`}
                                </p>
                            )}
                        </div>

                        {/* Status e Datas */}
                        <div className="flex items-center justify-between gap-4 sm:gap-0">
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.status || "Não Iniciado")}`}
                            >
                                {course.status}
                            </span>
                            <div className="text-xs text-gray-500">
                                {course.startDate && (
                                    <>
                                        Iniciado:{" "}
                                        {new Date(course.startDate).toLocaleDateString("pt-BR")}
                                    </>
                                )}
                                {course.endDate && (
                                    <span>
                                        {" "}
                                        • Concluído:{" "}
                                        {new Date(course.endDate).toLocaleDateString("pt-BR")}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCourses.length === 0 && !isLoading && (
                <div className="text-center py-12">
                    <div className="bg-gray-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">
                        Nenhum curso encontrado
                    </h3>
                    <p className="text-gray-400">
                        Tente ajustar os filtros ou adicionar um novo curso
                    </p>
                </div>
            )}
        </div>
    );
}