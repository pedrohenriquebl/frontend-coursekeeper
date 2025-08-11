'use client'

import React, { useState } from "react";
import { AddCourseModal } from "./AddCourseModal";
import { EditCourseModal } from "./EditCourseModal";
import { CourseDetailsModal } from "./CourseDetailsModal";
import { Course, CreateCourseData } from "@/types";

interface CourseModalsProps {
    showAddModal: boolean;
    showEditModal: boolean;
    showDetailsModal: boolean;
    editingCourse: Course | null;
    detailsCourse: Course | null;
    onCloseAdd: () => void;
    onCloseEdit: () => void;
    onCloseDetails: () => void;
    onSaveCourse: (course: CreateCourseData) => void;
    onUpdateCourse: (course: Course) => void;
}

export default function CourseModals({
    showAddModal,
    showEditModal,
    showDetailsModal,
    editingCourse,
    detailsCourse,
    onCloseAdd,
    onCloseEdit,
    onCloseDetails,
    onSaveCourse,
    onUpdateCourse,
}: CourseModalsProps) {
    const [loading, setLoading] = useState({
        addingCourse: false,
        updatingCourse: false,
    });

    const handleSaveCourse = async (course: CreateCourseData) => {
    setLoading(prev => ({ ...prev, addingCourse: true }));
    try {        
        const topicToSave = course.topic === "Outro" ? course.topicCustom ?? "" : course.topic;        
        const languageToSave = course.language === "Outro" ? course.languageCustom ?? "" : course.language;
        const platformToSave = course.platform === "Outro" ? course.platformCustom ?? "" : course.platform;

        await onSaveCourse({
            ...course,
            topic: topicToSave,
            language: languageToSave,
            platform: platformToSave,
        });
    } finally {
        setLoading(prev => ({ ...prev, addingCourse: false }));
    }
};

    const handleUpdateCourse = async (course: Course) => {
        setLoading(prev => ({ ...prev, updatingCourse: true }));
        try {
            await onUpdateCourse(course);
        } finally {
            setLoading(prev => ({ ...prev, updatingCourse: false }));
        }
    };

    return (
        <>
            <AddCourseModal
                show={showAddModal}
                onClose={onCloseAdd}
                onSave={handleSaveCourse}
                loading={loading.addingCourse}
            />

            {editingCourse && (
                <EditCourseModal
                    show={showEditModal}
                    course={editingCourse}
                    onClose={onCloseEdit}
                    onUpdate={handleUpdateCourse}
                    loading={loading.updatingCourse}
                />
            )}

            {detailsCourse && (
                <CourseDetailsModal
                    show={showDetailsModal}
                    course={detailsCourse}
                    onClose={onCloseDetails}
                />
            )}
        </>
    );
}