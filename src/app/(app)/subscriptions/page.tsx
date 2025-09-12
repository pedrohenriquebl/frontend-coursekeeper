"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

type SubscriptionPlan = "FREE" | "GOLD" | "PLATINUM";
type Duration = "MONTHLY" | "ANNUAL";

const plans = [
    {
        name: "FREE",
        title: "Free",
        priceMonthly: "R$ 0",
        priceAnnual: "R$ 0",
        features: ["Cursos ilimitados", "Até 2 metas simultâneas"],
    },
    {
        name: "GOLD",
        title: "Gold",
        priceMonthly: "R$ 9,99",
        priceAnnual: "R$ 99,98",
        features: ["Cursos ilimitados", "Até 10 metas simultâneas", "Relatórios personalizados"],
        popular: true,
    },
    {
        name: "PLATINUM",
        title: "Platinum",
        priceMonthly: "R$ 19,99",
        priceAnnual: "R$ 199,98",
        features: [
            "Cursos ilimitados",
            "Metas ilimitadas",
            "Relatórios personalizados",
            "IA para projeção de carreira",
        ],
    },
];

export default function SubscriptionsPage() {
    const [open, setOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
    const [duration, setDuration] = useState<Duration>("MONTHLY");
    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
    });
    // Simulação do plano atual
    const currentPlan: SubscriptionPlan = "FREE";

    const handleSubscribe = async () => {
        if (!selectedPlan) return;
        const payload = {
            subscriptionPlan: selectedPlan,
            duration,
            cardData,
        };

        console.log("Enviando para backend:", payload);

        // Exemplo: chamada API
        // await fetch("/api/subscriptions", { method: "POST", body: JSON.stringify(payload) });

        setOpen(false);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">Gerenciar Assinatura</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => {
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
                                <span className="font-bold text-lg text-white">{plan.priceMonthly}</span> / mês <br />
                                <span className="font-bold text-lg text-white">{plan.priceAnnual}</span> / ano
                            </p>

                            <ul className="mt-4 space-y-2 text-gray-300 text-sm flex-1">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx}>• {feature}</li>
                                ))}
                            </ul>

                            {isCurrent ? (
                                <Button disabled className="mt-6 bg-emerald-700 text-white cursor-default opacity-80">
                                    Plano Atual
                                </Button>
                            ) : plan.name !== "FREE" ? (
                                <Button
                                    onClick={() => {
                                        setSelectedPlan(plan.name as SubscriptionPlan);
                                        setOpen(true);
                                    }}
                                    className="mt-6 bg-emerald-600 hover:bg-emerald-700"
                                >
                                    Assinar
                                </Button>
                            ) : null}
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-md space-y-6">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white">
                            Assinar {selectedPlan}
                        </DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Escolha a duração e insira os dados de pagamento para confirmar sua assinatura.
                        </DialogDescription>
                    </DialogHeader>

                    {/* Seleção de Duração */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-300 mb-2">Duração</h3>
                        <RadioGroup
                            value={duration}
                            onValueChange={(val: Duration) => setDuration(val)}
                            className="space-y-3"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem id="monthly" value="MONTHLY" className="data-[state=checked]:bg-white data-[state=checked]:border-white" />
                                <Label htmlFor="monthly" className="text-gray-200 cursor-pointer">
                                    Mensal {selectedPlan ? `(${plans.find((p) => p.name === selectedPlan)?.priceMonthly})` : ""}
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem id="annual" value="ANNUAL" className="data-[state=checked]:bg-white data-[state=checked]:border-white" />
                                <Label htmlFor="annual" className="text-gray-200 cursor-pointer">
                                    Anual {selectedPlan ? `(${plans.find((p) => p.name === selectedPlan)?.priceAnnual})` : ""}
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Dados de Pagamento */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-300 mb-2">Pagamento</h3>
                        <div className="space-y-3">
                            <Input
                                placeholder="Número do Cartão"
                                className="bg-gray-900 border-gray-700 text-white"
                                value={cardData.number}
                                onChange={e => setCardData({ ...cardData, number: e.target.value })}
                            />
                            <Input
                                placeholder="Nome no Cartão"
                                className="bg-gray-900 border-gray-700 text-white"
                                value={cardData.name}
                                onChange={e => setCardData({ ...cardData, name: e.target.value })}
                            />
                            <div className="flex gap-3">
                                <Input
                                    placeholder="MM/AA"
                                    className="bg-gray-900 border-gray-700 text-white"
                                    value={cardData.expiry}
                                    onChange={e => setCardData({ ...cardData, expiry: e.target.value })}
                                />
                                <Input
                                    placeholder="CVC"
                                    className="bg-gray-900 border-gray-700 text-white"
                                    value={cardData.cvv}
                                    onChange={e => setCardData({ ...cardData, cvv: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Botão */}
                    <Button
                        onClick={handleSubscribe}
                        className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
                    >
                        Confirmar Assinatura
                    </Button>
                </DialogContent>

            </Dialog>
        </div>
    );
}
