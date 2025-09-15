"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export type QualityOption = { label: string; dpi: number; scale: number };

interface ExportDialogProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  isExporting: boolean;
  qualityOptions: QualityOption[];
  selectedQuality: QualityOption;
  setSelectedQuality: (q: QualityOption) => void;
  onConfirm: () => void;
}

export default function ExportDialog({
  isOpen,
  onClose,
  isExporting,
  qualityOptions,
  selectedQuality,
  setSelectedQuality,
  onConfirm,
}: ExportDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
          max-w-md space-y-6
          bg-[color:var(--modal-bg,#111827)]
          text-white
          rounded-2xl
          border-[color:var(--modal-border,#374151)]
        "
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[color:var(--modal-preview-title,#fff)]">Exportar Relatório</DialogTitle>
          <p className="text-[color:var(--authform-muted,#9ca3af)] text-sm mt-1">
            Selecione a qualidade do PDF antes de salvar.
          </p>
        </DialogHeader>

        <div className="flex flex-col gap-2 my-4">
          {qualityOptions.map((option) => (
            <Button
              key={option.label}
              variant={selectedQuality.label === option.label ? "default" : "secondary"}
              className="bg-[color:var(--authform-secondary-bg)] text-left
    text-[color:var(--authform-secondary-text)]
    border border-[color:var(--authform-secondary-border)]
    hover:bg-[color:var(--authform-secondary-hover-bg)]
    hover:text-[color:var(--authform-secondary-hover-text)]"
              onClick={() => setSelectedQuality(option)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={onConfirm} disabled={isExporting}>
            {isExporting ? "Gerando..." : "Exportar PDF"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
