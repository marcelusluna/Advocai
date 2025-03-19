
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, CheckCircle2 } from "lucide-react";

// Form validation schema
const checkoutFormSchema = z.object({
  cardNumber: z.string().min(16, "Número do cartão deve ter pelo menos 16 dígitos"),
  cardName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  expiry: z.string().min(5, "Data de validade deve estar no formato MM/AA"),
  cvc: z.string().min(3, "CVC deve ter pelo menos 3 dígitos"),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: "professional" | "advanced";
}

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ open, onOpenChange, plan }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const planDetails = {
    professional: {
      name: "Profissional",
      price: "R$149,90",
    },
    advanced: {
      name: "Avançado",
      price: "R$249,90",
    },
  };

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvc: "",
    },
  });

  const onSubmit = (data: CheckoutFormValues) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      
      toast({
        title: "Pagamento aprovado!",
        description: `Plano ${planDetails[plan].name} ativado com sucesso.`,
      });

      // After a brief delay, proceed to signup
      setTimeout(() => {
        navigate("/signup", { state: { planActivated: true, planType: plan } });
      }, 2000);
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Finalizar assinatura</DialogTitle>
          <DialogDescription>
            Plano {planDetails[plan].name} - {planDetails[plan].price}/mês
          </DialogDescription>
        </DialogHeader>

        {!isCompleted ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número do cartão</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="1234 5678 9012 3456"
                          {...field}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            field.onChange(formatted);
                          }}
                          className="pl-10"
                          maxLength={19}
                        />
                        <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome no cartão</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de validade</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="MM/AA" 
                          {...field} 
                          onChange={(e) => {
                            const formatted = formatExpiry(e.target.value);
                            field.onChange(formatted);
                          }}
                          maxLength={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVC</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="123" 
                          {...field} 
                          type="text" 
                          maxLength={4}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="mt-6">
                <Button type="submit" disabled={isProcessing}>
                  {isProcessing ? "Processando..." : "Finalizar pagamento"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Pagamento aprovado</h3>
            <p className="text-center text-gray-500 mb-4">
              Você será redirecionado para finalizar seu cadastro.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
