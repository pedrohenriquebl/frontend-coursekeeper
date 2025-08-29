import { FadeSlide } from "@/components/animation/FadeSlide";
import { Award } from "lucide-react";

interface Achievement {
    achievement: {
        id: number;
        code: string;
        name: string;
        description: string;
        icon: string;
    };
    unlocked: boolean;
}

export default function AchievementsCard({ achievements }: { achievements: Achievement[] }) {
    return (
        <FadeSlide>
            <div className={`bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 max-h-[394px] 
                ${achievements.length > 4 ? 'overflow-y-scroll' : ''}`}>
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-400" />
                    Conquistas
                </h2>
                <div className="space-y-3">
                    {achievements.map(({ achievement, unlocked }, index) => (
                        <div
                            key={achievement.id ?? index}
                            className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg"
                        >
                            <div className="w-8 h-8 bg-yellow-600/20 rounded-full flex items-center justify-center">
                                {achievement.icon ? (
                                    <span className="text-lg">{achievement.icon}</span>
                                ) : (
                                    <Award className="h-4 w-4 text-yellow-400" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white font-medium">
                                    {achievement.name}
                                </span>
                                <span className="text-gray-400 text-sm">
                                    {achievement.description}
                                </span>
                            </div>
                            {!unlocked && (
                                <span className="ml-auto text-xs text-gray-500 italic">
                                    Bloqueado
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </FadeSlide>
    )
}