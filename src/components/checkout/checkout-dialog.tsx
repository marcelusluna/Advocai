
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout-form";

// Inicializa o Stripe com a chave publicável fornecida
const stripePromise = loadStripe("pk_live_51R4id2RtWossoVT0xB9yFMhDr2HTyclYcyKIO4HsRHEe2LxwbN9wAq1TJ4YCv2VFyJAjrKDq9x0KCHgT0XTG24WA00c8ieDbkf");

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  planName: string;
  planPrice: string;
}

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({
  isOpen,
  onClose,
  onComplete,
  planName,
  planPrice,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isProcessing && onClose()}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Finalizar compra</DialogTitle>
          <DialogDescription>
            Complete o pagamento para acessar o plano {planName}.
          </DialogDescription>
        </DialogHeader>
        
        <Elements stripe={stripePromise}>
          <CheckoutForm 
            onComplete={onComplete} 
            onProcessing={setIsProcessing}
            planName={planName}
            planPrice={planPrice}
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
