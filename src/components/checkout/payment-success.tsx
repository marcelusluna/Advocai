
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface PaymentSuccessViewProps {
  onComplete: () => void;
}

export const PaymentSuccessView: React.FC<PaymentSuccessViewProps> = ({ onComplete }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">Pagamento confirmado!</h3>
      <p className="text-center text-gray-600 mb-6">
        Seu pagamento foi processado com sucesso.
      </p>
      <Button onClick={onComplete} className="px-6">
        Continuar
      </Button>
    </div>
  );
};
