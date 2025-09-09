import { cn } from "@/lib/utils";
import { Course } from "@/types";

type TopicBreakDownProps = {
    courses: Course[];
}

export default function TopicBreakDown({ courses }: TopicBreakDownProps) {
    const hasCourses = Array.isArray(courses) && courses.length > 0;

    const groupByTopic = (courses: Course[]) => {
        const grouped: Record<string, { hours: number; courses: number }> = {};

        courses.forEach((course) => {
            if (!course) return;

            const studiedHours =
                course.status === "CONCLUIDO"
                    ? course.studiedHours || 0
                    : Math.round(
                        ((course.duration || 0) * (course.progress || 0)) / 100
                    );

            const topic = course.topic || "Outros";

            if (!grouped[topic]) {
                grouped[topic] = { hours: 0, courses: 0 };
            }

            grouped[topic].hours += studiedHours;
            grouped[topic].courses += 1;
        });

        return Object.entries(grouped)
            .map(([topic, data]) => ({
                topic,
                hours: data.hours,
                courses: data.courses,
            }))
            .sort((a, b) => b.hours - a.hours);
    };

    const topicBreakDown = groupByTopic(courses);
    const totalHours = topicBreakDown.reduce((acc, t) => acc + t.hours, 0) || 1;

    return (
        <>
            {hasCourses ? (
                <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-6">
                        Distribuição por Tópico
                    </h3>
                    <div className="space-y-4">
                        {topicBreakDown.map((topic, index) => {
                            const hoursPercent = (topic.hours / totalHours) * 100;
                            const colors = ["emerald", "blue", "purple", "yellow", "red"];
                            const color = colors[index % colors.length];

                            return (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="w-20 text-sm text-gray-400 text-left">
                                        {topic.topic.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-gray-600 rounded-full h-4 relative">
                                            <div
                                                className={cn(
                                                    "h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2",
                                                    color === "emerald" && "bg-emerald-600",
                                                    color === "blue" && "bg-blue-600",
                                                    color === "purple" && "bg-purple-600",
                                                    color === "yellow" && "bg-yellow-600",
                                                    color === "red" && "bg-red-600",
                                                )}
                                                style={{ width: `${hoursPercent}%`, minWidth: "2rem" }}
                                            >
                                                <span className="text-white text-xs pt-0.5">
                                                    {topic.hours}h
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-16 text-sm text-gray-400 text-center">
                                        {`${topic.courses} curso${topic.courses > 1 ? 's' : ''}`} 
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