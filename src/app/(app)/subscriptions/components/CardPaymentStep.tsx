import { useState } from "react";
import { Duration, SubscriptionPlan, CardData, CardErrors } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { plans } from "./SubscriptionPlans";

interface CardPaymentStepProps {
  duration: Duration;
  selectedPlan: SubscriptionPlan | null;
  onBack: () => void;
  onNext: () => void;
}

const formatCardNumber = (value: string) => {
  return value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
};

const formatExpiry = (value: string) => {
  const cleaned = value.replace(/\D/g, "").slice(0, 4);
  if (cleaned.length <= 2) return cleaned;
  return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
};

export default function CardPaymentStep({
  duration,
  selectedPlan,
  onBack,
  onNext
}: CardPaymentStepProps) {
  const [cardData, setCardData] = useState<CardData>({ number: "", name: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState<CardErrors>({ number: "", name: "", expiry: "", cvv: "" });

  const subtotal = selectedPlan
    ? duration === "MONTHLY"
      ? plans.find(p => p.name === selectedPlan)?.priceMonthly
      : plans.find(p => p.name === selectedPlan)?.priceAnnual
    : 0;

  const handleCardChange = (field: keyof CardData, value: string) => {
    if (field === "number") value = formatCardNumber(value);
    if (field === "expiry") value = formatExpiry(value);

    setCardData(prev => ({ ...prev, [field]: value }));

    let error = "";
    switch (field) {
      case "number":
        const numOnly = value.replace(/\s/g, "");
        if (!/^\d*$/.test(numOnly)) error = "Apenas números";
        else if (numOnly.length < 16) error = "Número incompleto";
        break;
      case "name":
        if (!/^[a-zA-Z ]*$/.test(value)) error = "Apenas letras";
        break;
      case "expiry":
        if (!/^\d{2}\/\d{2}$/.test(value)) error = "Formato MM/AA";
        break;
      case "cvv":
        if (!/^\d{3,4}$/.test(value)) error = "3 ou 4 dígitos";
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const isCardDataValid = () => {
    return cardData.number.replace(/\s/g, "").length === 16 &&
      /^[a-zA-Z ]+$/.test(cardData.name) &&
      /^\d{2}\/\d{2}$/.test(cardData.expiry) &&
      /^\d{3,4}$/.test(cardData.cvv);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-[color:var(--authform-muted,#9ca3af)]">Dados do Cartão</h3>
      <div>
        <Input
          placeholder="Número do Cartão"
          value={cardData.number}
          onChange={e => handleCardChange("number", e.target.value)}
          className="bg-[color:var(--authform-card-bg,rgba(55,65,81,0.5))] border-[color:var(--authform-muted,#9ca3af)] text-[color:var(--authform-primary,#059669)]"
        />
        {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
      </div>
      <div>
        <Input
          placeholder="Nome no Cartão"
          value={cardData.name}
          onChange={e => handleCardChange("name", e.target.value)}
          className="bg-[color:var(--authform-card-bg,rgba(55,65,81,0.5))] border-[color:var(--authform-muted,#9ca3af)] text-[color:var(--authform-primary,#059669)]"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            placeholder="MM/AA"
            value={cardData.expiry}
            onChange={e => handleCardChange("expiry", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
          {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
        </div>
        <div className="flex-1">
          <Input
            placeholder="CVC"
            value={cardData.cvv}
            onChange={e => handleCardChange("cvv", e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
          {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
        </div>
      </div>
      <p className="text-gray-300 font-semibold">Subtotal: R$ {subtotal}</p>

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
          onClick={onNext}
          disabled={!isCardDataValid()}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}