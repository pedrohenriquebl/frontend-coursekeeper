import { Plus } from "lucide-react";
import { Course } from "@/types";
import { CourseCard } from "./CourseCard";
import { FadeSlide } from "@/components/animation/FadeSlide";

interface RecentCoursesProps {
  courses: Course[];
  onAddCourse: () => void;
}

export function RecentCourses({ courses, onAddCourse }: RecentCoursesProps) {
  return (
    <div className="bg-[color:var(--modal-bg,#23272f)]/60 backdrop-blur-sm rounded-xl shadow-lg border border-[color:var(--modal-preview-bg,#52525b)]/50 p-6">
      <div className="flex items-center justify-between mb-6 gap-1">
        <h2 className="text-xl font-semibold text-[color:var(--modal-title,#fff)]">Cursos Recentes</h2>

        <FadeSlide>
          <button
            onClick={onAddCourse}
            className="cursor-pointer flex text-sm items-center gap-2 bg-[color:var(--modal-submit-bg,#059669)] text-[color:var(--modal-submit-text,#fff)] px-4 py-2 rounded-lg hover:bg-[color:var(--modal-submit-bg-hover,#047857)] transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
            Novo Curso
          </button>
        </FadeSlide>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <FadeSlide key={course.id}>
            <CourseCard course={course} />
          </FadeSlide>
        ))}
      </div>
    </div>
  );
}
