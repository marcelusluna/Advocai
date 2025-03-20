
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout-form";
import { stripePromise, getPlanDetails, formatPrice, Plan } from "@/utils/stripe-utils";

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  planName: string;
  planPrice?: string;
}

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({
  isOpen,
  onClose,
  onComplete,
  planName,
  planPrice,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [planDetails, setPlanDetails] = useState<Plan | null>(null);
  const [formattedPrice, setFormattedPrice] = useState<string>(planPrice || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const details = await getPlanDetails(planName);
        setPlanDetails(details);
        
        // Se não houver preço fornecido, use o preço do plano
        if (!planPrice) {
          setFormattedPrice(formatPrice(details.price));
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes do plano:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (isOpen) {
      fetchPlanData();
    }
  }, [isOpen, planName, planPrice]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && !isProcessing && onClose()}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Finalizar compra</DialogTitle>
          <DialogDescription>
            Complete o pagamento para acessar o plano {planName}.
          </DialogDescription>
        </DialogHeader>
        
        {loading ? (
          <div className="py-4 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : (
          <Elements stripe={stripePromise}>
            <CheckoutForm 
              onComplete={onComplete} 
              onProcessing={setIsProcessing}
              planName={planName}
              planPrice={formattedPrice}
              planDetails={planDetails}
            />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
