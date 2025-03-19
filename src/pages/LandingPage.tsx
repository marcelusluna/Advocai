import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/ui/logo";
import Container from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { Check, FileText, Users, Shield, DollarSign, Scale, Clock, MessageSquare, Brain } from "lucide-react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="w-full py-4 px-6 bg-white border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Logo size="sm" className="flex-row gap-2" />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary transition">Recursos</a>
            <a href="#pricing" className="text-gray-600 hover:text-primary transition">Planos</a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary transition">Depoimentos</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Entrar</Button>
            </Link>
            <Link to="/signup">
              <Button>Começar agora</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Improved */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-24">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Gestão Inteligente para Escritórios de Advocacia
              </h1>
              <p className="text-xl text-gray-600 max-w-xl">
                Revolucione a maneira como seu escritório opera com nossa plataforma completa potencializada por inteligência artificial. Automatize tarefas repetitivas, aumente a produtividade e foque no que realmente importa: seus clientes.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-2">
                  <Check className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Reduza em até 70% o tempo gasto em tarefas administrativas</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Aumente a precisão na elaboração de documentos jurídicos</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Centralize toda a informação do seu escritório em um só lugar</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto">
                    Experimente grátis
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
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-indigo-500 rounded-full opacity-20"></div>
              <img 
                src="/lovable-uploads/84fe5ffe-ec43-496f-8504-29155fba7a19.png" 
                alt="Dashboard Jurídico Advoc.AI" 
                className="relative rounded-lg shadow-2xl w-full object-cover z-10"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <Container className="max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recursos Avançados para Escritórios Jurídicos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar clientes, processos e documentos em um só lugar com o poder da IA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-0 shadow-lg hover-lift">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-50 rounded-full mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Automação com IA</h3>
                  <p className="text-gray-600">
                    Gere documentos e petições automaticamente com a ajuda da nossa inteligência artificial avançada.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-0 shadow-lg hover-lift">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-50 rounded-full mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">CRM Jurídico</h3>
                  <p className="text-gray-600">
                    Mantenha todos os seus clientes e processos organizados em um sistema de CRM específico para advogados.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-0 shadow-lg hover-lift">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-50 rounded-full mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Gestão de Documentos</h3>
                  <p className="text-gray-600">
                    Armazene, organize e encontre facilmente todos os seus documentos jurídicos com nossa plataforma intuitiva.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-0 shadow-lg hover-lift">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-50 rounded-full mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Validação de Contratos</h3>
                  <p className="text-gray-600">
                    Verifique e valide contratos automaticamente, identificando cláusulas problemáticas e sugerindo correções.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-0 shadow-lg hover-lift">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-50 rounded-full mb-4">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Gestão de Honorários</h3>
                  <p className="text-gray-600">
                    Controle facilmente seus honorários, emita cobranças e acompanhe pagamentos em um só local.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-0 shadow-lg hover-lift">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-blue-50 rounded-full mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Assistente Jurídico IA</h3>
                  <p className="text-gray-600">
                    Conte com um assistente virtual inteligente para responder perguntas jurídicas e ajudar na pesquisa legal.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <Container className="max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planos que se Adaptam ao Seu Escritório
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Escolha o plano ideal para as necessidades do seu escritório jurídico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pricing Card 1 */}
            <Card className={cn(
              "border border-blue-100 shadow-xl hover:-translate-y-1 transition-transform duration-300",
            )}>
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold text-center mb-2">Profissional</h3>
                  <p className="text-center text-gray-600 mb-6">Para advogados individuais</p>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">R$149,90</span>
                    <span className="text-gray-600">/mês</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Gerenciamento de até 100 clientes</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Automação de documentos com IA</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Armazenamento de 10GB</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Assistente jurídico IA (500 consultas/mês)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Suporte por email</span>
                    </li>
                  </ul>

                  <div className="mt-auto">
                    <Link to="/signup?plan=professional" className="w-full">
                      <Button className="w-full">Escolher plano</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Card 2 */}
            <Card className={cn(
              "border-2 border-primary shadow-xl hover:-translate-y-1 transition-transform duration-300 relative",
            )}>
              <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <h3 className="text-xl font-bold text-center mb-2">Avançado</h3>
                  <p className="text-center text-gray-600 mb-6">Para equipes e escritórios</p>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">R$249,90</span>
                    <span className="text-gray-600">/mês</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Clientes ilimitados</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Automação avançada de documentos e petições</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Armazenamento de 50GB</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Assistente jurídico IA ilimitado</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Suporte prioritário 24/7</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Acesso para até 10 usuários</span>
                    </li>
                  </ul>

                  <div className="mt-auto">
                    <Link to="/signup?plan=advanced" className="w-full">
                      <Button className="w-full">Escolher plano</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <Container className="max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O Que Dizem Nossos Clientes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Advogados e escritórios jurídicos estão transformando seus negócios com Advoc.AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-primary">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="italic text-gray-600 mb-6">
                    "O Advoc.AI revolucionou a forma como gerencio meu escritório. A automação de documentos economiza horas do meu dia, e o assistente de IA me ajuda a encontrar jurisprudência rapidamente."
                  </p>
                  <div className="mt-auto">
                    <p className="font-bold">Dra. Maria Silva</p>
                    <p className="text-sm text-gray-500">Advogada Tributarista</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-primary">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="italic text-gray-600 mb-6">
                    "Como gestor de um escritório com 15 advogados, o Advoc.AI nos permitiu escalar nossos serviços sem aumentar a equipe administrativa. O ROI foi impressionante já no primeiro mês."
                  </p>
                  <div className="mt-auto">
                    <p className="font-bold">Dr. Carlos Mendes</p>
                    <p className="text-sm text-gray-500">Sócio-diretor em Escritório Empresarial</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-primary">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="italic text-gray-600 mb-6">
                    "A validação de contratos com IA detectou cláusulas problemáticas que eu poderia ter perdido. Essa ferramenta já evitou vários problemas potenciais para meus clientes."
                  </p>
                  <div className="mt-auto">
                    <p className="font-bold">Dra. Ana Oliveira</p>
                    <p className="text-sm text-gray-500">Especialista em Direito Contratual</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <Container className="max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Pronto para Transformar seu Escritório?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Experimente o Advoc.AI hoje e descubra como a tecnologia pode transformar sua prática jurídica.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Comece grátis por 14 dias
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Entrar na plataforma
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <Container className="max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo className="mb-4" />
              <p className="text-gray-400 mb-4">
                A plataforma jurídica definitiva com inteligência artificial para advogados modernos.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">CRM Jurídico</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Gestão de Processos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Automação de Documentos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Assistente de IA</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Sobre Nós</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Carreiras</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Termos de Serviço</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Política de Privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Segurança</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Advoc.AI. Todos os direitos reservados.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
