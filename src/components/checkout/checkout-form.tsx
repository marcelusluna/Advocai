
import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useToast } from "@/hooks/use-toast";
import { PaymentSuccessView } from "./payment-success";
import { PlanSummary } from "./plan-summary";
import { CustomerInfoForm } from "./customer-info-form";
import { CardSection, cardElementOptions } from "./card-section";
import { FormActions } from "./form-actions";
import { Plan } from "@/utils/stripe-utils";
import { supabase } from "@/integrations/supabase/client";

interface CheckoutFormProps {
  onComplete: () => void;
  onProcessing: (processing: boolean) => void;
  planName: string;
  planPrice: string;
  planDetails?: Plan | null;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  onComplete,
  onProcessing,
  planName,
  planPrice,
  planDetails
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

      // Log dos detalhes do pagamento
      console.log(`Processing payment for plan ${planName} with paymentMethod ${paymentMethod.id}`);
      console.log(`Amount: ${planDetails?.price || 'N/A'} BRL`);
      console.log(`Plan Price ID: ${planDetails?.priceId || 'N/A'}`);

      // Em uma aplicação real, você enviaria este ID de método de pagamento para seu servidor
      // para criar uma assinatura ou uma intenção de pagamento
      console.log('Payment method created:', paymentMethod.id);

      // Aqui poderia ser feito uma chamada para o Edge Function que processa o pagamento
      // const { data, error: paymentError } = await supabase.functions.invoke('process-payment', {
      //   body: {
      //     paymentMethodId: paymentMethod.id,
      //     email,
      //     planId: planDetails?.id,
      //     priceId: planDetails?.priceId
      //   }
      // });
      
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

  // Checking if form is valid
  const isFormValid = !!cardName && !!email;

  if (success) {
    return <PaymentSuccessView onComplete={onComplete} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      {/* Resumo do plano */}
      <PlanSummary planName={planName} planPrice={planPrice} />
      
      {/* Formulário de dados do cliente */}
      <CustomerInfoForm 
        email={email}
        setEmail={setEmail}
        cardName={cardName}
        setCardName={setCardName}
        isProcessing={isProcessing}
      />
      
      {/* Seção do cartão de crédito */}
      <CardSection 
        isProcessing={isProcessing} 
        error={error} 
      />
      
      {/* Ações do formulário */}
      <FormActions 
        onCancel={() => onProcessing(false)}
        isProcessing={isProcessing}
        isFormValid={isFormValid}
        hasStripe={!!stripe}
      />
    </form>
  );
};

export default CheckoutForm;
