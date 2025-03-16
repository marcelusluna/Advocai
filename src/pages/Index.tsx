
import React, { useState } from "react";
import { Users, Briefcase, FileText, DollarSign, Plus, Filter, MoreHorizontal, Clock } from "lucide-react";
import MainLayout from "@/layouts/main-layout";
import Container from "@/components/ui/container";
import StatsCard from "@/components/dashboard/stats-card";
import RecentClients from "@/components/dashboard/recent-clients";
import RecentCases from "@/components/dashboard/recent-cases";
import UpcomingTasks from "@/components/dashboard/upcoming-tasks";
import DashboardCharts from "@/components/dashboard/dashboard-charts";
import NotificationsPanel from "@/components/dashboard/notifications-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index: React.FC = () => {
  const [dateRange, setDateRange] = useState("last7Days");

  return (
    <MainLayout>
      <div className="py-6">
        <Container>
          {/* Header with Page Title and Date Selector */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-1">Home</h1>
              <p className="text-muted-foreground">
                Bem-vindo ao seu painel de controle de advocacia
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="yesterday">Ontem</SelectItem>
                  <SelectItem value="last7Days">Últimos 7 dias</SelectItem>
                  <SelectItem value="last30Days">Últimos 30 dias</SelectItem>
                  <SelectItem value="thisMonth">Este mês</SelectItem>
                  <SelectItem value="lastMonth">Mês passado</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Chart Section with Tabs */}
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Análise de Processos</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtrar
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="processos" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="processos">Processos</TabsTrigger>
                      <TabsTrigger value="faturamento">Faturamento</TabsTrigger>
                      <TabsTrigger value="tipos">Tipos de Processos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="processos" className="mt-0">
                      <div className="h-[300px]">
                        <DashboardCharts />
                      </div>
                    </TabsContent>
                    <TabsContent value="faturamento" className="mt-0">
                      <div className="h-[300px]">
                        <DashboardCharts />
                      </div>
                    </TabsContent>
                    <TabsContent value="tipos" className="mt-0">
                      <div className="h-[300px]">
                        <DashboardCharts />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Recent Cases */}
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Processos Recentes</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Ver todos
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <RecentCases />
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Próximas Tarefas</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Clock className="h-4 w-4 mr-2" />
                        Adicionar Tarefa
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <UpcomingTasks />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Notificações</CardTitle>
                    <Button variant="ghost" size="sm">
                      Marcar como lidas
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <NotificationsPanel />
                </CardContent>
              </Card>

              {/* Recent Clients */}
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Clientes Recentes</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Cliente
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <RecentClients />
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Index;
