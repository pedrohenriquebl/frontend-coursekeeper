import { FilterPeriod, FilterTopic, FilterPlatform, FilterStatus } from "@/types";

type ReportFilterSelectProps = {
    period: FilterPeriod;
    topic: FilterTopic;
    platform: FilterPlatform;
    status: FilterStatus;
    periods: { value: string; label: string }[];
    setReportFilters: (filters: {
        period?: FilterPeriod;
        topic?: FilterTopic;
        platform?: FilterPlatform;
        status?: FilterStatus;
    }) => void;
};
export default function ReportFilterSelect({
    period,
    topic,
    platform,
    status,
    periods,
    setReportFilters
}: ReportFilterSelectProps) {
    const topics: (FilterTopic)[] = [
        "all",
        "FRONTEND",
        "BACKEND",
        "DESIGN",
        "DATA SCIENCE",
        "DEVOPS",
        "MOBILE",
        "FULL STACK",
        "DATABASE",
        "OUTROS",
    ];

    const platforms: (FilterPlatform)[] = [
        "all",
        "UDEMY",
        "COURSERA",
        "YOUTUBE",
        "EDX",
        "VUE MASTERY",
        "ROCKETSEAT",
        "ALURA",
        "OUTROS",
    ];

    return (
        <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 mb-8 sticky top-0 z-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3 sm:mb-2" htmlFor="period">
                        Período
                    </label>
                    <select
                        id={"period"}
                        value={period}
                        onChange={(e) =>
                            setReportFilters({ period: e.target.value as FilterPeriod })
                        }
                        className="w-full px-4 py-2 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                        {periods.map((period) => (
                            <option
                                key={period.value}
                                value={period.value}
                                className="bg-gray-800"
                            >
                                {period.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3 sm:mb-2" htmlFor="topic">
                        Tópico
                    </label>
                    <select
                        id={"topic"}
                        value={topic}
                        onChange={(e) =>
                            setReportFilters({ topic: e.target.value as FilterTopic })
                        }
                        className="w-full px-4 py-2 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                        {topics.map((topic) => (
                            <option key={topic} value={topic} className="bg-gray-800">
                                {topic === "all" ? "Todos os tópicos" : topic.toLocaleLowerCase().replace(/^\w/, (char) => char.toUpperCase())}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3 sm:mb-2" htmlFor="platform">
                        Plataforma
                    </label>
                    <select
                        id={"platform"}
                        value={platform}
                        onChange={(e) =>
                            setReportFilters({
                                platform: e.target.value as FilterPlatform,
                            })
                        }
                        className="w-full px-4 py-2 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    >
                        {platforms.map((platform) => (
                            <option
                                key={platform}
                                value={platform}
                                className="bg-gray-800"
                            >
                                {platform === "all" ? "Todas as plataformas" : platform.toLocaleLowerCase().replace(/^\w/, (char) => char.toUpperCase())}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-3 sm:mb-2" htmlFor="status">
                        Status
                    </label>
                    <select
                        id={"status"}
                        value={status}
                        onChange={(e) =>
                            setReportFilters({
                                status: e.target.value as FilterStatus,
                            })
                        }
                           className="w-full px-4 py-2 md:py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm sm:text-base focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        >
                        {["all", "NAO_INICIADO", "EM_PROGRESSO", "CONCLUIDO", "NAO_CONCLUIDO"].map((status) => (
                            <option
                                key={status}
                                value={status}
                                className="bg-gray-800"
                            >
                                {status === "all" ? "Todos os status" : status === "NAO_INICIADO" ? "Não Iniciado" : status === "EM_PROGRESSO" ? "Em Progresso" : status === "CONCLUIDO" ? "Concluído" : "Não Concluído"}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div >
    )
}