
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
      <h3 className="text-sm font-medium text-[color:var(--authform-muted,#9ca3af)]">Duração</h3>
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
              className="data-[state=checked]:bg-[color:var(--authform-primary,#059669)] data-[state=checked]:border-[color:var(--authform-primary-dark,#047857)]"
            />
            <Label htmlFor={d} className="text-[color:var(--authform-muted,#9ca3af)] cursor-pointer">
              {d === "MONTHLY" ? "Mensal" : "Anual"}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <h3 className="text-sm font-medium text-[color:var(--authform-muted,#9ca3af)] mt-4">Método de Pagamento</h3>
      <div className="flex gap-3">
        {["CREDIT", "DEBIT", "PIX"].map(m => (
          <Button
            key={m}
            className={cn("btn-payment", paymentMethod === m && "btn-payment-active")}
            onClick={() => onPaymentMethodChange(m as PaymentMethod)}
          >
            {m === "CREDIT" ? "Crédito" : m === "DEBIT" ? "Débito" : "Pix"}
          </Button>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <div />
        <Button
          className={cn("bg-[color:var(--authform-primary,#059669)] hover:bg-[color:var(--authform-primary-dark,#047857)]", !paymentMethod && "opacity-50 cursor-not-allowed")}
          onClick={onNext}
          disabled={!paymentMethod}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}