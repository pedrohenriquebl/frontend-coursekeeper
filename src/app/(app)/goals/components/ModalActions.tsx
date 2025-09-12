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
  className="flex-1 bg-[color:var(--modal-actions-cancel-bg,#52525b)] hover:bg-[color:var(--modal-actions-cancel-hover-bg,#a3a3a3)] text-[color:var(--modal-actions-cancel-text,#fff)] py-3 rounded-lg transition-colors duration-200"
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
            ? "bg-[color:var(--modal-actions-submit-loading-bg,#52525b)] text-[color:var(--modal-actions-submit-loading-text,#d1d5db)] cursor-not-allowed"
            : "bg-[color:var(--modal-actions-submit-bg,#059669)] hover:bg-[color:var(--modal-actions-submit-hover-bg,#059669)] text-[color:var(--modal-actions-submit-text,#fff)]",
        )}
      >
        {isLoading ? (
          <>
            <Spinner
              size="sm"
              className="border-[color:var(--modal-actions-spinner,#d1d5db)] border-t-transparent"
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