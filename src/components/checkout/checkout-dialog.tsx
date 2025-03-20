
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Calendar, Lock } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe("pk_test_YOUR_PUBLISHABLE_KEY"); // Replace with your Stripe publishable key

interface CheckoutFormProps {
  onComplete: () => void;
  onProcessing: (processing: boolean) => void;
  planName: string;
  planPrice: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onComplete,
  onProcessing,
  planName,
  planPrice
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardName, setCardName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    if (!cardName) {
      setError("Por favor, informe o nome no cartão.");
      return;
    }

    onProcessing(true);
    setError(null);
    
    try {
      // Get a reference to the CardElement
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error("Não foi possível processar o pagamento.");
      }

      // Create payment method using the card element
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: cardName,
        },
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      // In a real application, you would send this payment method ID to your server
      // to create a subscription or a payment intent
      console.log('Payment method created:', paymentMethod.id);

      // For demo purposes, we'll simulate a successful payment
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Pagamento aprovado",
        description: "Seu pagamento foi processado com sucesso.",
      });
      
      onComplete();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro no processamento do pagamento";
      setError(errorMessage);
      toast({
        title: "Erro no pagamento",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      onProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="font-medium">Plano:</span>
          <span>{planName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Valor:</span>
          <span className="font-bold">{planPrice}</span>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardName">Nome no cartão</Label>
            <Input
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Nome como aparece no cartão"
              disabled={!stripe}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Dados do cartão</Label>
            <div className="border rounded-md p-3 bg-white">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onProcessing(false)}
          disabled={!stripe}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={!stripe}>
          Finalizar pagamento
        </Button>
      </DialogFooter>
    </form>
  );
};

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
      <DialogContent className="sm:max-w-[425px]">
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
