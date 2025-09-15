
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plan, SubscriptionPlansProps } from "@/types";

export const plans: Plan[] = [
    { name: "FREE", title: "Free", priceMonthly: 0, priceAnnual: 0, features: ["Cursos ilimitados", "Até 2 metas simultâneas"] },
    { name: "GOLD", title: "Gold", priceMonthly: 9.99, priceAnnual: 99.98, features: ["Cursos ilimitados", "Até 10 metas simultâneas", "Relatórios personalizados"], popular: true },
    { name: "PLATINUM", title: "Platinum", priceMonthly: 19.99, priceAnnual: 199.98, features: ["Cursos ilimitados", "Metas ilimitadas", "Relatórios personalizados", "IA para projeção de carreira"] },
];

export default function SubscriptionPlans({ currentPlan, onSelectPlan }: SubscriptionPlansProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => {
                const isCurrent = plan.name === currentPlan;
                return (
                    <div
                        key={plan.name}
                        className={cn(
                            "relative flex flex-col rounded-2xl border p-6 shadow-lg transition-all duration-200",
                            plan.popular ? "border-[color:var(--plan-popular-border,#fbbf24)] bg-[color:var(--plan-popular-bg,rgba(251,191,36,0.1))]" : "border-[color:var(--plan-card-border,#374151)] bg-[color:var(--plan-card-bg,#1f2937)]",
                            isCurrent ? "border-[color:var(--plan-card-active,#059669)] ring-2 ring-[color:var(--plan-card-active,#059669)]" : "hover:border-[color:var(--plan-card-active,#059669)] hover:ring-2 hover:ring-[color:var(--plan-card-active,#059669)]"
                        )}
                    >
                        {plan.popular && (
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs px-3 py-1 bg-[color:var(--plan-popular-border,#fbbf24)] text-[color:var(--plan-popular-text,#000)] rounded-full shadow font-bold">
                                Mais Popular
                            </span>
                        )}
                        <h2 className={cn(
                            "text-xl font-bold text-center",
                            isCurrent ? "text-[color:var(--plan-card-active,#059669)]" : "text-[color:var(--plan-card-title,#fff)]"
                        )}>{plan.title}</h2>
                        <p className="text-[color:var(--plan-card-muted,#9ca3af)] mt-2 text-center">
                            <span className="font-bold text-lg text-[color:var(--plan-card-title,#fff)]">R$ {plan.priceMonthly}</span> / mês <br />
                            <span className="font-bold text-lg text-[color:var(--plan-card-title,#fff)]">R$ {plan.priceAnnual}</span> / ano
                        </p>
                        <ul className="mt-4 space-y-2 text-[color:var(--plan-card-muted,#9ca3af)] text-sm flex-1">
                            {plan.features.map((f, idx) => <li key={idx}>• {f}</li>)}
                        </ul>
                        {isCurrent ? (
                            <Button disabled className="mt-6 bg-[color:var(--plan-card-active,#059669)] text-[color:var(--plan-card-title,#fff)] cursor-default opacity-80">
                                Plano Atual
                            </Button>
                        ) : (
                            <Button
                                onClick={() => onSelectPlan(plan.name)}
                                className="mt-6 bg-[color:var(--plan-card-active,#059669)] hover:bg-[color:var(--plan-card-active-dark,#047857)] text-[color:var(--plan-card-title,#fff)]"
                            >
                                Assinar
                            </Button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}