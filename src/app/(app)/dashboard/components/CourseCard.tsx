import { Course } from "@/types";
import { getLanguageSymbol } from "@/components/courses/CourseModals/CourseIcons";
import { Star } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const status: Record<string, string> = {
    "CONCLUIDO": "Concluído",
    "EM_ANDAMENTO": "Em Andamento",
    "NAO_INICIADO": "Não Iniciado"
  }

  return (
    <div className="p-4 border border-gray-600/50 rounded-lg hover:border-emerald-500/50 transition-colors duration-200 bg-gray-700/30">
      <div className="flex items-start flex-wrap gap-4 justify-between mb-3 sm:no-wrap sm:gap-0">
        <div className="flex items-start gap-3">
          <span className="text-xl">{getLanguageSymbol(course.topic, course.name)}</span>
          <div>
            <h3 className="font-semibold text-white mb-1">{course.name}</h3>
            <div className="flex items-center gap-4 text-sm sm:text-base text-gray-400">
              <span>{course.platform}</span>
              <span>•</span>
              <span>{course.duration}</span>
              <span>•</span>
              <span className="bg-gray-600/50 px-2 py-1 rounded text-xs text-gray-300">
                {course.topic}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < course.rating ? "text-yellow-400 fill-current" : "text-slate-300"}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-600 rounded-full h-2 w-32">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-400">{course.progress}%</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${
          course.status === "CONCLUIDO"
            ? "bg-green-600/20 text-green-400"
            : "bg-emerald-600/20 text-emerald-400"
        }`}>
          {status[course.status]}
        </span>
      </div>
    </div>
  );
}