'use client'

import { useState } from "react";
import { Search } from "lucide-react";
import { Course } from "@/types";
import { Spinner } from "@/components/ui/Spinner";
import ConfirmDeleteModal from "@/components/courses/CourseModals/ConfirmDeleteModal";
import { CourseCard } from "./CourseCard";

interface CoursesListProps {
    courses: Course[];
    onEdit: (course: Course) => void;
    onDelete: (courseId: number) => void;
    onViewDetails: (course: Course) => void;
    isLoading?: boolean;
}

export function CoursesList({ courses, onEdit, onDelete, onViewDetails, isLoading = false }: CoursesListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("all");
    const [selectedPlatform, setSelectedPlatform] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);

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

    const handleDeleteClick = (course: Course) => setCourseToDelete(course);
    const handleConfirmDelete = () => { if (courseToDelete) { onDelete(courseToDelete.id); setCourseToDelete(null); } };
    const handleCancelDelete = () => setCourseToDelete(null);

    if (isLoading) return <div className="flex justify-center items-center h-64"><Spinner size="lg" /></div>;

    return (
        <div className="mt-8">
            {/* Filtros */}
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

                    <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                        {topics.map(t => <option key={t} value={t}>{t === "all" ? "Todos os tópicos" : t}</option>)}
                    </select>

                    <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)} className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                        {platforms.map(p => <option key={p} value={p}>{p === "all" ? "Todas as plataformas" : p}</option>)}
                    </select>

                    <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500">
                        {statuses.map(s => <option key={s} value={s}>{s === "all" ? "Todos os status" : s}</option>)}
                    </select>
                </div>
            </div>

            {/* Lista de Cursos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCourses.map(course => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onEdit={onEdit}
                        onDelete={() => handleDeleteClick(course)}
                        onViewDetails={onViewDetails}
                    />
                ))}

                <ConfirmDeleteModal
                    show={!!courseToDelete}
                    courseName={courseToDelete?.name}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            </div>

            {filteredCourses.length === 0 && !isLoading && (
                <div className="text-center py-12">
                    <div className="bg-gray-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Nenhum curso encontrado</h3>
                    <p className="text-gray-400">Tente ajustar os filtros ou adicionar um novo curso</p>
                </div>
            )}
        </div>
    );
}
