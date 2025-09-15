import { X } from "lucide-react";
import { SubscriptionPlan } from "@/types";

interface ConfirmDowngradeModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  currentPlan: SubscriptionPlan;
  targetPlan: SubscriptionPlan;
}

const planNames = {
  FREE: "Free",
  GOLD: "Gold", 
  PLATINUM: "Platinum"
};

export default function ConfirmDowngradeModal({ 
  show, 
  onConfirm, 
  onCancel, 
  currentPlan, 
  targetPlan 
}: ConfirmDowngradeModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl w-full max-w-md p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Confirmar alteração de plano</h2>
            <button onClick={onCancel} className="text-[color:var(--modal-desc,#9ca3af)] hover:text-[color:var(--modal-title,#fff)]">
              <X className="h-5 w-5" />
            </button>
          </div>
          <p className="mb-6">
            Você assina atualmente o plano <strong>{planNames[currentPlan]}</strong>. 
            Tem certeza que deseja cancelar e assinar o plano <strong>{planNames[targetPlan]}</strong>?
            <br /><br />
            <span className="text-[color:var(--modal-warning,#fbbf24)]">
              ⚠️ Você perderá acesso a recursos exclusivos do seu plano atual.
            </span>
          </p>
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="cursor-pointer flex-1 py-2 bg-[color:var(--modal-bg,#4b5563)] rounded-lg hover:bg-[color:var(--modal-bg-hover,#6b7280)] transition-colors"
            >
              Manter plano atual
            </button>
            <button
              onClick={onConfirm}
              className="cursor-pointer flex-1 py-2 bg-[color:var(--modal-danger,#dc2626)] rounded-lg hover:bg-[color:var(--modal-danger-hover,#ef4444)] transition-colors"
            >
              Sim, alterar plano
            </button>
          </div>
      </div>
    </div>
  );
}