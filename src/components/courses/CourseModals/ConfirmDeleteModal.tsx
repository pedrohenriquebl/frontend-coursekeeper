import { X } from "lucide-react";

interface ConfirmDeleteModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  courseName?: string;
}

export default function ConfirmDeleteModal({ show, onConfirm, onCancel, courseName }: ConfirmDeleteModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-[color:var(--modal-overlay-bg,rgba(0,0,0,0.5))] flex items-center justify-center z-50 p-4">
      <div className="bg-[color:var(--modal-bg,#23272f)] rounded-xl w-full max-w-sm p-6 text-[color:var(--modal-title,#fff)]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Confirmar exclusão</h2>
          <button onClick={onCancel} className="text-[color:var(--modal-close,#a3a3a3)] hover:text-[color:var(--modal-close-hover,#fff)]">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-6">
          Tem certeza que deseja excluir <strong>{courseName}</strong>?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="cursor-pointer flex-1 py-2 bg-[color:var(--modal-cancel-bg,#52525b)] rounded-lg hover:bg-[color:var(--modal-cancel-bg-hover,#3f3f46)] transition-colors text-[color:var(--modal-cancel-text,#fff)]"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer flex-1 py-2 bg-[color:var(--modal-delete-bg,#dc2626)] rounded-lg hover:bg-[color:var(--modal-delete-bg-hover,#b91c1c)] transition-colors text-[color:var(--modal-delete-text,#fff)]"
          >
            Sim, excluir
          </button>
        </div>
      </div>
    </div>
  );
}
