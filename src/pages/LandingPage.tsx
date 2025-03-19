import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Brain, ChevronRight } from "lucide-react";
import Logo from "@/components/ui/logo";
import LoginDialog from "@/components/auth/login-dialog";

const LandingPage: React.FC = () => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  const pricingPlans = [
    {
      name: "Básico",
      price: "Grátis",
      features: [
        "Acesso limitado a ferramentas",
        "Suporte da comunidade",
      ],
      cta: "Começar",
    },
    {
      name: "Profissional",
      price: "R$ 49/mês",
      features: [
        "Acesso completo a ferramentas",
        "Suporte prioritário",
        "Geração de documentos ilimitada",
      ],
      cta: "Experimentar",
    },
    {
      name: "Avançado",
      price: "R$ 99/mês",
      features: [
        "Todos os recursos do plano Profissional",
        "Análise preditiva de casos",
        "Consultoria jurídica personalizada",
      ],
      cta: "Experimentar",
    },
  ];

  const features = [
    {
      title: "Geração de Petições",
      description: "Crie petições personalizadas de forma rápida e fácil.",
      icon: Brain,
    },
    {
      title: "Análise de Casos",
      description: "Analise casos complexos com o auxílio da inteligência artificial.",
      icon: Brain,
    },
    {
      title: "Gestão de Clientes",
      description: "Gerencie seus clientes e processos em um só lugar.",
      icon: Brain,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/sobre" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Sobre
            </Link>
            <Link to="/recursos" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Recursos
            </Link>
            <Link to="/precos" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Preços
            </Link>
            <Button
              variant="outline"
              onClick={() => setLoginDialogOpen(true)}
              className="text-sm font-medium"
            >
              Entrar
            </Button>
            <Link to="/signup">
              <Button className="text-sm font-medium">Começar agora</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Login Dialog */}
      <LoginDialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen} />

      {/* Hero Section */}
      <section className="py-24 bg-gray-50">
        <div className="container grid items-center gap-6 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold tracking-tighter">
                Simplifique sua prática jurídica com IA
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed">
                A plataforma que usa inteligência artificial para otimizar seu tempo e aumentar sua eficiência.
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/signup">
                <Button size="lg">Começar agora</Button>
              </Link>
              <Button variant="outline" size="lg">
                Conheça os recursos
              </Button>
            </div>
          </div>
          <img
            src="/hero-image.png"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center w-full"
            alt="Hero Image"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container">
          <h2 className="mb-8 text-3xl font-semibold text-center">
            Recursos inteligentes para advogados modernos
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="border-none shadow-md">
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-100">
        <div className="container">
          <h2 className="mb-8 text-3xl font-semibold text-center">
            Escolha o plano perfeito para você
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className="border-none shadow-md">
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="text-2xl font-bold">{plan.price}</p>
                  <Separator />
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup">
                    <Button className="w-full">{plan.cta}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-white border-t">
        <div className="container text-center text-gray-500">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Advoc.AI. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
