import { Duration, SubscriptionPlan } from "@/types";
import { Button } from "@/components/ui/button";
import { plans } from "./SubscriptionPlans";

interface PixPaymentStepProps {
  duration: Duration;
  selectedPlan: SubscriptionPlan | null;
  onBack: () => void;
  onNext: () => void;
}

export default function PixPaymentStep({
  duration,
  selectedPlan,
  onBack,
  onNext
}: PixPaymentStepProps) {
  const subtotal = selectedPlan
    ? duration === "MONTHLY"
      ? plans.find(p => p.name === selectedPlan)?.priceMonthly
      : plans.find(p => p.name === selectedPlan)?.priceAnnual
    : 0;

  return (
    <div className="text-center space-y-4">
      <h3 className="text-sm font-medium text-gray-300">Pagamento via Pix</h3>
      <div className="w-40 h-40 bg-white mx-auto flex items-center justify-center text-gray-900 font-bold text-lg">
        QR CODE
      </div>
      <p className="text-gray-300 font-semibold">Subtotal: R$ {subtotal}</p>
      <div className="flex justify-between mt-4">
        <Button 
          className="bg-gray-800 text-white border border-gray-700 hover:bg-emerald-600 hover:text-white" 
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700" 
          onClick={onNext}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}