'use client'

import { useState } from "react";
import ReportHeader from "./ReportHeader";
import UserInformation from "./UserInformation";
import ReportFilterSelect from "./ReportFilterSelect";
import { FilterPeriod, FilterPlatform, FilterTopic } from "@/types";
import { useAuthUser } from "@/context/authUserContext";

export default function ReportClient() {
    const { user } = useAuthUser();    
    const [isExporting, setIsExporting] = useState(false);
    const [period, setPeriod] = useState<FilterPeriod>("7days");
    const [topic, setTopic] = useState<FilterTopic>("all");
    const [platform, setPlatform] = useState<FilterPlatform>("all");

    if (!user) return null;

    const handleExportPDF = async () => {
        setIsExporting(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsExporting(false);

        // In a real implementation, this would generate and download a PDF
        alert("Relatório exportado com sucesso! (funcionalidade simulada)");
    };

    const periods = [
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
                setReportFilters={({ period, topic, platform }) => {
                    if (period) setPeriod(period);
                    if (topic) setTopic(topic);
                    if (platform) setPlatform(platform);
                }}
            />
        </div>
    )
}