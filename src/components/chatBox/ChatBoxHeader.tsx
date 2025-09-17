import { Trash2, X, Sparkles } from "lucide-react";

interface ChatBoxHeaderProps {
    onClear: () => void;
    onClose: () => void;
}

export default function ChatBoxHeader({ onClear, onClose }: ChatBoxHeaderProps) {
    return (
        <div
            className="p-3 border-b font-semibold flex justify-between items-center"
            style={{
                color: "var(--card-foreground)",
                borderColor: "var(--border)",
            }}
        >
            <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                    <Sparkles size={20} className="text-[color:var(--authform-primary)] animate-pulse" />
                    <span className="font-bold tracking-tight">CourseKeeper <span className="text-[color:var(--authform-primary)]">IA</span></span>
                </span>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onClear}
                    title="Limpar conversa"
                    className="transition-colors"
                    style={{ color: "var(--muted)" }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--destructive)";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
                    }}
                >
                    <Trash2 size={18} />
                </button>
                <button onClick={onClose}>
                    <X size={18} />
                </button>
            </div>
        </div>
    );
}
