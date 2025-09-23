'use client'

import { CourseModals } from "@/components/courses/CourseModals/CourseModals";
import { useCourse } from "@/components/courses/CourseModals/hooks/useCourse";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatsCards } from "./components/StatsCards";
import { RecentCourses } from "./components/RecentCourses";
import { Sidebar } from "./components/Sidebar";
import { useCallback, useState, useEffect } from "react";
import { useAuthUser } from "@/context/authUserContext";
import { userService } from "@/services/api/user/userService";
import { GoalModal } from "../goals/components/GoalModal";
import { CreateGoalData } from "@/types";
import { useGoals } from "../goals/hooks/useGoals";

export default function DashboardPage() {
    const { recentCourses, getRecentCourses, isInitialLoading } = useCourse();
    const { createGoal } = useGoals();
    const [showAddModal, setShowAddModal] = useState(false);
    const [showGoalModal, setShowGoalModal] = useState(false);
    const { user } = useAuthUser();

    useEffect(() => {
        if (user?.id) {
            getRecentCourses();
        }
    }, [user?.id, getRecentCourses]);

    const handleCreateGoal = async (goalData: CreateGoalData) => {
        try {
            await createGoal(goalData);
            setShowAddModal(false);
        } catch (error) {
            console.error("Error creating goal:", error);
        }
    };

    const refreshCourses = useCallback(async () => {
        try {
            await getRecentCourses();
            await userService.getMe();
        } catch (error) {
            console.error("Failed to refresh courses:", error);
        }
    }, [getRecentCourses]);

    const stats = {
        totalCourses: user?.generalCoursesInfo?.totalCourses || 0,
        completedCourses: user?.generalCoursesInfo?.totalCompletedCourses || 0,
        studyHours: user?.generalCoursesInfo?.totalStudiedHours || 0,
        currentGoalPercent: user?.goalsStats?.goalsProgressPercent || 0,
    };

    const addCourse = () => setShowAddModal(true);
    const closeModal = () => setShowAddModal(false);
    const openGoalModal = () => setShowGoalModal(true);
    const closeGoalModal = () => setShowGoalModal(false);

    const hasRecentCourses = Array.isArray(recentCourses) && recentCourses.length > 0;

    if (isInitialLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <DashboardHeader />
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-400">Carregando cursos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <DashboardHeader />
            <StatsCards {...stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {hasRecentCourses ? (
                        <RecentCourses
                            courses={recentCourses}
                            onAddCourse={addCourse}
                        />
                    ) : (
                        <div className="flex justify-center items-center h-64">
                            <p className="text-gray-400">Nenhum curso recente encontrado.</p>
                        </div>
                    )}
                </div>
                <Sidebar onAddCourse={addCourse} onOpenGoalModal={openGoalModal} />
            </div>

            <CourseModals
                showAddModal={showAddModal}
                showEditModal={false}
                showDetailsModal={false}
                editingCourse={null}
                detailsCourse={null}
                onCloseAdd={closeModal}
                onCloseEdit={() => { }}
                onCloseDetails={() => { }}
                onUpdateCourse={() => { }}
                onCourseCreated={refreshCourses}
            />

            <GoalModal
                showModal={showGoalModal}
                onClose={closeGoalModal}
                onSave={handleCreateGoal}
            />
        </div>
    );
}