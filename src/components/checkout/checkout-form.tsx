
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Lock, Mail } from "lucide-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentSuccessView } from "./payment-success";
import { getPlanDetails } from "@/utils/stripe-utils";

// Configurações visuais para o CardElement
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      fontFamily: 'Inter, system-ui, sans-serif',
      '::placeholder': {
        color: '#aab7c4',
      },
      iconColor: '#3b82f6',
    },
    invalid: {
      color: '#e11d48',
      iconColor: '#e11d48',
    },
  },
};

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
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js ainda não carregou
      return;
    }

    if (!cardName) {
      setError("Por favor, informe o nome no cartão.");
      return;
    }

    if (!email) {
      setError("Por favor, informe seu email.");
      return;
    }

    setIsProcessing(true);
    onProcessing(true);
    setError(null);
    
    try {
      // Obter uma referência ao CardElement
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error("Não foi possível processar o pagamento.");
      }

      // Criar método de pagamento usando o elemento de cartão
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: cardName,
          email: email,
        },
      });

      if (paymentMethodError) {
        throw new Error(paymentMethodError.message);
      }

      const planDetails = getPlanDetails(planName);
      console.log(`Processing payment for plan ${planName} with paymentMethod ${paymentMethod.id}`);
      console.log(`Amount: ${planDetails.price} BRL`);

      // Em uma aplicação real, você enviaria este ID de método de pagamento para seu servidor
      // para criar uma assinatura ou uma intenção de pagamento
      console.log('Payment method created:', paymentMethod.id);

      // Simulação de processamento de pagamento (em produção, isso seria uma chamada de API)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Configurar estado de sucesso
      setSuccess(true);
      
      toast({
        title: "Pagamento aprovado",
        description: "Seu pagamento foi processado com sucesso!",
      });
      
      // Esperar um momento para mostrar a animação de sucesso
      setTimeout(() => {
        onComplete();
      }, 1000);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro no processamento do pagamento";
      setError(errorMessage);
      toast({
        title: "Erro no pagamento",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      onProcessing(false);
    }
  };

  if (success) {
    return <PaymentSuccessView onComplete={onComplete} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      {/* Resumo do plano */}
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3 mb-2">
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Plano:</span>
          <span className="font-semibold">{planName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium text-gray-700">Valor:</span>
          <span className="text-xl font-bold text-primary">{planPrice}</span>
        </div>
      </div>
      
      {/* Formulário de pagamento */}
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700">Email</Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="pl-10"
              disabled={isProcessing}
              required
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardName" className="text-gray-700">Nome no cartão</Label>
          <div className="relative">
            <Input
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="Nome como aparece no cartão"
              className="pl-10"
              disabled={isProcessing}
            />
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="text-gray-700">Dados do cartão</Label>
          <div className={`bg-white border rounded-md p-4 transition-all ${isProcessing ? 'opacity-50' : ''} focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-40`}>
            <CardElement options={cardElementOptions} />
          </div>
          
          <div className="flex items-center text-xs text-gray-500 mt-2">
            <Lock className="h-3 w-3 mr-1" />
            <span>Seus dados estão seguros e criptografados</span>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm flex items-start mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
      
      <DialogFooter className="pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            onProcessing(false);
          }}
          disabled={isProcessing}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          disabled={!stripe || isProcessing || !cardName || !email}
          className={`${isProcessing ? "bg-stripe-gradient bg-stripe-loading" : ""}`}
        >
          {isProcessing ? "Processando..." : "Finalizar pagamento"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default CheckoutForm;
