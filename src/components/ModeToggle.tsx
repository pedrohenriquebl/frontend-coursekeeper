import { cn } from "@/lib/utils";

interface ModeToggleProps {
  mode: "login" | "register";
  toggleMode: () => void;
}

export function ModeToggle({ mode, toggleMode }: ModeToggleProps) {
  return (
    <div className="flex bg-gray-700/50 rounded-lg p-1 mb-6">
      <button
        type="button"
        onClick={() => mode !== "login" && toggleMode()}
        className={cn(
          "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
          mode === "login"
            ? "bg-emerald-600 text-white shadow-sm"
            : "text-gray-400 hover:text-gray-200"
        )}
      >
        Entrar
      </button>
      <button
        type="button"
        onClick={() => mode !== "register" && toggleMode()}
        className={cn(
          "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
          mode === "register"
            ? "bg-emerald-600 text-white shadow-sm"
            : "text-gray-400 hover:text-gray-200"
        )}
      >
        Cadastrar
      </button>
    </div>
  );
}
