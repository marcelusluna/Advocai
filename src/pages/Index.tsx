
import React, { useState } from "react";
import { 
  Users, 
  Briefcase, 
  FileText, 
  DollarSign, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Clock,
  ChevronDown,
  Bell,
  RefreshCw,
  Search
} from "lucide-react";
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
import { Input } from "@/components/ui/input";

const Index: React.FC = () => {
  const [dateRange, setDateRange] = useState("last7Days");

  return (
    <MainLayout>
      <div className="min-h-screen pb-10">
        <header className="py-4 px-6 border-b border-gray-200 bg-white">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                Bem-vindo ao seu dashboard de advocacia
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Pesquisar..." 
                  className="pl-9 h-9 text-sm bg-gray-50 border-gray-200"
                />
              </div>
              <Button variant="outline" size="sm" className="text-gray-700 border-gray-200 hover:bg-gray-100">
                <RefreshCw className="h-4 w-4 mr-2" />
                <span>Atualizar</span>
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 border-gray-200 text-gray-700">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <Container className="mt-6">
          {/* Filtros */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Visão Geral</h2>
              <p className="text-sm text-gray-500">
                Análise de desempenho do escritório
              </p>
            </div>
            <div className="flex items-center gap-2 sm:justify-end">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px] h-9 text-sm bg-white border-gray-200">
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
              
              <Button variant="outline" size="sm" className="text-gray-700 h-9 border-gray-200">
                <Filter className="h-4 w-4 mr-2" />
                <span>Filtros</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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

          {/* Charts Section */}
          <div className="mb-6">
            <Card className="bg-white border-gray-100 shadow-sm">
              <CardHeader className="pb-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg font-medium text-gray-900">Análise de Desempenho</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Métricas chave do escritório</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-gray-700">
                      <Plus className="h-4 w-4 mr-2" />
                      <span>Adicionar</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-700">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <DashboardCharts />
              </CardContent>
            </Card>
          </div>

          {/* Content Area (2 columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - 2/3 width */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Cases */}
              <Card className="bg-white border-gray-100 shadow-sm overflow-hidden">
                <CardHeader className="pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg font-medium text-gray-900">Processos Recentes</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Últimos processos adicionados</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="text-gray-700 border-gray-200">
                        <Plus className="h-4 w-4 mr-2" />
                        <span>Novo Processo</span>
                      </Button>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[120px] h-9 text-sm bg-white border-gray-200">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Todos</SelectItem>
                          <SelectItem value="active">Ativos</SelectItem>
                          <SelectItem value="pending">Pendentes</SelectItem>
                          <SelectItem value="completed">Concluídos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 max-h-[350px] overflow-y-auto">
                  <RecentCases />
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader className="pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg font-medium text-gray-900">Próximas Tarefas</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Compromissos e prazos</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="text-gray-700 border-gray-200">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Adicionar Tarefa</span>
                      </Button>
                      <Select defaultValue="week">
                        <SelectTrigger className="w-[120px] h-9 text-sm bg-white border-gray-200">
                          <SelectValue placeholder="Período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Hoje</SelectItem>
                          <SelectItem value="tomorrow">Amanhã</SelectItem>
                          <SelectItem value="week">Esta semana</SelectItem>
                          <SelectItem value="month">Este mês</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 max-h-[350px] overflow-y-auto">
                  <UpcomingTasks />
                </CardContent>
              </Card>
            </div>

            {/* Right Column - 1/3 width */}
            <div className="space-y-6">
              {/* Notifications */}
              <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader className="pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg font-medium text-gray-900">Notificações</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Atualizações recentes</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-gray-700 border-gray-200">
                      Marcar como lidas
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 max-h-[350px] overflow-y-auto">
                  <NotificationsPanel />
                </CardContent>
              </Card>

              {/* Recent Clients */}
              <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader className="pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg font-medium text-gray-900">Clientes Recentes</CardTitle>
                      <p className="text-sm text-gray-500 mt-1">Últimos clientes cadastrados</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-gray-700 border-gray-200">
                      <Plus className="h-4 w-4 mr-2" />
                      <span>Novo Cliente</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 max-h-[320px] overflow-y-auto">
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
