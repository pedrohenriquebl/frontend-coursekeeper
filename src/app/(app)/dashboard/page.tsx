'use client'

import { CourseModals } from "@/components/courses/CourseModals/CourseModals";
import { useCourse } from "@/components/courses/CourseModals/hooks/useCourse";
import { DashboardHeader } from "./components/DashboardHeader";
import { StatsCards } from "./components/StatsCards";
import { RecentCourses } from "./components/RecentCourses";
import { Sidebar } from "./components/Sidebar";
import { useCallback, useState } from "react";
import { Spinner } from "@/components/ui/Spinner";
import { useAuthUser } from "@/context/authUserContext";

export default function DashboardPage() {
    const { recentCourses, isLoadingCourse, getRecentCourses } = useCourse();
    const [showAddModal, setShowAddModal] = useState(false);
    const { user } = useAuthUser();

    const refreshCourses = useCallback(async () => {
        try {
            await getRecentCourses();
        } catch (error) {
            console.error("Failed to refresh courses:", error);
        }
    }, [getRecentCourses]);

    const stats = {
        totalCourses: user?.generalCoursesInfo?.totalCourses || 0,
        completedCourses: user?.generalCoursesInfo?.completedCourses || 0,
        studyHours: user?.generalCoursesInfo?.totalStudiedHours || 0,
        currentGoalPercent: user?.generalCoursesInfo?.currentGoalPercent || 0,
    };

    const addCourse = () => setShowAddModal(true);
    const closeModal = () => setShowAddModal(false);
    const hasRecentCourses = Array.isArray(recentCourses) && recentCourses.length > 0;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <DashboardHeader />
            <StatsCards {...stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {isLoadingCourse ? (
                        <div className="flex justify-center"><Spinner /></div>
                    ) : hasRecentCourses ? (
                        <RecentCourses
                            courses={recentCourses}
                            onAddCourse={addCourse}
                        />
                    ) : (
                        <div className="flex justify-center">
                            <p className="text-gray-400">Nenhum curso recente encontrado.</p>
                        </div>
                    )}
                </div>
                <Sidebar onAddCourse={addCourse} />
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
                onSaveCourse={() => { }}
                onUpdateCourse={() => { }}
                onCourseCreated={refreshCourses}
            />
        </div>
    );
}