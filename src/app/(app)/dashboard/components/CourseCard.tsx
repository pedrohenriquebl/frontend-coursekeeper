import { Course } from "@/types";
import { getLanguageSymbol } from "@/components/courses/CourseModals/CourseIcons";
import { Star } from "lucide-react";
import { handleStatusLabel } from "@/utils/handleStatusLabel";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONCLUIDO":
        return "bg-[color:var(--modal-completed-bg,rgba(22,163,74,0.2))] text-[color:var(--modal-completed-icon,#22c55e)]";
      case "EM_PROGRESSO":
        return "bg-[color:var(--modal-progress-bg,#059669)]/20 text-[color:var(--modal-progress-bar,#10b981)]";
      case "NAO_INICIADO":
        return "bg-[color:var(--modal-preview-bg,#52525b)]/20 text-[color:var(--modal-preview-meta,#a3a3a3)]";
      case "NAO_CONCLUIDO":
        return "bg-[color:var(--modal-delete-bg,#dc2626)]/20 text-[color:var(--modal-delete-bg,#dc2626)]";
      default:
        return "bg-[color:var(--modal-preview-bg,#52525b)]/20 text-[color:var(--modal-preview-meta,#a3a3a3)]";
    }
  };

  return (
    <div className="p-4 border border-[color:var(--modal-preview-bg,#52525b)]/50 rounded-lg hover:border-[color:var(--modal-submit-bg,#059669)]/50 transition-colors duration-200 bg-[color:var(--modal-preview-bg,#52525b)]/30">
      <div className="flex items-start flex-wrap gap-4 justify-between mb-3 sm:no-wrap sm:gap-0">
        <div className="flex items-start gap-3">
          <span className="text-xl">{getLanguageSymbol(course.topic, course.name)}</span>
          <div>
            <h3 className="font-semibold text-[color:var(--modal-title,#fff)] mb-1">{course.name}</h3>
            <div className="flex items-center gap-4 text-sm sm:text-base text-[color:var(--modal-preview-meta,#a3a3a3)]">
              <span>{course.platform.toLowerCase().replace(/^\w/, (char) => char.toUpperCase())}</span>
              <span>•</span>
              <span>{course.duration}</span>
              <span>•</span>
              <span className="bg-[color:var(--modal-preview-bg,#52525b)]/50 px-2 py-1 rounded text-xs text-[color:var(--modal-preview-comment,#d4d4d8)]">
                {course.topic.toLowerCase().replace(/^\w/, (char) => char.toUpperCase())}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < (course.rating ?? 0) ? "text-[color:var(--modal-star,#facc15)] fill-current" : "text-[color:var(--modal-star-empty,#52525b)]"}`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-[color:var(--modal-progress-bg,#52525b)] rounded-full h-2 w-32">
            <div
              className="bg-[color:var(--modal-progress-bar,#10b981)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <span className="text-sm text-[color:var(--modal-preview-meta,#a3a3a3)]">{course.progress}%</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(course.status || "Não Iniciado")}`}>
          {handleStatusLabel(course.status)}
        </span>
      </div>
    </div>
  );
}