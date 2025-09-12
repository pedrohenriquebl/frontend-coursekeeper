import { Duration, SubscriptionPlan } from "@/types";
import { Button } from "@/components/ui/button";
import { plans } from "./SubscriptionPlans";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

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
      <h3 className="text-sm font-medium text-gray-300">Pagamento via Pix</h3>
      
      {/* QR Code Real */}
      {qrCodeDataUrl ? (
        <div className="w-48 h-48 bg-white mx-auto p-4 rounded-lg border-2 border-gray-300 flex items-center justify-center">
          <img 
            src={qrCodeDataUrl} 
            alt="QR Code PIX" 
            className="w-full h-full"
          />
        </div>
      ) : (
        <div className="w-48 h-48 bg-gray-200 mx-auto rounded-lg animate-pulse flex items-center justify-center">
          <span className="text-gray-500">Gerando QR Code...</span>
        </div>
      )}

      <p className="text-gray-400 text-sm">
        Escaneie o QR code com seu app bancário para pagar
      </p>
      
      <p className="text-gray-300 font-semibold">Valor: R$ {subtotal}</p>
      
      <div className="flex justify-between mt-4">
        <Button 
          className="bg-gray-800 text-white border border-gray-700 hover:bg-emerald-600 hover:text-white" 
          onClick={onBack}
        >
          Voltar
        </Button>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700" 
          onClick={onNext}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}