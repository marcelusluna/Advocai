
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";
import TrialRegistrationForm from "./trial-registration-form";
import { stripePromise, getPlanDetails, Plan } from "@/utils/stripe-utils";

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
  const [planDetails, setPlanDetails] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        if (isOpen) {
          const details = await getPlanDetails(planName);
          console.log("Detalhes do plano carregados:", details);
          setPlanDetails(details);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do plano:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlanData();
  }, [isOpen, planName]);

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

        {loading ? (
          <div className="py-4 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : (
          <Elements stripe={stripePromise}>
            <TrialRegistrationForm 
              planName={planName}
              onComplete={onComplete}
              onCancel={onClose}
              planDetails={planDetails}
            />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TrialRegistrationDialog;
