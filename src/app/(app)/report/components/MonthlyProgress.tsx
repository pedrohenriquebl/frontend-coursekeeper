import { Course } from "@/types";

type MonthlyProgressProps = {
    courses: Course[];
}

export default function MonthlyProgress({ courses }: MonthlyProgressProps) {
    const hasCourses = Array.isArray(courses) && courses.length > 0;

    const groupByMonth = (courses: Course[]) => {
        const grouped: Record<string, { hours: number; courses: number }> = {};

        courses.forEach((course) => {
            if (!course) return;

            const dateStr =
                course.status === "CONCLUIDO"
                    ? course.endDate
                    : course.updatedAt || course.startDate;

            if (!dateStr) return;

            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return;

            const studiedHours =
                course.status === "CONCLUIDO"
                    ? course.studiedHours || 0
                    : Math.round(
                        ((course.duration || 0) * (course.progress || 0)) / 100
                    );

            const month = date.toLocaleString("pt-BR", { month: "short" });
            const key = `${month}/${date.getFullYear()}`;

            if (!grouped[key]) {
                grouped[key] = { hours: 0, courses: 0 };
            }

            grouped[key].hours += studiedHours;
            grouped[key].courses += 1;
        });

        return Object.entries(grouped)
            .map(([month, data]) => ({
                month,
                hours: data.hours,
                courses: data.courses,
            }))
            .sort((a, b) => {
                const [ma, ya] = a.month.split("/");
                const [mb, yb] = b.month.split("/");
                return (
                    new Date(`${ya}-${ma}-01`).getTime() -
                    new Date(`${yb}-${mb}-01`).getTime()
                );
            });
    };

    const monthlyProgress = groupByMonth(courses);
    const maxHours = Math.max(...monthlyProgress.map((m) => m.hours), 1);

    return (
        <>
            {hasCourses ? (
                <div className="h-full bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-6">
                        Progresso Mensal
                    </h3>
                    <div className="space-y-4">
                        {monthlyProgress.map((month, index) => {
                            const hoursPercent = (month.hours / maxHours) * 100;
                            return (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="text-sm text-gray-400 text-right">
                                        {month.month}
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-gray-600 rounded-full h-4 relative">
                                            <div
                                                className="h-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                                                style={{ width: `${hoursPercent}%`, minWidth: "2rem" }}
                                            >
                                                <span className="text-white text-xs font-medium">
                                                    {month.hours}h
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-16 text-sm text-gray-400 text-center">
                                        {month.courses} cursos
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                null
            )}
        </>
    )
}