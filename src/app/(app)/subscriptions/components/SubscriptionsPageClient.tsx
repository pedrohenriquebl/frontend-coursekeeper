"use client";

import { useState } from "react";
import SubscriptionPlans from "./SubscriptionPlans";
import SubscriptionDialog from "./SubscriptionDialog";
import { Duration, SubscriptionPlan } from "@/types";
import ConfirmDowngradeModal from "./ConfirmDowngradeModal";
import { useSubscription } from "../hooks/useSubscription";
import { useAuthUser } from "@/context/authUserContext";

export default function SubscriptionsPageClient() {
    const [open, setOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
    const [showDowngradeModal, setShowDowngradeModal] = useState(false);
    const [downgradeTarget, setDowngradeTarget] = useState<SubscriptionPlan | null>(null);
    const { currentPlan, changeSubscription, isDowngrade } = useSubscription();
    const { user } = useAuthUser();

    console.log("User data in SubscriptionsPageClient:", user);

    const handlePlanSelection = (plan: SubscriptionPlan) => {
        if (isDowngrade(plan)) {
            setDowngradeTarget(plan);
            setShowDowngradeModal(true);
        } else {
            setSelectedPlan(plan);
            setOpen(true);
        }
    };

    const handleConfirmDowngrade = async () => {
        if (downgradeTarget) {
            try {
                if (downgradeTarget === "FREE") {
                    await changeSubscription("FREE");
                } else {
                    setSelectedPlan(downgradeTarget);
                    setOpen(true);
                }
            } catch (error) {
                console.error("Erro ao confirmar downgrade:", error);
            }
        }
        setShowDowngradeModal(false);
        setDowngradeTarget(null);
    };

    const handleCancelDowngrade = () => {
        setDowngradeTarget(null);
        setShowDowngradeModal(false);
    };

    const handleSubscriptionSuccess = async (
        newPlan: SubscriptionPlan,
        duration?: Duration
    ) => {
        try {
            await changeSubscription(newPlan, duration);
            setOpen(false);
        } catch (error) {
            console.error("Erro ao alterar assinatura:", error);
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mt-8 mb-16 text-center">
                Gerenciar Assinatura
            </h1>

            <SubscriptionPlans
                currentPlan={currentPlan}
                onSelectPlan={handlePlanSelection}
            />

            <SubscriptionDialog
                open={open}
                onOpenChange={setOpen}
                selectedPlan={selectedPlan}
                currentPlan={currentPlan}
                onSubscriptionSuccess={handleSubscriptionSuccess}
            />

            <ConfirmDowngradeModal
                show={showDowngradeModal}
                onConfirm={handleConfirmDowngrade}
                onCancel={handleCancelDowngrade}
                currentPlan={currentPlan}
                targetPlan={downgradeTarget || "FREE"}
            />
        </div>
    );
}