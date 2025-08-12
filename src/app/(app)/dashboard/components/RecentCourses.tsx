import { Plus } from "lucide-react";
import { Course } from "@/types";
import { CourseCard } from "./CourseCard";

interface RecentCoursesProps {
  courses: Course[];
  onAddCourse: () => void;
}

export function RecentCourses({ courses, onAddCourse }: RecentCoursesProps) {
  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 p-6">
      <div className="flex items-center justify-between mb-6 gap-1">
        <h2 className="text-xl font-semibold text-white">Cursos Recentes</h2>
        <button
          onClick={onAddCourse}
          className="cursor-pointer flex text-sm items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          Novo Curso
        </button>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}