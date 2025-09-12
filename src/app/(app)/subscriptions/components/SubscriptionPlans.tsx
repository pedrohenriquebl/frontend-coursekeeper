
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
              <Button 
                onClick={() => onSelectPlan(plan.name)} 
                className="mt-6 bg-emerald-600 hover:bg-emerald-700"
              >
                Assinar
              </Button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}