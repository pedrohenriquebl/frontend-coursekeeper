'use client'

import AddCourseModal from "./AddCourseModal";
import { EditCourseModal } from "./EditCourseModal";
import { CourseDetailsModal } from "./CourseDetailsModal";
import { CreateCourseData, Course } from "@/types";

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
    onSaveCourse,
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

            {showEditModal && editingCourse && (
                <EditCourseModal
                    show={showEditModal}
                    course={editingCourse}
                    onClose={onCloseEdit}
                    onUpdate={onUpdateCourse}
                    loading={false}
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