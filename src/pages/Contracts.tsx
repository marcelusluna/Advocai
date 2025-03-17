
import React, { useContext } from "react";
import MainLayout, { CreateEntityContext } from "@/layouts/main-layout";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FilePen, 
  Plus, 
  Search, 
  AlertTriangle, 
  Clock, 
  Check, 
  X, 
  Eye, 
  Edit, 
  Download, 
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dados fictícios de contratos
const contractsData = [
  {
    id: "1",
    title: "Contrato de Prestação de Serviços",
    client: "Tech Solutions Ltda.",
    value: "R$ 45.000,00",
    startDate: "01/05/2023",
    endDate: "01/05/2024",
    status: "ativo",
    alerts: 0
  },
  {
    id: "2",
    title: "Contrato de Consultoria Jurídica",
    client: "Construções Rápidas S.A.",
    value: "R$ 60.000,00",
    startDate: "15/03/2023",
    endDate: "15/03/2024",
    status: "ativo",
    alerts: 2
  },
  {
    id: "3",
    title: "Acordo de Confidencialidade",
    client: "Global Importações Ltda.",
    value: "N/A",
    startDate: "10/06/2023",
    endDate: "10/06/2025",
    status: "pendente",
    alerts: 0
  },
  {
    id: "4",
    title: "Contrato de Representação Legal",
    client: "Maria Silva",
    value: "R$ 12.000,00",
    startDate: "05/04/2023",
    endDate: "05/04/2024",
    status: "ativo",
    alerts: 1
  },
  {
    id: "5",
    title: "Contrato de Assessoria Jurídica",
    client: "João Pereira",
    value: "R$ 8.000,00",
    startDate: "20/01/2023",
    endDate: "20/01/2024",
    status: "finalizado",
    alerts: 0
  }
];

// Dados de alertas contratuais
const contractAlerts = [
  {
    id: "1",
    contract: "Contrato de Consultoria Jurídica",
    client: "Construções Rápidas S.A.",
    type: "Renovação",
    date: "15/03/2024",
    priority: "alta",
    description: "Contrato expira em 30 dias"
  },
  {
    id: "2",
    contract: "Contrato de Consultoria Jurídica",
    client: "Construções Rápidas S.A.",
    type: "Pagamento",
    date: "15/07/2023",
    priority: "média",
    description: "Pagamento trimestral"
  },
  {
    id: "3",
    contract: "Contrato de Representação Legal",
    client: "Maria Silva",
    type: "Obrigação",
    date: "05/08/2023",
    priority: "média",
    description: "Entrega de relatório mensal"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "ativo":
      return "bg-green-100 text-green-800 border-green-200";
    case "pendente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "finalizado":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "cancelado":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "alta":
      return "bg-red-100 text-red-800 border-red-200";
    case "média":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "baixa":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const Contracts: React.FC = () => {
  const { openDialog } = useContext(CreateEntityContext);
  
  const handleNewContract = () => {
    openDialog({
      title: "Adicionar Novo Contrato",
      description: "Preencha os campos abaixo para adicionar um novo contrato.",
      fields: [
        { id: "title", label: "Título", placeholder: "Título do contrato" },
        { id: "client", label: "Cliente", placeholder: "Nome do cliente" },
        { id: "value", label: "Valor", placeholder: "R$ 0,00" },
        { id: "startDate", label: "Data de Início", placeholder: "DD/MM/AAAA" },
        { id: "endDate", label: "Data de Término", placeholder: "DD/MM/AAAA" },
        { 
          id: "status", 
          label: "Status", 
          placeholder: "Selecione o status",
          options: [
            { value: "ativo", label: "Ativo" },
            { value: "pendente", label: "Pendente" },
            { value: "finalizado", label: "Finalizado" },
            { value: "cancelado", label: "Cancelado" }
          ]
        },
      ],
      submitLabel: "Adicionar Contrato",
      entityType: "contract"
    });
  };

  return (
    <MainLayout>
      <div className="py-8 animate-fade-in">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Contratos</h1>
              <p className="text-muted-foreground">
                Gerencie seus contratos e acordos legais
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
              <Button onClick={handleNewContract}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Contrato
              </Button>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Contratos</CardTitle>
              <CardDescription>
                Gerenciamento de contratos e acordos legais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="todos">
                <TabsList className="mb-4">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="ativos">Ativos</TabsTrigger>
                  <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
                  <TabsTrigger value="finalizados">Finalizados</TabsTrigger>
                </TabsList>
                
                <TabsContent value="todos" className="space-y-4">
                  <div className="relative w-full mb-4">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Buscar contrato..."
                      className="pl-10 pr-4 py-2 w-full rounded-md border border-input bg-background"
                    />
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Início</TableHead>
                        <TableHead>Término</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Alertas</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contractsData.map((contract) => (
                        <TableRow key={contract.id}>
                          <TableCell className="font-medium">{contract.title}</TableCell>
                          <TableCell>{contract.client}</TableCell>
                          <TableCell>{contract.value}</TableCell>
                          <TableCell>{contract.startDate}</TableCell>
                          <TableCell>{contract.endDate}</TableCell>
                          <TableCell>
                            <span className={cn(
                              "text-xs px-2 py-1 rounded-full border",
                              getStatusColor(contract.status)
                            )}>
                              {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>
                            {contract.alerts > 0 ? (
                              <div className="flex items-center">
                                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1" />
                                <span>{contract.alerts}</span>
                              </div>
                            ) : (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" title="Visualizar">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Editar">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Download">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="ativos">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por contratos ativos
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="pendentes">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por contratos pendentes
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="finalizados">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por contratos finalizados
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Alertas Contratuais</CardTitle>
                <CardDescription>
                  Obrigações e prazos importantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contractAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start justify-between p-3 hover:bg-muted/50 rounded-md">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{alert.contract}</p>
                          <p className="text-sm">{alert.client}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">{alert.date}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full border",
                          getPriorityColor(alert.priority)
                        )}>
                          {alert.type}
                        </span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Check className="h-3 w-3 text-green-500" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <X className="h-3 w-3 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Análise Contratual</CardTitle>
                <CardDescription>
                  Estatísticas e métricas dos contratos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Por Status</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Ativos</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Pendentes</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Finalizados</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Cancelados</span>
                        <span className="text-sm font-medium">5%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Valor Total</p>
                    <div className="mt-2">
                      <p className="text-2xl font-bold">R$ 125.000,00</p>
                      <p className="text-xs text-muted-foreground mt-1">Em contratos ativos</p>
                      
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex justify-between">
                          <span className="text-sm">Média por contrato</span>
                          <span className="text-sm font-medium">R$ 31.250,00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  <FilePen className="h-4 w-4 mr-2" />
                  Gerar Relatório de Contratos
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Contracts;
