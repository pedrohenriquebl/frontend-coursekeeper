import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils";

interface ModalActionsProps {
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  submitText?: string;
  cancelText?: string;
}

export function ModalActions({
  onCancel,
  onSubmit,
  isLoading,
  submitText = "Salvar",
  cancelText = "Cancelar",
}: ModalActionsProps) {
  return (
    <div className="flex gap-3 pt-4">
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg transition-colors duration-200"
      >
        {cancelText}
      </button>
      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading}
        className={cn(
          "flex-1 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center gap-2",
          isLoading
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700 text-white",
        )}
      >
        {isLoading ? (
          <>
            <Spinner
              size="sm"
              className="border-gray-300 border-t-transparent"
            />
            Salvando...
          </>
        ) : (
          submitText
        )}
      </button>
    </div>
  );
}