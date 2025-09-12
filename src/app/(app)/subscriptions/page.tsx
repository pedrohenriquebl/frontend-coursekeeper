"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

type SubscriptionPlan = "FREE" | "GOLD" | "PLATINUM";
type Duration = "MONTHLY" | "ANNUAL";
type PaymentMethod = "CREDIT" | "DEBIT" | "PIX";

const plans = [
    { name: "FREE", title: "Free", priceMonthly: 0, priceAnnual: 0, features: ["Cursos ilimitados", "Até 2 metas simultâneas"] },
    { name: "GOLD", title: "Gold", priceMonthly: 9.99, priceAnnual: 99.98, features: ["Cursos ilimitados", "Até 10 metas simultâneas", "Relatórios personalizados"], popular: true },
    { name: "PLATINUM", title: "Platinum", priceMonthly: 19.99, priceAnnual: 199.98, features: ["Cursos ilimitados", "Metas ilimitadas", "Relatórios personalizados", "IA para projeção de carreira"] },
];

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

export default function SubscriptionsPage() {
    const [open, setOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
    const [duration, setDuration] = useState<Duration>("MONTHLY");
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
    const [cardData, setCardData] = useState({ number: "", name: "", expiry: "", cvv: "" });
    const [errors, setErrors] = useState({ number: "", name: "", expiry: "", cvv: "" });
    const [currentPlan] = useState<SubscriptionPlan>("FREE");

    const subtotal = selectedPlan
        ? duration === "MONTHLY"
            ? plans.find(p => p.name === selectedPlan)?.priceMonthly
            : plans.find(p => p.name === selectedPlan)?.priceAnnual
        : 0;
   
    const handleCardChange = (field: "number" | "name" | "expiry" | "cvv", value: string) => {
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

    const handleNext = () => {
        if (step === 1 && !paymentMethod) return;
        if (step === 2 && (paymentMethod === "CREDIT" || paymentMethod === "DEBIT") && !isCardDataValid()) return;
        setStep(prev => prev + 1);
    };

    const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

    const handleSubscribe = () => {
        const payload = { plan: selectedPlan, duration, paymentMethod, cardData };
        console.log("Enviando para backend:", payload);
        setOpen(false);
        setStep(1);
        setPaymentMethod(null);
        setCardData({ number: "", name: "", expiry: "", cvv: "" });
        setErrors({ number: "", name: "", expiry: "", cvv: "" });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">Gerenciar Assinatura</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map(plan => {
                    const isCurrent = plan.name === currentPlan;
                    return (
                        <div
                            key={plan.name}
                            className={cn(
                                "relative flex flex-col rounded-2xl border p-6 shadow-lg transition-all duration-200",
                                plan.popular ? "border-yellow-500 bg-yellow-500/10" : "border-gray-700 bg-gray-800/60",
                                isCurrent ? "border-emerald-500 ring-2 ring-emerald-500" : "hover:border-emerald-500 hover:ring-2 hover:ring-emerald-500"
                            )}
                        >
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 bg-yellow-500 text-black rounded-full shadow font-bold">
                                    Mais Popular
                                </span>
                            )}
                            <h2 className={cn(
                                "text-xl font-bold text-center",
                                isCurrent ? "text-emerald-400" : "text-white"
                            )}>{plan.title}</h2>
                            <p className="text-gray-400 mt-2 text-center">
                                <span className="font-bold text-lg text-white">R$ {plan.priceMonthly}</span> / mês <br />
                                <span className="font-bold text-lg text-white">R$ {plan.priceAnnual}</span> / ano
                            </p>
                            <ul className="mt-4 space-y-2 text-gray-300 text-sm flex-1">
                                {plan.features.map((f, idx) => <li key={idx}>• {f}</li>)}
                            </ul>
                            {isCurrent ? (
                                <Button disabled className="mt-6 bg-emerald-700 text-white cursor-default opacity-80">Plano Atual</Button>
                            ) : plan.name !== "FREE" ? (
                                <Button onClick={() => { setSelectedPlan(plan.name as SubscriptionPlan); setOpen(true); }} className="mt-6 bg-emerald-600 hover:bg-emerald-700">Assinar</Button>
                            ) : null}
                        </div>
                    );
                })}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md space-y-6 bg-gray-900 text-white rounded-2xl border border-gray-700">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">{selectedPlan}</DialogTitle>
                        <DialogDescription className="text-gray-300">Finalize a assinatura escolhendo a forma de pagamento.</DialogDescription>
                    </DialogHeader>
                    
                    {step === 1 && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-300">Duração</h3>
                            <RadioGroup value={duration} onValueChange={(val: Duration) => setDuration(val)} className="space-y-2">
                                {["MONTHLY", "ANNUAL"].map(d => (
                                    <div key={d} className="flex items-center space-x-2">
                                        <RadioGroupItem id={d} value={d} className="data-[state=checked]:bg-white data-[state=checked]:border-white" />
                                        <Label htmlFor={d} className="text-gray-200 cursor-pointer">
                                            {d === "MONTHLY" ? `Mensal (R$ ${selectedPlan ? plans.find(p => p.name === selectedPlan)?.priceMonthly : 0})`
                                                : `Anual (R$ ${selectedPlan ? plans.find(p => p.name === selectedPlan)?.priceAnnual : 0})`}
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
                                        onClick={() => setPaymentMethod(m as PaymentMethod)}
                                    >
                                        {m === "CREDIT" ? "Crédito" : m === "DEBIT" ? "Débito" : "Pix"}
                                    </Button>
                                ))}
                            </div>

                            <div className="flex justify-between mt-4">
                                <div />
                                <Button
                                    className={cn("bg-emerald-600 hover:bg-emerald-700", !paymentMethod && "opacity-50 cursor-not-allowed")}
                                    onClick={handleNext}
                                    disabled={!paymentMethod}
                                >
                                    Próximo
                                </Button>
                            </div>
                        </div>
                    )}
                    
                    {(step === 2 && (paymentMethod === "CREDIT" || paymentMethod === "DEBIT")) && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium text-gray-300">Dados do Cartão</h3>
                            <div>
                                <Input
                                    placeholder="Número do Cartão"
                                    value={cardData.number}
                                    onChange={e => handleCardChange("number", e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-white"
                                />
                                {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                            </div>
                            <div>
                                <Input
                                    placeholder="Nome no Cartão"
                                    value={cardData.name}
                                    onChange={e => handleCardChange("name", e.target.value)}
                                    className="bg-gray-800 border-gray-700 text-white"
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
                                <Button className="bg-gray-800 text-white border border-gray-700 hover:bg-emerald-600 hover:text-white" onClick={handleBack}>Voltar</Button>
                                <Button
                                    className={cn("bg-emerald-600 hover:bg-emerald-700", !isCardDataValid() && "opacity-50 cursor-not-allowed")}
                                    onClick={handleNext}
                                    disabled={!isCardDataValid()}
                                >
                                    Próximo
                                </Button>
                            </div>
                        </div>
                    )}
                    
                    {(step === 2 && paymentMethod === "PIX") && (
                        <div className="text-center space-y-4">
                            <h3 className="text-sm font-medium text-gray-300">Pagamento via Pix</h3>
                            <div className="w-40 h-40 bg-white mx-auto flex items-center justify-center text-gray-900 font-bold text-lg">QR CODE</div>
                            <p className="text-gray-300 font-semibold">Subtotal: R$ {subtotal}</p>
                            <div className="flex justify-between mt-4">
                                <Button className="bg-gray-800 text-white border border-gray-700 hover:bg-emerald-600 hover:text-white" onClick={handleBack}>Voltar</Button>
                                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleNext}>Próximo</Button>
                            </div>
                        </div>
                    )}
                   
                    {step === 3 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold">Resumo da Compra</h3>
                            <p className="text-gray-300">Plano: {selectedPlan}</p>
                            <p className="text-gray-300">Duração: {duration === "MONTHLY" ? "Mensal" : "Anual"}</p>
                            <p className="text-gray-300">Método: {paymentMethod === "CREDIT" ? "Crédito" : paymentMethod === "DEBIT" ? "Débito" : "Pix"}</p>
                            <p className="text-gray-300 font-bold">Subtotal: R$ {subtotal}</p>

                            <div className="flex justify-between mt-4">
                                <Button className="bg-gray-800 text-white border border-gray-700 hover:bg-emerald-600 hover:text-white" onClick={handleBack}>Voltar</Button>
                                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSubscribe}>Finalizar Compra</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
