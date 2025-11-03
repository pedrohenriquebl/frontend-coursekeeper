'use client'

import { useMemo, useRef, useState } from "react";
import ReportHeader from "./ReportHeader";
import UserInformation from "./UserInformation";
import ReportFilterSelect from "./ReportFilterSelect";
import { FilterPeriod, FilterPlatform, FilterStatus, FilterTopic } from "@/types";
import { useAuthUser } from "@/context/authUserContext";
import { useCourse } from "@/components/courses/CourseModals/hooks/useCourse";
import KeyMetrics from "./KeyMetrics";
import FilteredCourses from "./FilteredCourses";
import MonthlyProgress from "./MonthlyProgress";
import TopicBreakDown from "./TopicBreakDown";
import PlatformBreakDown from "./PlatformBreakDown";
import RecentCompletions from "./RecentCompletions";
import Resumee from "./Resumee";
import { FadeSlide } from "@/components/animation/FadeSlide";
import Link from "next/link";
import ExportDialog from "./ExportDialog";
import { useExportPDF } from "../hooks/useExportPDF";


type PeriodOption = { value: FilterPeriod; label: string };
type QualityOption = { label: string; dpi: number; scale: number };

const QUALITY_OPTIONS: QualityOption[] = [
    { label: "Baixa (96 DPI)", dpi: 96, scale: 1 },
    { label: "Boa (150 DPI)", dpi: 150, scale: 2 },
    { label: "Muito Boa (200 DPI)", dpi: 200, scale: 2.5 },
    { label: "Alta (300 DPI)", dpi: 300, scale: 3 },
];

export default function ReportClient() {
    const { user } = useAuthUser();
    const { coursesReported } = useCourse();
    const [isExporting, setIsExporting] = useState(false);
    const [period, setPeriod] = useState<FilterPeriod>("7days");
    const [topic, setTopic] = useState<FilterTopic>("all");
    const [platform, setPlatform] = useState<FilterPlatform>("all");
    const [status, setStatus] = useState<FilterStatus>("all");
    const reportRef = useRef<HTMLDivElement>(null);
    const [forceExpandCourses, setForceExpandCourses] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedQuality, setSelectedQuality] = useState<QualityOption>(QUALITY_OPTIONS[2]);
    const { exportPDF } = useExportPDF(reportRef as React.RefObject<HTMLDivElement>, user?.firstName);


    const getStartDate = (period: FilterPeriod) => {
        const now = new Date();
        switch (period) {
            case "7days":
                return new Date(now.setDate(now.getDate() - 7));
            case "30days":
                return new Date(now.setDate(now.getDate() - 30));
            case "3months":
                return new Date(now.setMonth(now.getMonth() - 3));
            case "6months":
                return new Date(now.setMonth(now.getMonth() - 6));
            case "1year":
                return new Date(now.setFullYear(now.getFullYear() - 1));
            default:
                return null;
        }
    };

    const filteredCourses = useMemo(() => {
        if (!coursesReported) return [];

        const startDate = getStartDate(period);

        return coursesReported.filter(course => {
            const courseDate = course.endDate
                ? new Date(course.endDate)
                : (course.startDate ? new Date(course.startDate) : null);

            const matchesPeriod =
                period === "all" || (startDate && courseDate && courseDate >= startDate);

            const matchesTopic = topic === "all" || course.topic === topic;
            const matchesPlatform = platform === "all" || course.platform === platform;
            const matchesStatus = status === "all" || course.status === status;

            return matchesPeriod && matchesTopic && matchesPlatform && matchesStatus;
        });
    }, [coursesReported, period, topic, platform, status]);

    if (!user) return null;

    const handleConfirmExport = () => {
        setForceExpandCourses(true);

        requestAnimationFrame(() => {
            exportPDF(
                selectedQuality,
                () => setIsExporting(true),
                () => {
                    setIsExporting(false);
                    setForceExpandCourses(false);
                }
            );
        });

        setIsDialogOpen(false);
    };

    const periods: PeriodOption[] = [
        { value: "7days", label: "Últimos 7 dias" },
        { value: "30days", label: "Últimos 30 dias" },
        { value: "3months", label: "Últimos 3 meses" },
        { value: "6months", label: "Últimos 6 meses" },
        { value: "1year", label: "Último ano" },
        { value: "all", label: "Todo o período" },
    ];

    if (user.subscriptionPlan === "FREE") {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center">
                <h2 className="text-2xl font-semibold text-white mb-4">
                    Relatórios Disponíveis Apenas para Planos Pagos
                </h2>
                <p className="text-gray-400 max-w-md">
                    Atualize para um plano pago para acessar recursos avançados de relatórios e obter insights detalhados sobre seu aprendizado.
                </p>
                <Link href="/subscriptions" className="mt-4 inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded">
                    Ver Planos
                </Link>
            </div>
        )
    }

    return (
        <div
            ref={reportRef}
            className="max-w-7xl mx-auto px-4 py-8 flex flex-col text-[color:var(--report-page-text,#fff)]">
            <ReportHeader
                onExport={() => setIsDialogOpen(true)}
                isExporting={isExporting}
            />

            <UserInformation
                name={`${user?.firstName} ${user?.lastName}`}
                email={user?.email}
                memberSince={new Date(user?.createdAt).toLocaleDateString("pt-BR")}
                reportDate={new Date().toLocaleDateString("pt-BR")}
                period={period}
                periods={periods}
                userImg={user?.profileImage || '/avatars/placeholder.png'}
            />

            <div id="report-filter-select" className="sticky top-0 z-50">
                <ReportFilterSelect
                    period={period}
                    topic={topic}
                    platform={platform}
                    periods={periods}
                    status={status}
                    setReportFilters={({ period, topic, platform, status }) => {
                        if (period) setPeriod(period);
                        if (topic) setTopic(topic);
                        if (platform) setPlatform(platform);
                        if (status) setStatus(status);
                    }}
                />
            </div>

            {filteredCourses.length > 0 ? (
                <>
                    <FadeSlide>
                        <KeyMetrics courses={filteredCourses} />
                    </FadeSlide>

                    <FadeSlide>
                        <FilteredCourses
                            period={period}
                            topic={topic}
                            platform={platform}
                            periods={periods}
                            courses={filteredCourses}
                            forceExpand={forceExpandCourses}
                        />
                    </FadeSlide>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4 items-stretch">
                        <FadeSlide>
                            <MonthlyProgress courses={filteredCourses} />
                        </FadeSlide>
                        <FadeSlide>
                            <TopicBreakDown courses={filteredCourses} />
                        </FadeSlide>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
                        <FadeSlide>
                            <PlatformBreakDown courses={filteredCourses} />
                        </FadeSlide>
                        <FadeSlide>
                            <RecentCompletions courses={filteredCourses} />
                        </FadeSlide>
                    </div>

                    <div className="mt-8 bg-[color:var(--report-card-bg,#23272f)]/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-[color:var(--report-card-border,#52525b)]/50">
                        <FadeSlide>
                            <Resumee
                                name={`${user?.firstName} ${user?.lastName}`}
                                email={user?.email}
                                memberSince={new Date(user?.createdAt).toLocaleDateString("pt-BR")}
                                courses={filteredCourses}
                                period={period}
                                periods={periods}
                                topic={topic}
                                platform={platform}
                            />
                        </FadeSlide>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-[40vh]">
                    <h2 className="text-2xl font-semibold text-white mb-4">
                        Nenhum curso encontrado
                    </h2>
                    <p className="text-gray-400">
                        Tente ajustar os filtros para ver seus cursos.
                    </p>
                </div>
            )}

            <ExportDialog
                isOpen={isDialogOpen}
                onClose={setIsDialogOpen}
                isExporting={isExporting}
                qualityOptions={QUALITY_OPTIONS}
                selectedQuality={selectedQuality}
                setSelectedQuality={setSelectedQuality}
                onConfirm={handleConfirmExport}
            />
        </div>
    );

}