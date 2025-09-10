import { Course } from "@/types";
import { useState } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    RadialBarChart,
    RadialBar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
} from "recharts";
import { FormSelect } from "@/components/courses/CourseModals/FormControls/FormSelect";

type TopicBreakDownProps = {
    courses: Course[];
};

export default function TopicBreakDown({ courses }: TopicBreakDownProps) {
    const [chartType, setChartType] = useState<"progressbar" | "bar" | "radial" | "radar">("progressbar");
    const hasCourses = Array.isArray(courses) && courses.length > 0;

    const colors = ["#34d399", "#3b82f6", "#8b5cf6", "#facc15", "#ef4444"];

    const groupByTopic = (courses: Course[]) => {
        const grouped: Record<string, { hours: number; courses: number }> = {};

        courses.forEach((course) => {
            if (!course) return;

            const studiedHours =
                course.status === "CONCLUIDO"
                    ? course.studiedHours || 0
                    : Math.round(((course.duration || 0) * (course.progress || 0)) / 100);

            const topic = course.topic.toLowerCase().replace(/\b\w/g, char => char.toUpperCase()) || "Outros";

            if (!grouped[topic]) grouped[topic] = { hours: 0, courses: 0 };

            grouped[topic].hours += studiedHours;
            grouped[topic].courses += 1;
        });

        return Object.entries(grouped)
            .map(([topic, data], index) => ({
                topic,
                hours: data.hours,
                courses: data.courses,
                fill: colors[index % colors.length],
            }))
            .sort((a, b) => b.hours - a.hours);
    };

    const topicBreakDown = groupByTopic(courses);
    const totalHours = topicBreakDown.reduce((acc, t) => acc + t.hours, 0) || 1;

    return (
        <>
            {hasCourses && (
                <div className="h-full bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">Distribuição por Tópico</h3>
                        <FormSelect
                            id={"topic-chart-type"}
                            aria-label="Tipo de gráfico para Tópicos"
                            label=""
                            value={chartType}
                            onChange={(e) =>
                                setChartType(e.target.value as "progressbar" | "bar" | "radial" | "radar")
                            }
                            options={[
                                { value: "progressbar", label: "Progressbar" },
                                { value: "bar", label: "Barras" },
                                { value: "radial", label: "Radial" },
                                { value: "radar", label: "Radar" },
                            ]}
                            className="w-40 px-0.5 py-0.5"
                        />
                    </div>

                    {/* Progressbar */}
                    {chartType === "progressbar" && (
                        <div className="space-y-4">
                            {topicBreakDown.map((topic, index) => {
                                const hoursPercent = (topic.hours / totalHours) * 100;
                                return (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-20 text-sm text-gray-400 text-left">
                                            {topic.topic
                                                .toLowerCase()
                                                .replace(/\b\w/g, (char) => char.toUpperCase())}
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-gray-600 rounded-full h-4 relative">
                                                <div
                                                    className="h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                                                    style={{
                                                        width: `${hoursPercent}%`,
                                                        minWidth: "2rem",
                                                        backgroundColor: topic.fill,
                                                    }}
                                                >
                                                    <span className="text-white text-xs pt-0.5">
                                                        {topic.hours}h
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-16 text-sm text-gray-400 text-center">
                                            {`${topic.courses} curso${topic.courses > 1 ? "s" : ""}`}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Bar Chart */}
                    {chartType === "bar" && (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={topicBreakDown}>
                                <XAxis dataKey="topic" />
                                <YAxis />
                                <Tooltip />
                                <CartesianGrid strokeDasharray="3 3" />
                                {topicBreakDown.map((t, i) => (
                                    <Bar key={i} dataKey="hours" fill={t.fill} />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    )}

                    {/* Radial Chart */}
                    {chartType === "radial" && (
                        <>
                            <ResponsiveContainer width="100%" height={300}>
                                <RadialBarChart
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="10%"
                                    outerRadius="80%"
                                    barSize={15}
                                    data={topicBreakDown}
                                >
                                    <RadialBar
                                        dataKey="hours"
                                        background
                                        label={{ position: "insideStart", fill: "#fff" }}
                                    />
                                    <Tooltip />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            {/* Legenda manual */}
                            <div className="flex gap-4 mt-4 flex-wrap">
                                {topicBreakDown.map((t, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: t.fill }} />
                                        <span className="text-gray-300 text-sm">{t.topic}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Radar Chart */}
                    {chartType === "radar" && (
                        <ResponsiveContainer width="100%" height={300}>
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topicBreakDown}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="topic" />
                                <PolarRadiusAxis />
                                <Radar
                                    name="Horas"
                                    dataKey="hours"
                                    stroke="#fff"
                                    fillOpacity={0.6}
                                    fill="#34d399"
                                />
                                <Tooltip />
                            </RadarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            )}
        </>
    );
}
