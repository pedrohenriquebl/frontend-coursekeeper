"use client";

import { useState } from "react";
import SubscriptionPlans from "./SubscriptionPlans";
import SubscriptionDialog from "./SubscriptionDialog";
import { SubscriptionPlan } from "@/types";
import ConfirmDowngradeModal from "./ConfirmDowngradeModal";
import toast from "react-hot-toast";

export default function SubscriptionsPageClient() {
    const [open, setOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
    const [currentPlan] = useState<SubscriptionPlan>("PLATINUM");
    const [showDowngradeModal, setShowDowngradeModal] = useState(false);
    const [downgradeTarget, setDowngradeTarget] = useState<SubscriptionPlan | null>(null);

    const showSuccessToast = (newPlan: SubscriptionPlan) => {
        const planNames = {
            FREE: "Free",
            GOLD: "Gold",
            PLATINUM: "Platinum"
        };

        toast.success(`Plano alterado para ${planNames[newPlan]} com sucesso!`, {
            style: {
                background: "#2d3748",
                color: "#fff",
                border: "1px solid #10b981",
                padding: "16px 24px",
                borderRadius: "12px",
                fontWeight: "500",
            },
            iconTheme: {
                primary: "#10b981",
                secondary: "#ffffff",
            },
        });
    };

    function isDowngrade(current: SubscriptionPlan, target: SubscriptionPlan): boolean {
        const planHierarchy = ["FREE", "GOLD", "PLATINUM"];
        const currentIndex = planHierarchy.indexOf(current);
        const targetIndex = planHierarchy.indexOf(target);
        return targetIndex < currentIndex;
    }

    const handlePlanSelection = (plan: SubscriptionPlan) => {
        if (isDowngrade(currentPlan, plan)) {
            setDowngradeTarget(plan);
            setShowDowngradeModal(true);
        } else {
            setSelectedPlan(plan);
            setOpen(true);
        }
    };

    const handleConfirmDowngrade = () => {
        if (downgradeTarget) {
            if (downgradeTarget === "FREE") {
                console.log("Enviando para backend - Downgrade para FREE:", {
                    plan: "FREE",
                    duration: null,
                    paymentMethod: null
                });

                showSuccessToast("FREE");
            } else {
                setSelectedPlan(downgradeTarget);
                setOpen(true);
            }
        }
        setShowDowngradeModal(false);
        setDowngradeTarget(null);
    };

    const handleCancelDowngrade = () => {
        setDowngradeTarget(null);
        setShowDowngradeModal(false);
    };

    const handleSubscriptionSuccess = (newPlan: SubscriptionPlan) => {
        showSuccessToast(newPlan);
    };

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