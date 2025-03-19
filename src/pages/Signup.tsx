
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/ui/logo";
import { useAuth } from "@/contexts/auth-context";
import { Badge } from "@/components/ui/badge";

const signupSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const location = useLocation();
  const state = location.state as { planActivated?: boolean; planType?: "professional" | "advanced" } | undefined;
  
  const planActivated = state?.planActivated || false;
  const planType = state?.planType || "professional";
  
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    await signup(values.name, values.email, values.password, planType);
  };

  // Plan display information
  const planInfo = {
    professional: {
      name: "Profissional",
      color: "blue",
    },
    advanced: {
      name: "Avançado",
      color: "indigo",
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Criar conta</CardTitle>
            <CardDescription className="text-center">
              {planActivated ? (
                <div className="flex flex-col items-center space-y-2">
                  <span>Preencha os dados abaixo para concluir seu cadastro</span>
                  <Badge variant="outline" className={`bg-${planInfo[planType].color}-50 text-${planInfo[planType].color}-700 border-${planInfo[planType].color}-200`}>
                    Plano {planInfo[planType].name} selecionado
                  </Badge>
                </div>
              ) : (
                <span>É necessário selecionar um plano na página inicial primeiro</span>
              )}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {planActivated ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} />
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
                          <Input type="email" placeholder="seu@email.com" {...field} />
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
                          <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full mt-2">Criar conta</Button>
                </form>
              </Form>
            ) : (
              <div className="text-center py-4">
                <Link to="/">
                  <Button>Voltar para selecionar um plano</Button>
                </Link>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Já tem uma conta? <Link to="/login" className="text-primary hover:underline">Entrar</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
