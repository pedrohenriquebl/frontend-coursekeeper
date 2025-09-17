interface ChatBoxInputProps {
    input: string;
    setInput: (v: string) => void;
    onSend: (e: React.FormEvent) => void;
}

export default function ChatBoxInput({ input, setInput, onSend }: ChatBoxInputProps) {
    return (
        <form
            onSubmit={onSend}
            className="p-3 border-t flex gap-2 h-[6rem]"
            style={{ borderColor: "var(--border)" }}
        >
            <textarea
                id={"message-input"}
                value={input}
                aria-label="Mensagem"
                name={"message"}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 border rounded-lg px-3 py-2 text-sm resize-none focus:outline-none"
                rows={1}
                style={{
                    background: "var(--goal-modal-input-bg)",
                    color: "var(--goal-modal-input-text)",
                    borderColor: "var(--goal-modal-input-border)",
                    maxHeight: "6rem",
                    overflowY: "auto",
                }}
            />
            <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm transition-colors"
                style={{
                    background: "var(--authform-primary)",
                    color: "var(--primary-foreground)",
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--authform-primary-hover, var(--authform-primary-light))";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--authform-primary)";
                }}
            >
                Enviar
            </button>
        </form>
    );
}
