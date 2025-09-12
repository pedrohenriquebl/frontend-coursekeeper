import { Download } from "lucide-react"

type ReportHeaderProps = {
    onExport: () => void;
    isExporting: boolean;
}

export default function ReportHeader({ onExport, isExporting }: ReportHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-[color:var(--report-header-title,#fff)] mb-2">
                    Relatórios de Progresso
                </h1>
                <p className="text-[color:var(--report-header-meta,#a3a3a3)]">
                    Acompanhe sua evolução e análise detalhada dos estudos
                </p>
            </div>
            <button
                onClick={onExport}
                disabled={isExporting}
                className="flex items-center gap-2 bg-[color:var(--report-header-action-bg,#059669)] text-[color:var(--report-header-action,#fff)] px-6 py-3 rounded-lg hover:bg-[color:var(--report-header-action-hover-bg,#059669)] transition-colors duration-200 font-medium disabled:opacity-50"
            >
                {isExporting ? (
                    <>
                        <div className="w-4 h-4 border-2 border-[color:var(--report-header-spinner,#fff)] border-t-transparent rounded-full animate-spin" />
                        Exportando...
                    </>
                ) : (
                    <>
                        <Download className="h-5 w-5" />
                        Exportar PDF
                    </>
                )}
            </button>
        </div>
    )
}