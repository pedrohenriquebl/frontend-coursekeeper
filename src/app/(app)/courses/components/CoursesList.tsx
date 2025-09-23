'use client'

import { useState, useEffect, useCallback, useMemo } from "react";
import { Search, List, Grid2x2, Grid3x3, LayoutGrid, BookAlertIcon } from "lucide-react";
import { Course, FilterPlatform, FilterStatus, FilterTopic } from "@/types";
import { Spinner } from "@/components/ui/Spinner";
import ConfirmDeleteModal from "@/components/courses/CourseModals/ConfirmDeleteModal";
import { CourseCard } from "./CourseCard";

interface CoursesListProps {
    courses: Course[];
    onEdit: (course: Course) => void;
    onDelete: (courseId: number) => void;
    onViewDetails: (course: Course) => void;
    isLoading?: boolean;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filters: {
        topic: FilterTopic;
        platform: FilterPlatform;
        status: FilterStatus;
    };
    onFilterChange: (filters: Partial<{
        topic: FilterTopic;
        platform: FilterPlatform;
        status: FilterStatus;
    }>) => void;
}

export function CoursesList({
    courses,
    onEdit,
    onDelete,
    onViewDetails,
    isLoading = false,
    searchTerm,
    setSearchTerm,
    filters,
    onFilterChange
}: CoursesListProps) {
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
    const [viewMode, setViewMode] = useState<"list" | "grid2" | "grid3" | "grid4">("grid2");
    const [localSearch, setLocalSearch] = useState(searchTerm);

    const topics = useMemo<FilterTopic[]>(() =>
        ["all", "FRONTEND", "BACKEND", "DESIGN", "MOBILE", "DATA SCIENCE", "DEVOPS", "DATABASE", "OUTROS"],
        []
    );

    const platforms = useMemo<FilterPlatform[]>(() =>
        ["all", "UDEMY", "COURSERA", "YOUTUBE", "ALURA", "EDX"],
        []
    );

    const statuses = useMemo<FilterStatus[]>(() =>
        ["all", "NAO_INICIADO", "EM_PROGRESSO", "CONCLUIDO", "NAO_CONCLUIDO"],
        []
    );

    const { topic: selectedTopic, platform: selectedPlatform, status: selectedStatus } = filters;

    const handleTopicChange = useCallback((value: string) => {
        if (topics.includes(value as FilterTopic)) onFilterChange({ topic: value as FilterTopic });
    }, [onFilterChange, topics]);

    const handlePlatformChange = useCallback((value: string) => {
        if (platforms.includes(value as FilterPlatform)) onFilterChange({ platform: value as FilterPlatform });
    }, [onFilterChange, platforms]);

    const handleStatusChange = useCallback((value: string) => {
        if (statuses.includes(value as FilterStatus)) onFilterChange({ status: value as FilterStatus });
    }, [onFilterChange, statuses]);

    useEffect(() => {
        const handler = setTimeout(() => setSearchTerm(localSearch), 400);
        return () => clearTimeout(handler);
    }, [localSearch, setSearchTerm]);

    const handleDeleteClick = useCallback((course: Course) => setCourseToDelete(course), []);
    const handleConfirmDelete = useCallback(() => {
        if (courseToDelete) {
            onDelete(courseToDelete.id);
            setCourseToDelete(null);
        }
    }, [courseToDelete, onDelete]);

    const handleCancelDelete = useCallback(() => setCourseToDelete(null), []);

    if (isLoading) {
        return (
            <div className="mt-8">
                <div className="bg-[color:var(--modal-bg,#23272f)]/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[color:var(--modal-preview-bg,#52525b)]/50 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[color:var(--modal-preview-meta,#a3a3a3)]" />
                            <input
                                type="text"
                                placeholder="Buscar cursos..."
                                value={localSearch}
                                onChange={e => setLocalSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-[color:var(--modal-input-bg,rgba(55,65,81,0.5))] border border-[color:var(--modal-input-border,#52525b)] rounded-lg text-[color:var(--modal-input-text,#fff)] placeholder-[color:var(--modal-input-placeholder,#a3a3a3)] focus:border-[color:var(--modal-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--modal-input-focus,#059669)]"
                                disabled
                            />
                        </div>

                        <select 
                            value={selectedTopic} 
                            onChange={e => handleTopicChange(e.target.value)} 
                            className="w-full px-4 py-2 bg-[color:var(--modal-bg,#23272f)] border border-[color:var(--modal-input-border,#52525b)] rounded-lg text-[color:var(--modal-input-text,#fff)] focus:border-[color:var(--modal-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--modal-input-focus,#059669)]"
                            disabled
                        >
                            {topics.map(t => <option key={t} value={t}>{t === "all" ? "Todos os tópicos" : t.toLowerCase().replace(/^\w/, (char) => char.toUpperCase())}</option>)}
                        </select>

                        <select 
                            value={selectedPlatform} 
                            onChange={e => handlePlatformChange(e.target.value)} 
                            className="w-full px-4 py-2 bg-[color:var(--modal-bg,#23272f)] border border-[color:var(--modal-input-border,#52525b)] rounded-lg text-[color:var(--modal-input-text,#fff)] focus:border-[color:var(--modal-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--modal-input-focus,#059669)]"
                            disabled
                        >
                            {platforms.map(p => <option key={p} value={p}>{p === "all" ? "Todas as plataformas" : p.toLowerCase().replace(/^\w/, (char) => char.toUpperCase())}</option>)}
                        </select>

                        <select
                            value={selectedStatus}
                            onChange={e => handleStatusChange(e.target.value)}
                            className="w-full px-4 py-2 bg-[color:var(--modal-bg,#23272f)] border border-[color:var(--modal-input-border,#52525b)] rounded-lg text-[color:var(--modal-input-text,#fff)] focus:border-[color:var(--modal-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--modal-input-focus,#059669)]"
                            disabled
                        >
                            {statuses.map(s => (
                                <option key={s} value={s}>
                                    {s === "all" ? "Todos os status" : 
                                     s === "NAO_INICIADO" ? "Não iniciado" :
                                     s === "EM_PROGRESSO" ? "Em progresso" :
                                     s === "CONCLUIDO" ? "Concluído" : "Não concluído"}
                                </option>
                            ))}
                        </select>

                        <div className="hidden lg:flex items-center gap-2 justify-end">
                            <button aria-label="Visualização em lista grid-1" className="p-2 rounded-lg text-[color:var(--modal-preview-meta,#a3a3a3)] opacity-50 cursor-not-allowed"><List className="h-5 w-5" /></button>
                            <button aria-label="Visualização em lista grid-2" className="p-2 rounded-lg text-[color:var(--modal-preview-meta,#a3a3a3)] opacity-50 cursor-not-allowed"><Grid2x2 className="h-5 w-5" /></button>
                            <button aria-label="Visualização em lista grid-3" className="p-2 rounded-lg text-[color:var(--modal-preview-meta,#a3a3a3)] opacity-50 cursor-not-allowed"><Grid3x3 className="h-5 w-5" /></button>
                            <button aria-label="Visualização em lista grid-4" className="p-2 rounded-lg text-[color:var(--modal-preview-meta,#a3a3a3)] opacity-50 cursor-not-allowed"><LayoutGrid className="h-5 w-5" /></button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center h-96">
                    <Spinner size="lg" />
                </div>
            </div>
        );
    }

    const isEmpty = courses.length === 0;

    return (
        <div className="mt-8">
            <div className="bg-[color:var(--modal-bg,#23272f)]/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[color:var(--modal-preview-bg,#52525b)]/50 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[color:var(--modal-preview-meta,#a3a3a3)]" />
                        <input
                            type="text"
                            placeholder="Buscar cursos..."
                            value={localSearch}
                            onChange={e => setLocalSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[color:var(--modal-input-bg,rgba(55,65,81,0.5))] border border-[color:var(--modal-input-border,#52525b)] rounded-lg text-[color:var(--modal-input-text,#fff)] placeholder-[color:var(--modal-input-placeholder,#a3a3a3)] focus:border-[color:var(--modal-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--modal-input-focus,#059669)]"
                        />
                    </div>

                    <select value={selectedTopic} onChange={e => handleTopicChange(e.target.value)} className="w-full px-4 py-2 bg-[color:var(--modal-bg,#23272f)] border border-[color:var(--modal-input-border,#52525b)] rounded-lg text-[color:var(--modal-input-text,#fff)] focus:border-[color:var(--modal-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--modal-input-focus,#059669)]">
                        {topics.map(t => <option key={t} value={t}>{t === "all" ? "Todos os tópicos" : t.toLowerCase().replace(/^\w/, (char) => char.toUpperCase())}</option>)}
                    </select>

                    <select value={selectedPlatform} onChange={e => handlePlatformChange(e.target.value)} className="w-full px-4 py-2 bg-[color:var(--modal-bg,#23272f)] border border-[color:var(--modal-input-border,#52525b)] rounded-lg text-[color:var(--modal-input-text,#fff)] focus:border-[color:var(--modal-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--modal-input-focus,#059669)]">
                        {platforms.map(p => <option key={p} value={p}>{p === "all" ? "Todas as plataformas" : p.toLowerCase().replace(/^\w/, (char) => char.toUpperCase())}</option>)}
                    </select>

                    <select
                        value={selectedStatus}
                        onChange={e => handleStatusChange(e.target.value)}
                        className="w-full px-4 py-2 bg-[color:var(--modal-bg,#23272f)] border border-[color:var(--modal-input-border,#52525b)] rounded-lg text-[color:var(--modal-input-text,#fff)] focus:border-[color:var(--modal-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--modal-input-focus,#059669)]"
                    >
                        {statuses.map(s => (
                            <option key={s} value={s}>
                                {s === "all" ? "Todos os status" : 
                                 s === "NAO_INICIADO" ? "Não iniciado" :
                                 s === "EM_PROGRESSO" ? "Em progresso" :
                                 s === "CONCLUIDO" ? "Concluído" : "Não concluído"}
                            </option>
                        ))}
                    </select>

                    <div className="hidden lg:flex items-center gap-2 justify-end">
                        <button aria-label="Visualização em lista grid-1" onClick={() => setViewMode("list")} className={`p-2 rounded-lg ${viewMode === "list" ? "bg-[color:var(--modal-submit-bg,#059669)] text-white" : "text-[color:var(--modal-preview-meta,#a3a3a3)]"}`}><List className="h-5 w-5" /></button>
                        <button aria-label="Visualização em lista grid-2" onClick={() => setViewMode("grid2")} className={`p-2 rounded-lg ${viewMode === "grid2" ? "bg-[color:var(--modal-submit-bg,#059669)] text-white" : "text-[color:var(--modal-preview-meta,#a3a3a3)]"}`}><Grid2x2 className="h-5 w-5" /></button>
                        <button aria-label="Visualização em lista grid-3" onClick={() => setViewMode("grid3")} className={`p-2 rounded-lg ${viewMode === "grid3" ? "bg-[color:var(--modal-submit-bg,#059669)] text-white" : "text-[color:var(--modal-preview-meta,#a3a3a3)]"}`}><Grid3x3 className="h-5 w-5" /></button>
                        <button aria-label="Visualização em lista grid-4" onClick={() => setViewMode("grid4")} className={`p-2 rounded-lg ${viewMode === "grid4" ? "bg-[color:var(--modal-submit-bg,#059669)] text-white" : "text-[color:var(--modal-preview-meta,#a3a3a3)]"}`}><LayoutGrid className="h-5 w-5" /></button>
                    </div>
                </div>
            </div>

            {isEmpty ? (
                <div className="text-center py-12 min-h-[15rem] flex flex-col justify-center">
                    <div className="bg-[color:var(--modal-preview-bg,#52525b)]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookAlertIcon className="h-8 w-8 text-[color:var(--modal-preview-meta,#a3a3a3)]" />
                    </div>
                    <h3 className="text-lg font-medium text-[color:var(--modal-title,#fff)] mb-2">
                        Nenhum curso cadastrado
                    </h3>
                    <p className="text-[color:var(--modal-preview-meta,#a3a3a3)]">
                        Tente ajustar os filtros ou adicionar um novo curso
                    </p>
                </div>
            ) : (
                <div
                    className={`grid gap-6 min-h-[15rem] ${viewMode === "list"
                        ? "grid-cols-1"
                        : viewMode === "grid2"
                            ? "grid-cols-1 sm:grid-cols-2"
                            : viewMode === "grid3"
                                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"}`}
                >
                    {courses.map(course => (
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
            )}
        </div>
    );
}