'use client'

import { Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { StatsCards } from "../dashboard/components/StatsCards";
import { useAuthUser } from "@/context/authUserContext";
import { CourseModals } from "@/components/courses/CourseModals/CourseModals";
import { useCourse } from "@/components/courses/CourseModals/hooks/useCourse";
import { CoursesList } from "./components/CoursesList";
import { Course } from "@/types";

export default function CoursesPage() {
    const { user } = useAuthUser();
    const { allCourses, getAllCourses } = useCourse();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [detailsCourse, setDetailsCourse] = useState<Course | null>(null);

    const closeAddModal = () => setShowAddModal(false);

    const refreshCourses = useCallback(async () => {
        try {
            await getAllCourses();
        } catch (error) {
            console.error("Erro ao atualizar cursos:", error);
        }
    }, [getAllCourses]);

    const handleEditCourse = (course: Course) => {
        setEditingCourse(course);
        setShowEditModal(true);
    };

    const handleDeleteCourse = async (courseId: number) => {
        try {
            //await deleteCourse(courseId);
            console.log('Deletando o curso id ', courseId);
            await refreshCourses();
        } catch (error) {
            console.error("Erro ao deletar curso:", error);
        }
    };

    const handleViewDetails = (course: Course) => {
        setDetailsCourse(course);
        setShowDetailsModal(true);
    };

    const stats = {
        totalCourses: user?.generalCoursesInfo?.totalCourses || 0,
        completedCourses: user?.generalCoursesInfo?.completedCourses || 0,
        studyHours: user?.generalCoursesInfo?.totalStudiedHours || 0,
        currentGoalPercent: user?.generalCoursesInfo?.currentGoalPercent || 0,
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Meus Cursos</h1>
                    <p className="text-gray-400">
                        Gerencie todos os seus cursos e acompanhe o progresso
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="cursor-pointer flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium"
                >
                    <Plus className="h-5 w-5" />
                    Adicionar Curso
                </button>
            </div>

            <StatsCards {...stats} />

            <CoursesList
                courses={allCourses}
                onEdit={handleEditCourse}
                onDelete={handleDeleteCourse}
                onViewDetails={handleViewDetails}
            />

            <CourseModals
                showAddModal={showAddModal}
                showEditModal={showEditModal}
                showDetailsModal={showDetailsModal}
                editingCourse={null}
                detailsCourse={null}
                onCloseAdd={closeAddModal}
                onCloseEdit={() => setShowEditModal(false)}
                onCloseDetails={() => setShowDetailsModal(false)}
                onSaveCourse={() => { }}
                onUpdateCourse={() => { }}
                onCourseCreated={refreshCourses}
            />
        </div>
    );
}
