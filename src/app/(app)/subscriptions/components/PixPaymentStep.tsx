import { Duration, SubscriptionPlan } from "@/types";
import { Button } from "@/components/ui/button";
import { plans } from "./SubscriptionPlans";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

interface PixPaymentStepProps {
    duration: Duration;
    selectedPlan: SubscriptionPlan | null;
    onBack: () => void;
    onNext: () => void;
}

export default function PixPaymentStep({
    duration,
    selectedPlan,
    onBack,
    onNext
}: PixPaymentStepProps) {
    const subtotal = selectedPlan
        ? duration === "MONTHLY"
            ? plans.find(p => p.name === selectedPlan)?.priceMonthly
            : plans.find(p => p.name === selectedPlan)?.priceAnnual
        : 0;

    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                const pixPayload = generatePixPayload(subtotal || 0, selectedPlan || "FREE");

                const url = await QRCode.toDataURL(pixPayload, {
                    width: 200,
                    margin: 2,
                    color: {
                        dark: "#000000",
                        light: "#FFFFFF"
                    }
                });
                setQrCodeDataUrl(url);
            } catch (error) {
                console.error("Erro ao gerar QR code:", error);
                setQrCodeDataUrl("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");
            }
        };

        generateQRCode();
    }, [subtotal, selectedPlan]);

    const generatePixPayload = (amount: number, plan: SubscriptionPlan): string => {
        const merchantName = "CourseKeeper";
        const merchantCity = "Itapetininga";
        const transactionId = Math.random().toString(36).substring(2, 15);

        return `00020126580014br.gov.bcb.pix0136${transactionId}0207PAGAMENTO520400005303986540${amount.toFixed(2)}5802BR5913${merchantName}6008${merchantCity}62360532${plan}6304`;
    };

    return (
        <div className="text-center space-y-4">
            <h3 className="text-sm font-medium text-[color:var(--authform-muted,#9ca3af)]">Pagamento via Pix</h3>

            {/* QR Code Real */}
            {qrCodeDataUrl ? (
                <div className="w-48 h-48 bg-[color:var(--authform-card-bg,#fff)] mx-auto p-4 rounded-lg border-2 border-[color:var(--authform-muted,#9ca3af)] flex items-center justify-center">
                    <Image
                        src={qrCodeDataUrl}
                        alt="QR Code PIX"
                        width={192}
                        height={192}
                        unoptimized
                        className="w-full h-full"
                    />
                </div>
            ) : (
                <div className="w-48 h-48 bg-[color:var(--authform-card-bg,#e5e7eb)] mx-auto rounded-lg animate-pulse flex items-center justify-center">
                    <span className="text-[color:var(--authform-muted,#6b7280)]">Gerando QR Code...</span>
                </div>
            )}

            <p className="text-[color:var(--authform-muted,#9ca3af)] text-sm">
                Escaneie o QR code com seu app bancário para pagar
            </p>

            <p className="text-[color:var(--authform-secondary-text,#fff)] font-semibold">Valor: R$ {subtotal}</p>

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
                >
                    Próximo
                </Button>
            </div>
        </div>
    );
}