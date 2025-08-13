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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-sm p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Confirmar exclusão</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mb-6">
          Tem certeza que deseja excluir <strong>{courseName}</strong>?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="cursor-pointer flex-1 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="cursor-pointer flex-1 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Sim, excluir
          </button>
        </div>
      </div>
    </div>
  );
}
