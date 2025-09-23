import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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
    const [isOpen, setIsOpen] = useState(false);

    const topics: FilterTopic[] = [
        "all",
        "FRONTEND",
        "BACKEND",
        "DESIGN",
        "DATA SCIENCE",
        "DEVOPS",
        "MOBILE",
        "FULLSTACK",
        "DATABASE",
        "OUTROS",
    ];

    const platforms: FilterPlatform[] = [
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

    const statuses: FilterStatus[] = ["all", "NAO_INICIADO", "EM_PROGRESSO", "CONCLUIDO", "NAO_CONCLUIDO"];

    return (
        <div className="mb-8 rounded-xl shadow-lg border border-[color:var(--report-card-border,#52525b)]/50 bg-[color:var(--report-card-bg,#23272f)]/60 backdrop-blur-sm sticky top-0 z-50">

            <button
                className="w-full md:hidden flex justify-between items-center px-4 py-3 font-medium text-[color:var(--report-filter-label,#a3a3a3)]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>Filtros</span>
                {isOpen ? <ChevronUp className="w-5 h-5 text-[color:var(--report-filter-label,#a3a3a3)]" /> : <ChevronDown className="w-5 h-5 text-[color:var(--report-filter-label,#a3a3a3)]" />}
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1000px] md:max-h-full" : "max-h-0 md:max-h-full"} md:block`}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
                    <div>
                        <label className="block text-sm font-medium text-[color:var(--report-filter-label,#a3a3a3)] mb-3 sm:mb-2" htmlFor="period">
                            Período
                        </label>
                        <select
                            id="period"
                            value={period}
                            onChange={(e) => setReportFilters({ period: e.target.value as FilterPeriod })}
                            className="w-full px-4 py-2 md:py-3 leading-[1.5rem] bg-[color:var(--report-filter-input-bg,#23272f)] border border-[color:var(--report-filter-input-border,#52525b)] rounded-lg text-[color:var(--report-filter-input,#fff)] text-sm sm:text-base focus:border-[color:var(--report-filter-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--report-filter-input-focus,#059669)]"
                        >
                            {periods.map((p) => (
                                <option key={p.value} value={p.value} className="bg-[color:var(--report-card-item-bg,#23272f)]">
                                    {p.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[color:var(--report-filter-label,#a3a3a3)] mb-3 sm:mb-2" htmlFor="topic">
                            Tópico
                        </label>
                        <select
                            id="topic"
                            value={topic}
                            onChange={(e) => setReportFilters({ topic: e.target.value as FilterTopic })}
                            className="w-full px-4 py-2 md:py-3 leading-[1.5rem] bg-[color:var(--report-filter-input-bg,#23272f)] border border-[color:var(--report-filter-input-border,#52525b)] rounded-lg text-[color:var(--report-filter-input,#fff)] text-sm sm:text-base focus:border-[color:var(--report-filter-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--report-filter-input-focus,#059669)]"
                        >
                            {topics.map((t) => (
                                <option key={t} value={t} className="bg-[color:var(--report-card-item-bg,#23272f)]">
                                    {t === "all" ? "Todos os tópicos" : t.toLocaleLowerCase().replace(/^\w/, (char) => char.toUpperCase())}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[color:var(--report-filter-label,#a3a3a3)] mb-3 sm:mb-2" htmlFor="platform">
                            Plataforma
                        </label>
                        <select
                            id="platform"
                            value={platform}
                            onChange={(e) => setReportFilters({ platform: e.target.value as FilterPlatform })}
                            className="w-full px-4 py-2 md:py-3 leading-[1.5rem] bg-[color:var(--report-filter-input-bg,#23272f)] border border-[color:var(--report-filter-input-border,#52525b)] rounded-lg text-[color:var(--report-filter-input,#fff)] text-sm sm:text-base focus:border-[color:var(--report-filter-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--report-filter-input-focus,#059669)]"
                        >
                            {platforms.map((p) => (
                                <option key={p} value={p} className="bg-[color:var(--report-card-item-bg,#23272f)]">
                                    {p === "all" ? "Todas as plataformas" : p.toLocaleLowerCase().replace(/^\w/, (char) => char.toUpperCase())}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[color:var(--report-filter-label,#a3a3a3)] mb-3 sm:mb-2" htmlFor="status">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setReportFilters({ status: e.target.value as FilterStatus })}
                            className="w-full px-4 py-2 md:py-3 leading-[1.5rem] bg-[color:var(--report-filter-input-bg,#23272f)] border border-[color:var(--report-filter-input-border,#52525b)] rounded-lg text-[color:var(--report-filter-input,#fff)] text-sm sm:text-base focus:border-[color:var(--report-filter-input-focus,#059669)] focus:ring-1 focus:ring-[color:var(--report-filter-input-focus,#059669)]"
                        >
                            {statuses.map((s) => (
                                <option key={s} value={s} className="bg-[color:var(--report-card-item-bg,#23272f)]">
                                    {s === "all" ? "Todos os status" : s === "NAO_INICIADO" ? "Não Iniciado" : s === "EM_PROGRESSO" ? "Em Progresso" : s === "CONCLUIDO" ? "Concluído" : "Não Concluído"}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
