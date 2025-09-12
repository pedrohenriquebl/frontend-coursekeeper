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
            <div className="bg-[color:var(--report-card-bg)]/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[color:var(--report-card-border)]/50">
                <div className="flex items-center gap-3 mb-2">
                    <Award className="h-6 w-6 text-[color:var(--report-metrics-award)]" />
                    <span className="text-2xl font-bold text-[color:var(--report-metrics-value)]">
                        {completedCourses}
                    </span>
                </div>
                <p className="text-sm text-[color:var(--report-metrics-meta)]">Cursos Concluídos</p>
            </div>

            <div className="bg-[color:var(--report-card-bg)]/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[color:var(--report-card-border)]/50">
                <div className="flex items-center gap-3 mb-2">
                    <Clock className="h-6 w-6 text-[color:var(--report-metrics-clock)]" />
                    <span className="text-2xl font-bold text-[color:var(--report-metrics-value)]">
                        {totalHours}h
                    </span>
                </div>
                <p className="text-sm text-[color:var(--report-metrics-meta)]">Horas Estudadas</p>
            </div>

            <div className="bg-[color:var(--report-card-bg)]/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[color:var(--report-card-border)]/50">
                <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-6 w-6 text-[color:var(--report-metrics-trending)]" />
                    <span className="text-2xl font-bold text-[color:var(--report-metrics-value)]">
                        {averageRating.toFixed(2)}
                    </span>
                </div>
                <p className="text-sm text-[color:var(--report-metrics-meta)]">Avaliação Média</p>
            </div>

            <div className="bg-[color:var(--report-card-bg)]/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[color:var(--report-card-border)]/50">
                <div className="flex items-center gap-3 mb-2">
                    <Target className="h-6 w-6 text-[color:var(--report-metrics-target)]" />
                    <span className="text-2xl font-bold text-[color:var(--report-metrics-value)]">
                        {totalCourses && completedCourses !== undefined
                            ? Math.round(
                                (completedCourses / totalCourses) *
                                100,
                            )
                            : null}
                        %
                    </span>
                </div>
                <p className="text-sm text-[color:var(--report-metrics-meta)]">Taxa de Conclusão</p>
            </div>
        </div>
    );
}