import { SubscriptionPlan, Duration, PaymentMethod } from "@/types";
import { Button } from "@/components/ui/button";
import { plans } from "./SubscriptionPlans";

interface SummaryStepProps {
  selectedPlan: SubscriptionPlan | null;
  duration: Duration;
  paymentMethod: PaymentMethod | null;
  onBack: () => void;
  onSubscribe: () => void;
}

export default function SummaryStep({
  selectedPlan,
  duration,
  paymentMethod,
  onBack,
  onSubscribe
}: SummaryStepProps) {
  const subtotal = selectedPlan
    ? duration === "MONTHLY"
      ? plans.find(p => p.name === selectedPlan)?.priceMonthly
      : plans.find(p => p.name === selectedPlan)?.priceAnnual
    : 0;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-[color:var(--authform-secondary-text,#fff)]">Resumo da Compra</h3>
      <p className="text-[color:var(--authform-muted,#9ca3af)]">Plano: {selectedPlan}</p>
      <p className="text-[color:var(--authform-muted,#9ca3af)]">Duração: {duration === "MONTHLY" ? "Mensal" : "Anual"}</p>
      <p className="text-[color:var(--authform-muted,#9ca3af)]">
        Método: {paymentMethod === "CREDIT" ? "Crédito" : paymentMethod === "DEBIT" ? "Débito" : "Pix"}
      </p>
      <p className="text-[color:var(--authform-primary,#059669)] font-bold">Subtotal: R$ {subtotal}</p>

      <div className="flex justify-between mt-4">
        <Button
          className="
    bg-[color:var(--authform-secondary-bg)]
    text-[color:var(--authform-secondary-text)]
    border border-[color:var(--authform-secondary-border)]
    hover:bg-[color:var(--authform-secondary-hover-bg)]
    hover:text-[color:var(--authform-secondary-hover-text)]
  "
          onClick={onBack}
        >
          Voltar
        </Button>

        <Button
          className="
    bg-[color:var(--authform-primary-bg)]
    text-[color:var(--authform-primary-text)]
    hover:bg-[color:var(--authform-primary-hover-bg)]
    hover:text-[color:var(--authform-primary-hover-text)]
    disabled:bg-[color:var(--authform-disabled-bg)]
    disabled:text-[color:var(--authform-disabled-text)]
  "
          onClick={onSubscribe}
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
}