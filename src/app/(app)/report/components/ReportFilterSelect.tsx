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
    <div className="bg-[color:var(--report-card-bg,#23272f)]/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[color:var(--report-card-border,#52525b)]/50 mb-8 sticky top-0 z-50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-[color:var(--report-filter-label,#a3a3a3)] mb-3 sm:mb-2" htmlFor="period">
                        Período
                    </label>
                    <select
                        id={"period"}
                        value={period}
                        onChange={(e) =>
                            setReportFilters({ period: e.target.value as FilterPeriod })
                        }
                        className="w-full px-4 py-2 md:py-3 bg-[color:var(--report-filter-input-bg,#23272f)] border border-[color:var(--report-filter-input-border,#52525b)] rounded-lg text-[color:var(--report-filter-input,#fff)] text-sm sm:text-base focus:border-[color:var(--report-filter-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--report-filter-input-focus,#059669)]"
                    >
                        {periods.map((period) => (
                            <option
                                key={period.value}
                                value={period.value}
                                className="bg-[color:var(--report-card-item-bg,#23272f)]"
                            >
                                {period.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[color:var(--report-filter-label,#a3a3a3)] mb-3 sm:mb-2" htmlFor="topic">
                        Tópico
                    </label>
                    <select
                        id={"topic"}
                        value={topic}
                        onChange={(e) =>
                            setReportFilters({ topic: e.target.value as FilterTopic })
                        }
                        className="w-full px-4 py-2 md:py-3 bg-[color:var(--report-filter-input-bg,#23272f)] border border-[color:var(--report-filter-input-border,#52525b)] rounded-lg text-[color:var(--report-filter-input,#fff)] text-sm sm:text-base focus:border-[color:var(--report-filter-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--report-filter-input-focus,#059669)]"
                    >
                        {topics.map((topic) => (
                            <option key={topic} value={topic} className="bg-[color:var(--report-card-item-bg,#23272f)]">
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
                        className="w-full px-4 py-2 md:py-3 bg-[color:var(--report-filter-input-bg,#23272f)] border border-[color:var(--report-filter-input-border,#52525b)] rounded-lg text-[color:var(--report-filter-input,#fff)] text-sm sm:text-base focus:border-[color:var(--report-filter-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--report-filter-input-focus,#059669)]"
                    >
                        {platforms.map((platform) => (
                            <option
                                key={platform}
                                value={platform}
                                className="bg-[color:var(--report-card-item-bg,#23272f)]"
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
                        className="w-full px-4 py-2 md:py-3 bg-[color:var(--report-filter-input-bg,#23272f)] border border-[color:var(--report-filter-input-border,#52525b)] rounded-lg text-[color:var(--report-filter-input,#fff)] text-sm sm:text-base focus:border-[color:var(--report-filter-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--report-filter-input-focus,#059669)]"
                    >
                        {["all", "NAO_INICIADO", "EM_PROGRESSO", "CONCLUIDO", "NAO_CONCLUIDO"].map((status) => (
                            <option
                                key={status}
                                value={status}
                                className="bg-[color:var(--report-card-item-bg,#23272f)]"
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