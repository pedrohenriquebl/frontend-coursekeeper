import { Course } from "@/types";
import { Award, Clock, Target, TrendingUp } from "lucide-react";

type KeyMetricsProps = {
    courses: Course[];
}

export default function KeyMetrics({ courses }: KeyMetricsProps) {
    const completedCourses = courses.filter(course => course.status === "CONCLUIDO").length;
    const totalHours = courses.reduce((acc, course) => acc + (course.studiedHours || 0), 0);
    const averageRating = courses.reduce((acc, course) => acc + (course.rating || 0), 0) / courses.length || 0;
    const totalCourses = courses.length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                    <Award className="h-6 w-6 text-green-400" />
                    <span className="text-2xl font-bold text-white">
                        {completedCourses}
                    </span>
                </div>
                <p className="text-sm text-gray-400">Cursos Concluídos</p>
            </div>

            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-6 w-6 text-emerald-400" />
                    <span className="text-2xl font-bold text-white">
                        {totalHours}h
                    </span>
                </div>
                <p className="text-sm text-gray-400">Horas Estudadas</p>
            </div>

            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-6 w-6 text-yellow-400" />
                    <span className="text-2xl font-bold text-white">
                        {averageRating.toFixed(2)}
                    </span>
                </div>
                <p className="text-sm text-gray-400">Avaliação Média</p>
            </div>

            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                    <Target className="h-6 w-6 text-purple-400" />
                    <span className="text-2xl font-bold text-white">
                        {totalCourses && completedCourses !== undefined
                            ? Math.round(
                                (completedCourses / totalCourses) *
                                100,
                            )
                            : null}
                        %
                    </span>
                </div>
                <p className="text-sm text-gray-400">Taxa de Conclusão</p>
            </div>
        </div>
    );
}