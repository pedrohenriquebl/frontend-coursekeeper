'use client'

import AddCourseModal from "./AddCourseModal";
import { EditCourseModal } from "./EditCourseModal";
import { CourseDetailsModal } from "./CourseDetailsModal";
import { Course, UpdateCoursePayload } from "@/types";

interface CourseModalsProps {
    showAddModal: boolean;
    showEditModal: boolean;
    showDetailsModal: boolean;
    editingCourse: Course | null;
    detailsCourse: Course | null;
    onCloseAdd: () => void;
    onCloseEdit: () => void;
    onCloseDetails: () => void;
    onUpdateCourse: (course: UpdateCoursePayload) => void; 
    onCourseCreated: () => void;
    isLoadingCourse?: boolean;
}

export function CourseModals({
    showAddModal,
    showEditModal,
    showDetailsModal,
    editingCourse,
    detailsCourse,
    onCloseAdd,
    onCloseEdit,
    onCloseDetails,
    onUpdateCourse,
    onCourseCreated,
    isLoadingCourse = false
}: CourseModalsProps) {
    return (
        <>
            <AddCourseModal
                show={showAddModal}
                onClose={onCloseAdd}
                onCourseCreated={onCourseCreated}
            />

            {showEditModal && editingCourse && (
                <EditCourseModal
                    show={showEditModal}
                    course={editingCourse}
                    onClose={onCloseEdit}
                    onUpdate={onUpdateCourse}
                    loading={isLoadingCourse}
                />
            )}

            {showDetailsModal && detailsCourse && (
                <CourseDetailsModal
                    show={showDetailsModal}
                    course={detailsCourse}
                    onClose={onCloseDetails}
                />
            )}
        </>
    );
}