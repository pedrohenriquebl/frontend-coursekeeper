import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import DurationStep from "./DurationStep";
import CardPaymentStep from "./CardPaymentStep";
import PixPaymentStep from "./PixPaymentStep";
import SummaryStep from "./SummaryStep";
import { Duration, PaymentMethod, SubscriptionDialogProps, SubscriptionPlan } from "@/types";
import { cn } from "@/lib/utils";

export default function SubscriptionDialog({
    open,
    onOpenChange,
    selectedPlan,
    onSubscriptionSuccess
}: SubscriptionDialogProps) {
    const [duration, setDuration] = useState<Duration>("MONTHLY");
    const [step, setStep] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);

    const handleClose = () => {
        onOpenChange(false);
        setStep(1);
        setPaymentMethod(null);
    };

    const handleSubscribe = () => {
        if (onSubscriptionSuccess && selectedPlan) {
            onSubscriptionSuccess(selectedPlan);
        }

        handleClose();
    };

    const getPlanTitleColor = (plan: SubscriptionPlan | null) => {
        switch (plan) {
            case "FREE":
                return "text-blue-400";
            case "GOLD":
                return "text-yellow-400";
            case "PLATINUM":
                return "text-purple-400";
            default:
                return "text-white";
        }
    };

    const getPlanFriendlyName = (plan: SubscriptionPlan | null) => {
        switch (plan) {
            case "FREE":
                return "Free";
            case "GOLD":
                return "Gold";
            case "PLATINUM":
                return "Platinum";
            default:
                return "Plano";
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md space-y-6 bg-[color:var(--modal-bg,#111827)] text-white rounded-2xl border-[color:var(--modal-border,#374151)]">
                <DialogHeader>
                    <DialogTitle className={cn(
                        "text-2xl font-bold",
                        getPlanTitleColor(selectedPlan)
                    )}>
                        {getPlanFriendlyName(selectedPlan)}
                    </DialogTitle>
                    <DialogDescription className="text-[color:var(--authform-muted,#9ca3af)]">
                        Finalize a assinatura escolhendo a forma de pagamento.
                    </DialogDescription>
                </DialogHeader>

                {step === 1 && (
                    <DurationStep
                        duration={duration}
                        onDurationChange={setDuration}
                        paymentMethod={paymentMethod}
                        onPaymentMethodChange={setPaymentMethod}
                        onNext={() => setStep(2)}
                    />
                )}

                {step === 2 && (paymentMethod === "CREDIT" || paymentMethod === "DEBIT") && (
                    <CardPaymentStep
                        duration={duration}
                        selectedPlan={selectedPlan}
                        onBack={() => setStep(1)}
                        onNext={() => setStep(3)}
                    />
                )}

                {step === 2 && paymentMethod === "PIX" && (
                    <PixPaymentStep
                        duration={duration}
                        selectedPlan={selectedPlan}
                        onBack={() => setStep(1)}
                        onNext={() => setStep(3)}
                    />
                )}

                {step === 3 && (
                    <SummaryStep
                        selectedPlan={selectedPlan}
                        duration={duration}
                        paymentMethod={paymentMethod}
                        onBack={() => setStep(2)}
                        onSubscribe={handleSubscribe}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
}