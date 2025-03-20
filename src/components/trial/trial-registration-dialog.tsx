
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import TrialRegistrationForm from "./trial-registration-form";

// Inicializa o Stripe com a chave publicável fornecida
const stripePromise = loadStripe("pk_live_51R4id2RtWossoVT0xB9yFMhDr2HTyclYcyKIO4HsRHEe2LxwbN9wAq1TJ4YCv2VFyJAjrKDq9x0KCHgT0XTG24WA00c8ieDbkf");

interface TrialRegistrationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  planName: string;
}

const TrialRegistrationDialog: React.FC<TrialRegistrationDialogProps> = ({
  isOpen,
  onClose,
  onComplete,
  planName,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Comece seu período de teste de 14 dias</DialogTitle>
          <DialogDescription>
            Crie sua conta e cadastre seu cartão para começar a usar o {planName} gratuitamente por 14 dias. 
            Após o período de teste, você será cobrado automaticamente.
          </DialogDescription>
        </DialogHeader>

        <Elements stripe={stripePromise}>
          <TrialRegistrationForm 
            planName={planName}
            onComplete={onComplete}
            onCancel={onClose}
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default TrialRegistrationDialog;
