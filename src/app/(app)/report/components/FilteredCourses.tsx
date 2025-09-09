import { getStatusColor } from "@/components/courses/CourseModals/CourseIcons";
import { cn } from "@/lib/utils";
import { Course, FilterPeriod, FilterPlatform, FilterTopic } from "@/types";
import { BookOpen, Filter, Star, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";

type FilteredCoursesProps = {
    courses: Course[];
    topic: FilterTopic;
    platform: FilterPlatform;
    period: FilterPeriod;
    periods: { value: FilterPeriod; label: string }[];
};

export default function FilteredCourses({ courses, topic, platform, period, periods }: FilteredCoursesProps) {
    const [expanded, setExpanded] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const sliceCount = isMobile ? 4 : 8;
    const visibleCourses = expanded ? courses : courses.slice(0, sliceCount);

    return (
        <>
            {(topic !== "all" || platform !== "all" || period !== "all" || courses.length > 0) && (
                <div className="mb-8">
                    <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                        <div className="flex items-center justify-between mb-6 gap-1">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Filter className="h-5 w-5 text-emerald-400" />
                                Cursos Filtrados ({courses.length})
                            </h3>
                            <div className="flex items-center gap-2 text-xs">
                                {topic !== "all" && (
                                    <span className="bg-emerald-600/20 text-emerald-400 px-2 py-1 rounded">
                                        {topic.toLocaleLowerCase().replace(/^\w/, (char) => char.toUpperCase())}
                                    </span>
                                )}
                                {platform !== "all" && (
                                    <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                                        {platform.toLocaleLowerCase().replace(/^\w/, (char) => char.toUpperCase())}
                                    </span>
                                )}
                                {period && (
                                    <span className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded">
                                        {period === "all"
                                            ? "Todo o período"
                                            : periods.find((p) => p.value === period)?.label}
                                    </span>
                                )}
                            </div>
                        </div>

                        {courses.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {visibleCourses.map((course) => {
                                        const duration =
                                            parseInt(course.duration?.toString().replace(/\D/g, "") || "0") || 0;
                                        const studiedHours = Math.round((duration * course.progress) / 100);

                                        return (
                                            <div
                                                key={course.id}
                                                className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/50 hover:border-emerald-500/50 transition-colors duration-200 text-xs"
                                            >
                                                <div className="mb-3">
                                                    <h4 className="font-medium text-white text-sm line-clamp-2">
                                                        {course.name}
                                                    </h4>
                                                </div>

                                                <div className="space-y-1 text-xs">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Plataforma:</span>
                                                        <span className="text-gray-200">{course.platform.toLowerCase().replace(/^\w/, (char) => char.toUpperCase())}</span>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Tópico:</span>
                                                        <span className="text-emerald-400">{course.topic.toLowerCase().replace(/^\w/, (char) => char.toUpperCase())}</span>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Progresso:</span>
                                                        <span className={getStatusColor(course.status)}>
                                                            {course.progress}%
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Horas estudadas:</span>
                                                        <span className="text-gray-200">
                                                            {studiedHours}h / {duration}h
                                                        </span>
                                                    </div>

                                                    {(course.rating ?? 0) > 0 && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-400">Avaliação:</span>
                                                            <div className="flex items-center gap-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={cn(
                                                                            "h-3 w-3",
                                                                            i < (course.rating ?? 0)
                                                                                ? "text-yellow-400 fill-current"
                                                                                : "text-gray-500"
                                                                        )}
                                                                    />
                                                                ))}
                                                                <span className="text-gray-200 ml-1">
                                                                    {course.rating}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex justify-between">
                                                        <span className="text-gray-400">Início:</span>
                                                        <span className="text-gray-200">
                                                            {course.startDate.split("T")[0].split("-").reverse().join("/")}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Barra de progresso */}
                                                <div className="mt-3">
                                                    <div className="bg-gray-600 rounded-full h-2">
                                                        <div
                                                            className={cn(
                                                                "h-2 rounded-full transition-all duration-300",
                                                                course.status === "NAO_CONCLUIDO"
                                                                    ? "bg-red-500"
                                                                    : course.status === "CONCLUIDO"
                                                                        ? "bg-green-500"
                                                                        : course.status === "EM_PROGRESSO"
                                                                            ? "bg-blue-500"
                                                                            : "bg-gray-500",
                                                            )}
                                                            style={{ width: `${course.progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Botão Mostrar mais/menos */}
                                {courses.length > sliceCount && (
                                    <div className="flex justify-center mt-6">
                                        <button
                                            onClick={() => setExpanded(!expanded)}
                                            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                                        >
                                            {expanded ? (
                                                <>
                                                    Mostrar menos <ChevronUp className="w-4 h-4" />
                                                </>
                                            ) : (
                                                <>
                                                    Mostrar mais <ChevronDown className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                                <p className="text-gray-400">Nenhum curso encontrado com os filtros aplicados.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
