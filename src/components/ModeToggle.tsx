import { cn } from "@/lib/utils";

interface ModeToggleProps {
  mode: "login" | "register";
  toggleMode: () => void;
}

export function ModeToggle({ mode, toggleMode }: ModeToggleProps) {
  return (
    <div className="flex rounded-lg p-1 mb-6" style={{ background: "var(--authform-card-bg)" }}>
      <button
        type="button"
        onClick={() => mode !== "login" && toggleMode()}
        className={cn(
          "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
          mode === "login"
            ? "shadow-sm"
            : "hover:opacity-80"
        )}
        style={mode === "login"
          ? { background: "var(--authform-primary)", color: "#fff" }
          : { color: "var(--authform-muted)" }}
      >
        Entrar
      </button>
      <button
        type="button"
        onClick={() => mode !== "register" && toggleMode()}
        className={cn(
          "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200",
          mode === "register"
            ? "shadow-sm"
            : "hover:opacity-80"
        )}
        style={mode === "register"
          ? { background: "var(--authform-primary)", color: "#fff" }
          : { color: "var(--authform-muted)" }}
      >
        Cadastrar
      </button>
    </div>
  );
}
