
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, FileText, Users, DollarSign, Shield, BrainCircuit } from "lucide-react";
import Logo from "@/components/ui/logo";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navbar */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo className="flex-row !gap-4" size="sm" />
            </div>
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" size="sm">Entrar</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Criar conta</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
                Transforme seu escritório de advocacia com inteligência artificial
              </h1>
              <p className="text-lg text-gray-600">
                A plataforma SaaS definitiva para gestão completa de clientes, processos 
                e documentos jurídicos em um só lugar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Comece agora
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Já tenho uma conta
                  </Button>
                </Link>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/c00e8e22-2552-42f7-a22a-8b0f08c510a8.png" 
                alt="Advoc.AI Dashboard" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Recursos projetados para impulsionar seu escritório
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Tecnologia de ponta a serviço da advocacia moderna
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Automação de documentos"
              description="Gere petições automaticamente com IA, economizando horas de trabalho manual."
            />
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-primary" />}
              title="CRM jurídico"
              description="Organize clientes e processos em uma interface intuitiva e completa."
            />
            <FeatureCard 
              icon={<DollarSign className="h-10 w-10 text-primary" />}
              title="Gestão de honorários"
              description="Simplifique o controle financeiro com ferramentas de faturamento integradas."
            />
            <FeatureCard 
              icon={<BrainCircuit className="h-10 w-10 text-primary" />}
              title="Assistente jurídico IA"
              description="Obtenha suporte ágil e respostas jurídicas com base em inteligência artificial."
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Segurança e conformidade"
              description="Proteção de dados em conformidade com as normas jurídicas e LGPD."
            />
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-primary" />}
              title="Validação de contratos"
              description="Analise contratos automaticamente para identificar riscos e sugerir melhorias."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">
              Planos flexíveis para qualquer tamanho de escritório
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Escolha o plano ideal para impulsionar seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <PricingCard 
              title="Profissional"
              price="R$ 149,90"
              description="Ideal para advogados autônomos"
              features={[
                "Automação de documentos básicos",
                "CRM jurídico completo",
                "Gestão de honorários",
                "Assistente jurídico IA",
                "Armazenamento de 10GB"
              ]}
              buttonText="Escolher Plano Profissional"
              popular={false}
            />
            <PricingCard 
              title="Avançado"
              price="R$ 249,90"
              description="Perfeito para equipes e escritórios"
              features={[
                "Todas as funcionalidades do Profissional",
                "Automação de documentos avançada",
                "Permissões de equipe e colaboração",
                "Integrações com outros sistemas",
                "Armazenamento de 50GB",
                "Suporte prioritário"
              ]}
              buttonText="Escolher Plano Avançado"
              popular={true}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold">Pronto para revolucionar seu escritório?</h2>
          <p className="mt-4 text-xl text-primary-foreground/90">
            Junte-se a centenas de advogados que já estão economizando tempo e aumentando sua produtividade com o Advoc.AI
          </p>
          <div className="mt-8">
            <Link to="/signup">
              <Button size="lg" variant="secondary">
                Comece agora mesmo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-medium mb-4">Produto</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demonstração</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nós</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Recursos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Suporte</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guias</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p>&copy; {new Date().getFullYear()} Advoc.AI. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="bg-white border-gray-100 h-full">
      <CardHeader>
        <div className="mb-2">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  popular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  buttonText,
  popular = false
}) => {
  return (
    <Card className={cn(
      "bg-white border-2 transition-all h-full flex flex-col",
      popular ? "border-primary shadow-lg scale-105" : "border-gray-100"
    )}>
      <CardHeader>
        {popular && (
          <div className="bg-primary text-white text-xs px-3 py-1 rounded-full w-fit mb-2">
            Mais popular
          </div>
        )}
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-gray-500">/mês</span>
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link to="/signup" className="w-full">
          <Button 
            className="w-full" 
            variant={popular ? "default" : "outline"}
          >
            {buttonText}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LandingPage;
