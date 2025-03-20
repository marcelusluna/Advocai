
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/ui/logo";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { 
  Check, 
  FileText, 
  Users, 
  Shield, 
  DollarSign, 
  Scale, 
  Clock, 
  MessageSquare, 
  Brain, 
  TrendingUp, 
  Lightbulb, 
  Lock,
  Menu,
  X,
  ChevronRight
} from "lucide-react";
import CheckoutDialog from "@/components/checkout/checkout-dialog";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handlePlanSelect = (plan: {name: string, price: string}) => {
    setSelectedPlan(plan);
    setCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    setCheckoutOpen(false);
    navigate("/signup", { 
      state: { 
        planPurchased: true, 
        planName: selectedPlan?.name 
      } 
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Header/Navigation - Redesigned */}
      <header className="w-full py-5 px-6 bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Logo size="sm" className="flex-row gap-2" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <a href="#features" className="text-gray-600 hover:text-primary transition-colors font-medium">Recursos</a>
            <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors font-medium">Planos</a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors font-medium">Depoimentos</a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="font-medium">Entrar</Button>
            </Link>
            <Link to="/signup">
              <Button className="font-medium">Começar agora</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 animate-slide-down z-50">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-gray-600 hover:text-primary transition-colors py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Recursos
              </a>
              <a 
                href="#pricing" 
                className="text-gray-600 hover:text-primary transition-colors py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Planos
              </a>
              <a 
                href="#testimonials" 
                className="text-gray-600 hover:text-primary transition-colors py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Depoimentos
              </a>
              <div className="flex flex-col space-y-3 pt-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Entrar</Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Começar agora</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section - Improved */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/lovable-uploads/84fe5ffe-ec43-496f-8504-29155fba7a19.png')] opacity-5 bg-cover bg-center"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-400 rounded-full opacity-10 blur-3xl"></div>
        
        <Container className="max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary font-medium text-sm mb-2">
                Transforme seu escritório jurídico
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Gestão Inteligente para Escritórios de Advocacia
              </h1>
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                Revolucione a maneira como seu escritório opera com nossa plataforma completa potencializada por inteligência artificial.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  </div>
                  <span className="text-gray-700">Reduza em até 70% o tempo gasto em tarefas administrativas</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  </div>
                  <span className="text-gray-700">Aumente a precisão na elaboração de documentos jurídicos</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 rounded-full p-1">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  </div>
                  <span className="text-gray-700">Centralize toda a informação do seu escritório em um só lugar</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Experimente grátis
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Conheça os recursos
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-2xl opacity-30"></div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-500 rounded-full opacity-20"></div>
                <img 
                  src="/lovable-uploads/84fe5ffe-ec43-496f-8504-29155fba7a19.png" 
                  alt="Dashboard Jurídico Advoc.AI" 
                  className="relative rounded-2xl shadow-2xl w-full object-cover z-10 border border-white/20"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section - Improved */}
      <section id="features" className="py-24 bg-white">
        <Container className="max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full text-primary font-medium text-sm mb-4">
              Funcionalidades
            </div>
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-6">
              Recursos Avançados para Escritórios Jurídicos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar clientes, processos e documentos em um só lugar com o poder da IA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards - now using consistent styling */}
            <Card className="border-0 shadow-lg hover-lift overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-blue-50 rounded-full mb-6 group-hover:bg-blue-100 transition-colors">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Automação com IA</h3>
                  <p className="text-gray-600">
                    Gere documentos e petições automaticamente com a ajuda da nossa inteligência artificial avançada.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-blue-50 rounded-full mb-6 group-hover:bg-blue-100 transition-colors">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">CRM Jurídico</h3>
                  <p className="text-gray-600">
                    Mantenha todos os seus clientes e processos organizados em um sistema de CRM específico para advogados.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-blue-50 rounded-full mb-6 group-hover:bg-blue-100 transition-colors">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Gestão de Documentos</h3>
                  <p className="text-gray-600">
                    Armazene, organize e encontre facilmente todos os seus documentos jurídicos com nossa plataforma intuitiva.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-blue-50 rounded-full mb-6 group-hover:bg-blue-100 transition-colors">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Validação de Contratos</h3>
                  <p className="text-gray-600">
                    Verifique e valide contratos automaticamente, identificando cláusulas problemáticas e sugerindo correções.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-blue-50 rounded-full mb-6 group-hover:bg-blue-100 transition-colors">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Gestão de Honorários</h3>
                  <p className="text-gray-600">
                    Controle facilmente seus honorários, emita cobranças e acompanhe pagamentos em um só local.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover-lift overflow-hidden group">
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <CardContent className="pt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-blue-50 rounded-full mb-6 group-hover:bg-blue-100 transition-colors">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Assistente Jurídico IA</h3>
                  <p className="text-gray-600">
                    Conte com um assistente virtual inteligente para responder perguntas jurídicas e ajudar na pesquisa legal.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Why Advoc.AI Section - Improved Design */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-100/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-100/30 to-transparent rounded-full blur-3xl"></div>
        
        <Container className="max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full text-primary font-medium text-sm mb-4">
              Por que escolher Advoc.AI?
            </div>
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-6">
              Por Que Escolher o Advoc.AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Diferenciais exclusivos que transformam a gestão do seu escritório jurídico e potencializam seus resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col h-full">
                <div className="mb-6 text-primary">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50">
                    <Clock className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Economize Tempo</h3>
                <p className="text-gray-600 mb-6">
                  Reduza o tempo gasto em tarefas administrativas em até 70%, permitindo que você se dedique mais ao atendimento dos clientes e estratégias jurídicas.
                </p>
                <div className="mt-auto">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Automação de documentos em minutos, não horas</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Gestão de prazos automatizada</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col h-full">
                <div className="mb-6 text-primary">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50">
                    <TrendingUp className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Aumente sua Produtividade</h3>
                <p className="text-gray-600 mb-6">
                  Atenda mais clientes sem aumentar sua equipe. Nossa IA potencializa a capacidade produtiva do seu escritório com ferramentas que multiplicam sua eficiência.
                </p>
                <div className="mt-auto">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Análise de jurisprudência em segundos</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Gestão integrada de casos e clientes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col h-full">
                <div className="mb-6 text-primary">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-50">
                    <Lightbulb className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">Diferencial Competitivo</h3>
                <p className="text-gray-600 mb-6">
                  Destaque-se no mercado jurídico oferecendo serviços mais ágeis, precisos e com melhor experiência para seus clientes, tornando seu escritório uma referência.
                </p>
                <div className="mt-auto">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Portal do cliente para acompanhamento de processos</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Relatórios detalhados e personalizáveis</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section - Redesigned */}
          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <div className="flex flex-col md:flex-row gap-12">
              {/* Left Column - Headline */}
              <div className="md:w-1/2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
                  <span className="font-medium text-gray-600">Advoc.AI é diferente</span>
                </div>
                <h3 className="font-heading text-3xl font-bold text-blue-600 leading-tight mb-6">
                  A única solução 100% focada em 
                  <span className="text-gray-900"> gestão jurídica para escritórios de advocacia em crescimento</span>
                </h3>
              </div>

              {/* Right Column - Benefits */}
              <div className="md:w-1/2 space-y-10">
                {/* Benefit 1 */}
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <FileText className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Facilidade de uso e implementação</h4>
                    <p className="text-gray-600">
                      Autonomia total para configurar do seu jeito sem depender de consultorias ou times técnicos.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <Lock className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Muito mais que gerenciamento de processos</h4>
                    <p className="text-gray-600">
                      Controle completo de documentos e organização de fluxos internos com segurança e agilidade.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <Brain className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Assistência jurídica inteligente</h4>
                    <p className="text-gray-600">
                      Potencialize seu conhecimento com análises de jurisprudência e sugestões de estratégias processuais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials Section - Improved */}
      <section id="testimonials" className="py-24 bg-white">
        <Container className="max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full text-primary font-medium text-sm mb-4">
              Depoimentos
            </div>
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-6">
              O Que Dizem Nossos Clientes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advogados e escritórios jurídicos estão transformando seus negócios com Advoc.AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial Cards - Improved */}
            <Card className="border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="italic text-gray-600 mb-8 text-lg leading-relaxed">
                    "O Advoc.AI revolucionou a forma como gerencio meu escritório. A automação de documentos economiza horas do meu dia, e o assistente de IA me ajuda a encontrar jurisprudência rapidamente."
                  </p>
                  <div className="mt-auto flex items-center">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                      MS
                    </div>
                    <div>
                      <p className="font-bold">Dra. Maria Silva</p>
                      <p className="text-sm text-gray-500">Advogada Tributarista</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="italic text-gray-600 mb-8 text-lg leading-relaxed">
                    "Como gestor de um escritório com 15 advogados, o Advoc.AI nos permitiu escalar nossos serviços sem aumentar a equipe administrativa. O ROI foi impressionante já no primeiro mês."
                  </p>
                  <div className="mt-auto flex items-center">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                      CM
                    </div>
                    <div>
                      <p className="font-bold">Dr. Carlos Mendes</p>
                      <p className="text-sm text-gray-500">Sócio-diretor em Escritório Empresarial</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8">
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="italic text-gray-600 mb-8 text-lg leading-relaxed">
                    "A validação de contratos com IA detectou cláusulas problemáticas que eu poderia ter perdido. Essa ferramenta já evitou vários problemas potenciais para meus clientes."
                  </p>
                  <div className="mt-auto flex items-center">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                      AO
                    </div>
                    <div>
                      <p className="font-bold">Dra. Ana Oliveira</p>
                      <p className="text-sm text-gray-500">Especialista em Direito Contratual</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Pricing Section - Improved */}
      <section id="pricing" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-50/50 to-transparent"></div>
        <Container className="max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 bg-blue-50 rounded-full text-primary font-medium text-sm mb-4">
              Planos
            </div>
            <h2 className="font-heading text-4xl font-bold text-gray-900 mb-6">
              Planos que se Adaptam ao Seu Escritório
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para as necessidades do seu escritório jurídico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Pricing Card 1 - Improved */}
            <Card className={cn(
              "border border-gray-200 shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden",
            )}>
              <div className="h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
              <CardContent className="pt-8">
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-center mb-2">Profissional</h3>
                  <p className="text-center text-gray-600 mb-6">Para advogados individuais</p>
                  <div className="text-center mb-8">
                    <span className="text-5xl font-bold">R$149,90</span>
                    <span className="text-gray-600">/mês</span>
                  </div>

                  <ul className="space-y-4 mb-10">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Gerenciamento de até 100 clientes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Automação de documentos com IA</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Análise básica de contratos</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Assistente jurídico IA (500 consultas/mês)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Suporte por email</span>
                    </li>
                  </ul>

                  <div className="mt-auto">
                    <Button 
                      onClick={() => handlePlanSelect({name: "Profissional", price: "R$149,90/mês"})} 
                      className="w-full py-6 text-lg"
                    >
                      Escolher plano
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Card 2 - Improved */}
            <Card className={cn(
              "border-2 border-primary shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden",
            )}>
              <div className="h-2 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
              <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-1.5 rounded-full text-sm font-medium">
                Popular
              </div>
              <CardContent className="pt-8">
                <div className="flex flex-col h-full">
                  <h3 className="text-2xl font-bold text-center mb-2">Avançado</h3>
                  <p className="text-center text-gray-600 mb-6">Para equipes e escritórios</p>
                  <div className="text-center mb-8">
                    <span className="text-5xl font-bold">R$249,90</span>
                    <span className="text-gray-600">/mês</span>
                  </div>

                  <ul className="space-y-4 mb-10">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Clientes ilimitados</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Automação avançada de documentos e petições</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Sistema de gestão de prazos processuais</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Assistente jurídico IA ilimitado</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Suporte prioritário 24/7</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Acesso para até 10 usuários</span>
                    </li>
                  </ul>

                  <div className="mt-auto">
                    <Button 
                      onClick={() => handlePlanSelect({name: "Avançado", price: "R$249,90/mês"})} 
                      className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      Escolher plano
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section - Improved */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/84fe5ffe-ec43-496f-8504-29155fba7a19.png')] opacity-5 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-400 rounded-full opacity-20 blur-3xl"></div>
        
        <Container className="max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">
              Pronto para Transformar seu Escritório?
            </h2>
            <p className="text-xl opacity-90 mb-10 leading-relaxed">
              Experimente o Advoc.AI hoje e descubra como a tecnologia pode transformar sua prática jurídica.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-lg py-6 px-8 bg-white text-blue-700 hover:bg-gray-100"
                onClick={() => handlePlanSelect({name: "Teste", price: "Gratuito por 14 dias"})}
              >
                Comece grátis por 14 dias
              </Button>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg py-6 px-8 border-white text-white hover:bg-white/10">
                  Entrar na plataforma
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer - Improved */}
      <footer className="bg-gray-900 text-white py-16">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <Logo className="mb-6" />
              <p className="text-gray-400 mb-6 leading-relaxed">
                A plataforma jurídica definitiva com inteligência artificial para advogados modernos.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Empresa</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Carreiras</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Termos de Serviço</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Segurança</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Advoc.AI. Todos os direitos reservados.</p>
          </div>
        </Container>
      </footer>

      {/* Checkout Dialog */}
      {selectedPlan && (
        <CheckoutDialog
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          onComplete={handleCheckoutComplete}
          planName={selectedPlan.name}
          planPrice={selectedPlan.price}
        />
      )}
    </div>
  );
};

export default LandingPage;
