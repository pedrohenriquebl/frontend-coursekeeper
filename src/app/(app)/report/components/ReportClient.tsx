'use client'

import { useEffect, useMemo, useState } from "react";
import ReportHeader from "./ReportHeader";
import UserInformation from "./UserInformation";
import ReportFilterSelect from "./ReportFilterSelect";
import { FilterPeriod, FilterPlatform, FilterStatus, FilterTopic } from "@/types";
import { useAuthUser } from "@/context/authUserContext";
import { useCourse } from "@/components/courses/CourseModals/hooks/useCourse";
import KeyMetrics from "./KeyMetrics";
import FilteredCourses from "./FilteredCourses";

type PeriodOption = { value: FilterPeriod; label: string };

export default function ReportClient() {
    const { user } = useAuthUser();
    const { allCourses } = useCourse();
    const [isExporting, setIsExporting] = useState(false);
    const [period, setPeriod] = useState<FilterPeriod>("7days");
    const [topic, setTopic] = useState<FilterTopic>("all");
    const [platform, setPlatform] = useState<FilterPlatform>("all");
    const [status, setStatus] = useState<FilterStatus>("all");

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
        if (!allCourses) return [];

        const startDate = getStartDate(period);

        return allCourses.filter(course => {
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
    }, [allCourses, period, topic, platform, status]);

    useEffect(() => {
        console.log('allCourses:', allCourses);
        console.log("Cursos filtrados:", filteredCourses);
    }, [filteredCourses, allCourses]);

    if (!user) return null;

    const handleExportPDF = async () => {
        setIsExporting(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsExporting(false);

        // In a real implementation, this would generate and download a PDF
        alert("Relatório exportado com sucesso! (funcionalidade simulada)");
    };

    const periods: PeriodOption[] = [
        { value: "7days", label: "Últimos 7 dias" },
        { value: "30days", label: "Últimos 30 dias" },
        { value: "3months", label: "Últimos 3 meses" },
        { value: "6months", label: "Últimos 6 meses" },
        { value: "1year", label: "Último ano" },
        { value: "all", label: "Todo o período" },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ReportHeader onExport={handleExportPDF} isExporting={isExporting} />
            <UserInformation
                name={`${user?.firstName} ${user?.lastName}`}
                email={user?.email}
                memberSince={new Date(user?.createdAt).toLocaleDateString("pt-BR")}
                reportDate={new Date().toLocaleDateString("pt-BR")}
                period={period}
                periods={periods}
                userImg={user?.profileImage}
            />
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
            <KeyMetrics courses={filteredCourses} />
            <FilteredCourses
                period={period}
                topic={topic}
                platform={platform}
                periods={periods}
                courses={filteredCourses}
            />
        </div>
    )
}