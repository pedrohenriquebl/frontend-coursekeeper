import { cn } from "@/lib/utils";
import { Course } from "@/types";
import { Star } from "lucide-react";

type RecentCompletionsProps = {
    courses: Course[];
};

export default function RecentCompletions({ courses }: RecentCompletionsProps) {  
    const recentCourses = courses
        .filter((course) => course.status === "CONCLUIDO")
        .sort((a, b) => {
            const dateA = a.endDate ? new Date(a.endDate).getTime() : 0;
            const dateB = b.endDate ? new Date(b.endDate).getTime() : 0;
            return dateB - dateA;
        })
        .slice(0, 5);

    console.log(recentCourses);

    return (
        <>
            {recentCourses.length > 0 ? (
                <div className="h-full bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50">
                    <h3 className="text-lg font-semibold text-white mb-6">
                        Cursos Concluídos Recentemente
                    </h3>
                    <div className="space-y-4">
                        {recentCourses.map((completion, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                            >
                                <div>
                                    <div className="font-medium text-white">
                                        {completion.name}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {completion.platform.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())}
                                    </div>
                                </div>
                                <div className="text-right">
                                    {(completion.rating ?? 0) > 0 && (
                                        <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                            <span className="text-gray-400">Avaliação:</span>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={cn(
                                                            "h-3 w-3",
                                                            i < (completion.rating ?? 0)
                                                                ? "text-yellow-400 fill-current"
                                                                : "text-gray-500"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {completion.endDate && (
                                        new Date(completion.endDate).toLocaleDateString("pt-BR")
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
                </div >
            ) : (
        null
    )
}
        </>
    );
}