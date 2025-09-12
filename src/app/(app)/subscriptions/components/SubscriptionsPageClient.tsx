"use client";

import { useState } from "react";
import SubscriptionPlans from "./SubscriptionPlans";
import SubscriptionDialog from "./SubscriptionDialog";
import { SubscriptionPlan } from "@/types";

export default function SubscriptionsPageClient() {
  const [open, setOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [currentPlan] = useState<SubscriptionPlan>("FREE");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mt-8 mb-16 text-center">
        Gerenciar Assinatura
      </h1>

      <SubscriptionPlans
        currentPlan={currentPlan}
        onSelectPlan={(plan) => {
          setSelectedPlan(plan);
          setOpen(true);
        }}
      />

      <SubscriptionDialog
        open={open}
        onOpenChange={setOpen}
        selectedPlan={selectedPlan}
        currentPlan={currentPlan}
      />
    </div>
  );
}