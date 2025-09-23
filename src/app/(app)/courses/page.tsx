'use client'

import { Plus } from "lucide-react";
import { useCallback, useEffect, useState, useMemo } from "react";
import { StatsCards } from "../dashboard/components/StatsCards";
import { useAuthUser } from "@/context/authUserContext";
import { CourseModals } from "@/components/courses/CourseModals/CourseModals";
import { useCourse } from "@/components/courses/CourseModals/hooks/useCourse";
import { CoursesList } from "./components/CoursesList";
import { Course, FilterPlatform, FilterStatus, FilterTopic, UpdateCoursePayload } from "@/types";
import { userService } from "@/services/api/user/userService";
import { FadeSlide } from "@/components/animation/FadeSlide";
import debounce from "lodash/debounce";
import { Spinner } from "@/components/ui/Spinner";

export default function CoursesPage() {
    const { user } = useAuthUser();
    const {
        allCourses,
        getAllCourses,
        deleteCourse,
        updateCourse,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        totalCourses,
        isLoadingCourse,
        isInitialLoading,
        changeItemsPerPage
    } = useCourse();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [detailsCourse, setDetailsCourse] = useState<Course | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        topic: "all" as FilterTopic,
        platform: "all" as FilterPlatform,
        status: "all" as FilterStatus
    });
    const itemsPerPageOptions = [6, 12, 24, 48];

    const closeAddModal = () => setShowAddModal(false);
    const totalPages = Math.ceil(totalCourses / itemsPerPage);

    const debouncedFetch = useMemo(
        () => debounce((page: number, term: string, currentFilters: typeof filters) => {
            getAllCourses(page, itemsPerPage, term, currentFilters.topic, currentFilters.platform, currentFilters.status);
        }, 500),
        [getAllCourses, itemsPerPage]
    );

    useEffect(() => {
        if (!isInitialLoading) {
            debouncedFetch(currentPage, searchTerm, filters);
        }
        return () => debouncedFetch.cancel();
    }, [currentPage, searchTerm, filters, debouncedFetch, isInitialLoading]);

    const refreshCourses = useCallback(async () => {
        try {
            await getAllCourses(currentPage, itemsPerPage, searchTerm, filters.topic, filters.platform, filters.status);
            await userService.getMe();
        } catch (error) {
            console.error("Erro ao atualizar cursos:", error);
        }
    }, [getAllCourses, currentPage, itemsPerPage, searchTerm, filters]);

    const handleFilterChange = useCallback((newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setCurrentPage(1);
    }, [setCurrentPage]);

    const handleSearchChange = useCallback((term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    }, [setCurrentPage]);

    const handleEditCourse = useCallback((course: Course) => {
        setEditingCourse(course);
        setShowEditModal(true);
    }, []);

    const handleDeleteCourse = useCallback(async (courseId: number) => {
        try {
            await deleteCourse(courseId);
            await refreshCourses();
        } catch (error) {
            console.error("Erro ao deletar curso:", error);
        }
    }, [deleteCourse, refreshCourses]);

    const handleViewDetails = useCallback((course: Course) => {
        setDetailsCourse(course);
        setShowDetailsModal(true);
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, [setCurrentPage]);

    const handleUpdateCourse = useCallback(async (updatedCourse: UpdateCoursePayload) => {
        try {
            await updateCourse(updatedCourse);
            await refreshCourses();
            setShowEditModal(false);
        } catch (error) {
            console.error("Erro ao atualizar curso:", error);
        }
    }, [updateCourse, refreshCourses]);

    const handleCourseCreated = useCallback(async () => {
        await refreshCourses();
        setShowAddModal(false);
    }, [refreshCourses]);

    const stats = {
        totalCourses: user?.generalCoursesInfo?.totalCourses || 0,
        completedCourses: user?.generalCoursesInfo?.totalCompletedCourses || 0,
        studyHours: user?.generalCoursesInfo?.totalStudiedHours || 0,
        currentGoalPercent: user?.generalCoursesInfo?.totalCourses
            ? Math.round(
                (user.generalCoursesInfo.totalCompletedCourses / user.generalCoursesInfo.totalCourses) * 100
            )
            : 0,
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[color:var(--modal-title,#fff)] mb-2">Meus Cursos</h1>
                    <p className="text-[color:var(--modal-preview-meta,#a3a3a3)]">
                        Gerencie todos os seus cursos e acompanhe o progresso
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="cursor-pointer flex items-center gap-2 bg-[color:var(--modal-submit-bg,#059669)] text-[color:var(--modal-submit-text,#fff)] px-6 py-3 rounded-lg hover:bg-[color:var(--modal-submit-bg-hover,#047857)] transition-colors duration-200 font-medium"
                >
                    <Plus className="h-5 w-5" />
                    Adicionar Curso
                </button>
            </div>

            <StatsCards {...stats} />

            <div className="min-h-[700px] flex flex-col">
                {isInitialLoading ? (
                    <div className="flex-1 flex justify-center items-center">
                        <Spinner size="lg" />
                    </div>
                ) : (
                    <FadeSlide className="flex-1">
                        <CoursesList
                            courses={allCourses}
                            onEdit={handleEditCourse}
                            onDelete={handleDeleteCourse}
                            onViewDetails={handleViewDetails}
                            searchTerm={searchTerm}
                            setSearchTerm={handleSearchChange}
                            isLoading={isLoadingCourse && allCourses.length === 0}
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                    </FadeSlide>
                )}

                {totalCourses > 6 && (
                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">                            
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-300">
                                    Itens por página:
                                </span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => changeItemsPerPage(Number(e.target.value))}
                                    className="px-3 py-1 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                >
                                    {itemsPerPageOptions.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 hover:bg-gray-600 transition-colors"
                                >
                                    Anterior
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`px-4 py-2 rounded-lg ${currentPage === i + 1
                                                ? "bg-green-600 text-white"
                                                : "bg-gray-700 text-white hover:bg-gray-600"
                                            } transition-colors`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 hover:bg-gray-600 transition-colors"
                                >
                                    Próximo
                                </button>
                            </div>
                            
                            <div className="text-sm text-gray-300">
                                Mostrando {Math.min((currentPage - 1) * itemsPerPage + 1, totalCourses)}-
                                {Math.min(currentPage * itemsPerPage, totalCourses)} de {totalCourses} cursos
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <CourseModals
                showAddModal={showAddModal}
                showEditModal={showEditModal}
                showDetailsModal={showDetailsModal}
                editingCourse={editingCourse}
                detailsCourse={detailsCourse}
                onCloseAdd={closeAddModal}
                onCloseEdit={() => { setShowEditModal(false); setEditingCourse(null); }}
                onCloseDetails={() => { setShowDetailsModal(false); setDetailsCourse(null); }}
                onUpdateCourse={handleUpdateCourse}
                onCourseCreated={handleCourseCreated}
            />
        </div>
    );
}
