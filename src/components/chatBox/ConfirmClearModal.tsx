import { X } from "lucide-react";

interface ConfirmClearModalProps {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmClearModal({ show, onConfirm, onCancel }: ConfirmClearModalProps) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[color:var(--modal-bg,#23272f)] rounded-xl w-full max-w-md p-6 text-[color:var(--modal-title,#fff)]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Limpar conversa?</h2>
                    <button onClick={onCancel} className="text-[color:var(--modal-desc,#9ca3af)] hover:text-[color:var(--modal-title,#fff)]">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <p className="mb-6">
                    Tem certeza que deseja limpar toda a conversa?
                    <br /><br />
                    <span className="text-[color:var(--modal-warning,#fbbf24)]">
                        ⚠️ Esta ação não pode ser desfeita.
                    </span>
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        className="cursor-pointer flex-1 py-2 bg-[color:var(--modal-bg,#4b5563)] rounded-lg hover:bg-[color:var(--modal-bg-hover,#6b7280)] transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="cursor-pointer flex-1 py-2 bg-[color:var(--modal-danger,#dc2626)] rounded-lg hover:bg-[color:var(--modal-danger-hover,#ef4444)] transition-colors"
                    >
                        Limpar conversa
                    </button>
                </div>
            </div>
        </div>
    );
}
