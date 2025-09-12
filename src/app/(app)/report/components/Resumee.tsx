import { Course } from "@/types"

type ResumeeProps = {
    courses: Course[];
    name: string;
    email: string;
    memberSince: string;
    period: string;
    periods: { value: string; label: string }[];
    topic: string;
    platform: string;
};

export default function Resumee({
    courses,
    name,
    email,
    memberSince,
    period,
    periods,
    topic,
    platform
}: ResumeeProps) {
    const totalCourses = courses.length;
    const completedCourses = courses.filter(c => c.status === "CONCLUIDO").length;
    const coursesInProgress = courses.filter(c => c.status === "EM_PROGRESSO").length;
    const totalHours = courses.reduce((sum, c) => sum + (c.studiedHours || 0), 0);
    const averageRating = courses.length > 0 ? courses.reduce((sum, c) => sum + (c.rating || 0), 0) / courses.length : 0;
    const topicBreakdown = [...new Set(courses.map(c => c.topic))];
    const platformBreakdown = [...new Set(courses.map(c => c.platform))];

    return (
        <>
            {courses.length > 0 ? (
                <>
                    <h3 className="text-lg font-semibold text-[color:var(--report-resumee-title)] mb-4">
                        Resumo do Relatório
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[color:var(--report-resumee-meta)]">
                        <div>
                            <h4 className="text-[color:var(--report-resumee-section-title)] font-medium mb-3">📊 Dados do Período</h4>
                            <p className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Período:</strong>{" "}
                                {periods.find((p) => p.value === period)?.label}
                            </p>
                            <p className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Data do relatório:</strong>{" "}
                                {new Date().toLocaleDateString("pt-BR")}
                            </p>
                            <p className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Total de cursos:</strong>{" "}
                                {totalCourses}
                            </p>
                            <p className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Cursos concluídos:</strong>{" "}
                                {completedCourses}
                            </p>
                            <p className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Cursos em progresso:</strong>{" "}
                                {coursesInProgress}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[color:var(--report-resumee-section-title)] font-medium mb-3">⏱️ Estatísticas de Estudo</h4>
                            <p className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Horas estudadas:</strong>{" "}
                                {totalHours}h
                            </p>
                            <p className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Avaliação média:</strong>{" "}
                                {averageRating.toFixed(1)}/5
                            </p>
                            <p className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Taxa de conclusão:</strong>{" "}
                                {totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0}%
                            </p>
                            <p className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Tópico favorito:</strong>{" "}
                                {topicBreakdown.length > 0 ? topicBreakdown[0].toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase()) : "—"}
                            </p>
                            <p className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Plataforma preferida:</strong>{" "}
                                {platformBreakdown.length > 0 ? platformBreakdown[0].toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase()) : "—"}
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[color:var(--report-resumee-section-title)] font-medium mb-3">👤 Informações do Usuário</h4>
                            <p className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Nome:</strong> {name}
                            </p>
                            <p className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Email:</strong> {email}
                            </p>
                            <p className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Membro desde:</strong> {memberSince}
                            </p>
                            <div className="mb-2">
                                <strong className="text-[color:var(--report-resumee-label)]">Filtros aplicados:</strong>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {topic !== "all" ? topic : "Tópicos - Todos"} • {platform !== "all" ? platform : "Plataformas - Todas"}
                                    {period !== "all"
                                        ? ` • ${periods.find((p) => p.value === period)?.label}`
                                        : " • Todo o período"}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}