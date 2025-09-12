
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Duration, PaymentMethod } from "@/types";

interface DurationStepProps {
  duration: Duration;
  onDurationChange: (duration: Duration) => void;
  paymentMethod: PaymentMethod | null;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onNext: () => void;
}

export default function DurationStep({
  duration,
  onDurationChange,
  paymentMethod,
  onPaymentMethodChange,
  onNext
}: DurationStepProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-300">Duração</h3>
      <RadioGroup 
        value={duration} 
        onValueChange={(val: Duration) => onDurationChange(val)} 
        className="space-y-2"
      >
        {["MONTHLY", "ANNUAL"].map(d => (
          <div key={d} className="flex items-center space-x-2">
            <RadioGroupItem 
              id={d} 
              value={d} 
              className="data-[state=checked]:bg-white data-[state=checked]:border-white" 
            />
            <Label htmlFor={d} className="text-gray-200 cursor-pointer">
              {d === "MONTHLY" ? "Mensal" : "Anual"}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <h3 className="text-sm font-medium text-gray-300 mt-4">Método de Pagamento</h3>
      <div className="flex gap-3">
        {["CREDIT", "DEBIT", "PIX"].map(m => (
          <Button
            key={m}
            className={cn(
              "bg-gray-800 text-white border border-gray-700 hover:bg-emerald-600 hover:text-white",
              paymentMethod === m && "bg-emerald-600 text-white border-emerald-600"
            )}
            onClick={() => onPaymentMethodChange(m as PaymentMethod)}
          >
            {m === "CREDIT" ? "Crédito" : m === "DEBIT" ? "Débito" : "Pix"}
          </Button>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <div />
        <Button
          className={cn("bg-emerald-600 hover:bg-emerald-700", !paymentMethod && "opacity-50 cursor-not-allowed")}
          onClick={onNext}
          disabled={!paymentMethod}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}