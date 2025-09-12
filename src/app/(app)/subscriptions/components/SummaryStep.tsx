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
      <h3 className="text-lg font-bold">Resumo da Compra</h3>
      <p className="text-gray-300">Plano: {selectedPlan}</p>
      <p className="text-gray-300">Duração: {duration === "MONTHLY" ? "Mensal" : "Anual"}</p>
      <p className="text-gray-300">
        Método: {paymentMethod === "CREDIT" ? "Crédito" : paymentMethod === "DEBIT" ? "Débito" : "Pix"}
      </p>
      <p className="text-gray-300 font-bold">Subtotal: R$ {subtotal}</p>

      <div className="flex justify-between mt-4">
        <Button 
          className="bg-gray-800 text-white border border-gray-700 hover:bg-emerald-600 hover:text-white" 
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700" 
          onClick={onSubscribe}
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
}