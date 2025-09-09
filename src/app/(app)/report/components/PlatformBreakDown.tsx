import { Course } from "@/types";

type PlatformBreakDownProps = {
    courses: Course[];
}

export default function PlatformBreakDown({ courses }: PlatformBreakDownProps) {
    const hasCourses = Array.isArray(courses) && courses.length > 0;

    const groupByPlatform = (courses: Course[]) => {
        const grouped: Record<string, { hours: number; courses: number }> = {};
        courses.forEach((course) => {
            if (!course) return;

            const platform = course.platform || "Desconhecida";
            const studiedHours =
                course.status === "CONCLUIDO"
                    ? course.studiedHours || 0
                    : Math.round(
                        ((course.duration || 0) * (course.progress || 0)) / 100
                    );

            if (!grouped[platform]) {
                grouped[platform] = { hours: 0, courses: 0 };
            }

            grouped[platform].hours += studiedHours;
            grouped[platform].courses += 1;
        });

        return Object.entries(grouped)
            .map(([platform, data]) => ({
                platform,
                hours: data.hours,
                courses: data.courses,
            }))
            .sort((a, b) => b.hours - a.hours);
    };

    const platformData = groupByPlatform(courses);
    const totalHours = platformData.reduce((acc, curr) => acc + curr.hours, 0);

    return (
        <>
            {hasCourses ? (
                <div className="h-full bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-6">
                        Distribuição por Plataforma
                    </h3>
                    <div className="space-y-4">
                        {platformData.map((platform, index) => {
                            const hoursPercent = totalHours ? (platform.hours / totalHours) * 100 : 0;

                            return (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                                >
                                    <div>
                                        <div className="font-medium text-white">
                                            {platform.platform.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            {`${platform.courses} curso${platform.courses === 1 ? '' : 's'}`}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium text-emerald-400">
                                            {platform.hours}h
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {Math.round(hoursPercent)}%
                                        </div>
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