import { useAuthUser } from "@/context/authUserContext";

export function DashboardHeader() {
  const { user } = useAuthUser();
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-[color:var(--dashboard-header-title,#fff)] mb-2">
        {`Bem-vindo de volta ${user?.firstName ?? ""}! 👋`}
      </h1>
      <p className="text-[color:var(--dashboard-header-meta,#a3a3a3)]">
        Acompanhe seu progresso educacional e continue aprendendo
      </p>
    </div>
  );
}