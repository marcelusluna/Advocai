
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/auth-context";
import { Mail, Lock, User } from "lucide-react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useToast } from "@/hooks/use-toast";
import { Plan } from "@/utils/stripe-utils";

const trialSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string().min(6, { message: "Confirme a senha" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type TrialFormValues = z.infer<typeof trialSchema>;

interface TrialRegistrationFormProps {
  planName: string;
  onComplete: () => void;
  onCancel: () => void;
  planDetails: Plan | null;
}

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

const TrialRegistrationForm: React.FC<TrialRegistrationFormProps> = ({
  planName,
  onComplete,
  onCancel,
  planDetails
}) => {
  const { signup } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const form = useForm<TrialFormValues>({
    resolver: zodResolver(trialSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: TrialFormValues) => {
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setCardError(null);

    try {
      // Validar o cartão
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error("Não foi possível processar o cartão");
      }

      // Criar método de pagamento (que será usado para cobranças futuras)
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: values.name,
          email: values.email,
        },
      });
      
      if (pmError) {
        throw new Error(pmError.message);
      }

      // Em uma aplicação real, enviaríamos o ID do método de pagamento para o backend
      // para criar uma assinatura com período de teste
      console.log('Payment method created:', paymentMethod.id);
      console.log(`Trial period: ${planDetails?.trialPeriodDays} days for plan ${planName}`);
      
      // Registrar o usuário com os dados do plano e método de pagamento
      await signup(
        values.name, 
        values.email, 
        values.password, 
        planName,
        paymentMethod.id
      );
      
      toast({
        title: "Registro concluído",
        description: `Sua conta foi criada com sucesso e seu período de teste de ${planDetails?.trialPeriodDays} dias começou.`,
      });
      
      onComplete();

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao processar o pagamento";
      setCardError(errorMessage);
      toast({
        title: "Erro no cadastro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Informações do usuário */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      {...field} 
                      placeholder="Seu nome" 
                      className="pl-10" 
                      disabled={isProcessing}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      {...field} 
                      placeholder="seu@email.com" 
                      type="email" 
                      className="pl-10"
                      disabled={isProcessing}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      {...field} 
                      placeholder="******" 
                      type="password" 
                      className="pl-10"
                      disabled={isProcessing}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      {...field} 
                      placeholder="******" 
                      type="password" 
                      className="pl-10"
                      disabled={isProcessing}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Informações de pagamento */}
        <div className="mt-6 space-y-2">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-3 mb-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Plano:</span>
              <span className="font-semibold">{planName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Período de teste:</span>
              <span className="font-semibold">{planDetails?.trialPeriodDays || 14} dias grátis</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Valor após o período de teste:</span>
              <span className="font-semibold text-primary">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(planDetails?.price || 0)}/mês
              </span>
            </div>
          </div>

          <div>
            <FormLabel>Dados do cartão (será cobrado após o período de teste)</FormLabel>
            <div className={`bg-white border rounded-md p-4 transition-all ${isProcessing ? 'opacity-50' : ''} focus-within:ring-2 focus-within:ring-primary focus-within:ring-opacity-40`}>
              <CardElement options={cardElementOptions} />
            </div>
            
            <div className="flex items-center text-xs text-gray-500 mt-2">
              <Lock className="h-3 w-3 mr-1" />
              <span>Seus dados estão seguros e criptografados</span>
            </div>
            
            {cardError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm flex items-start mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{cardError}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isProcessing}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="flex-1"
            disabled={isProcessing || !stripe}
          >
            {isProcessing ? "Processando..." : "Iniciar período de teste"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TrialRegistrationForm;
