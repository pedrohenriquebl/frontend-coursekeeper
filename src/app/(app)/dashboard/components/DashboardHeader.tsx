import { useAuthUser } from "@/context/authUserContext";

export function DashboardHeader() {
  const { user } = useAuthUser();
  
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white mb-2">
        {`Bem-vindo de volta ${user?.firstName}! 👋`}
      </h1>
      <p className="text-gray-400">
        Acompanhe seu progresso educacional e continue aprendendo
      </p>
    </div>
  );
}