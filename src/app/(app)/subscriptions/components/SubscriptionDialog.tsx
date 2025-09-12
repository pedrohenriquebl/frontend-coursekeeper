import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import DurationStep from "./DurationStep";
import CardPaymentStep from "./CardPaymentStep";
import PixPaymentStep from "./PixPaymentStep";
import SummaryStep from "./SummaryStep";
import { Duration, PaymentMethod, SubscriptionDialogProps } from "@/types";

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
        const payload = { plan: selectedPlan, duration, paymentMethod };
        console.log("Enviando para backend:", payload);
        
        if (onSubscriptionSuccess && selectedPlan) {
            onSubscriptionSuccess(selectedPlan);
        }

        handleClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-w-md space-y-6 bg-gray-900 text-white rounded-2xl border border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{selectedPlan}</DialogTitle>
                    <DialogDescription className="text-gray-300">
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