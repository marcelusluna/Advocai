
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout-form";
import { stripePromise } from "@/utils/stripe-utils";

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
