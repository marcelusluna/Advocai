
import React from "react";
import { Users, Briefcase, FileText, DollarSign } from "lucide-react";
import MainLayout from "@/layouts/main-layout";
import Container from "@/components/ui/container";
import StatsCard from "@/components/dashboard/stats-card";
import RecentClients from "@/components/dashboard/recent-clients";
import RecentCases from "@/components/dashboard/recent-cases";
import UpcomingTasks from "@/components/dashboard/upcoming-tasks";

const Index: React.FC = () => {
  return (
    <MainLayout>
      <div className="py-8">
        <Container>
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Bem-vindo ao seu painel de controle de advocacia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard 
              title="Clientes Ativos" 
              value="124" 
              icon={Users}
              description="Total de clientes ativos"
              trend={{ value: 5.2, isPositive: true }}
            />
            <StatsCard 
              title="Processos em Andamento" 
              value="57" 
              icon={Briefcase}
              description="Total de processos ativos"
              trend={{ value: 2.1, isPositive: true }}
            />
            <StatsCard 
              title="Documentos" 
              value="312" 
              icon={FileText}
              description="Total de documentos criados"
              trend={{ value: 12.5, isPositive: true }}
            />
            <StatsCard 
              title="Faturamento Mensal" 
              value="R$ 45.280" 
              icon={DollarSign}
              description="Faturamento no mês atual"
              trend={{ value: 3.7, isPositive: false }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <RecentClients />
            <RecentCases />
          </div>

          <div className="mb-6">
            <UpcomingTasks />
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Index;
