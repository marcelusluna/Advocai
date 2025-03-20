
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";
import TrialRegistrationForm from "./trial-registration-form";
import { stripePromise } from "@/utils/stripe-utils";

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
