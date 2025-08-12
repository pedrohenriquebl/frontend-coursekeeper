'use client'

import AddCourseModal from "./AddCourseModal";
import { EditCourseModal } from "./EditCourseModal";
import { CourseDetailsModal } from "./CourseDetailsModal";
import { Course, CreateCourseData } from "./types";

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
    onCourseCreated: () => void;
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
    onCourseCreated
}: CourseModalsProps) {
    return (
        <>
            <AddCourseModal
                show={showAddModal}
                onClose={onCloseAdd}
                onCourseCreated={onCourseCreated}
            />

            {editingCourse && (
                <EditCourseModal
                    show={showEditModal}
                    course={editingCourse}
                    onClose={onCloseEdit}
                    onUpdate={onUpdateCourse}
                    loading={false}
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