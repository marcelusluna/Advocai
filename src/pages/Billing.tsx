
import React from "react";
import MainLayout from "@/layouts/main-layout";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  Plus, 
  Search, 
  BarChart, 
  ArrowUpRight, 
  Filter, 
  Download, 
  FileSpreadsheet, 
  Calendar, 
  Clock, 
  Mail, 
  CheckCircle, 
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dados fictícios de faturamento
const invoicesData = [
  {
    id: "1",
    number: "INV-001",
    client: "Tech Solutions Ltda.",
    contract: "Contrato de Prestação de Serviços",
    amount: "R$ 15.000,00",
    issueDate: "01/06/2023",
    dueDate: "15/06/2023",
    status: "pago"
  },
  {
    id: "2",
    number: "INV-002",
    client: "Construções Rápidas S.A.",
    contract: "Contrato de Consultoria Jurídica",
    amount: "R$ 20.000,00",
    issueDate: "15/06/2023",
    dueDate: "30/06/2023",
    status: "pendente"
  },
  {
    id: "3",
    number: "INV-003",
    client: "Maria Silva",
    contract: "Contrato de Representação Legal",
    amount: "R$ 3.000,00",
    issueDate: "20/06/2023",
    dueDate: "05/07/2023",
    status: "pendente"
  },
  {
    id: "4",
    number: "INV-004",
    client: "Global Importações Ltda.",
    contract: "Acordo de Confidencialidade",
    amount: "R$ 5.000,00",
    issueDate: "25/05/2023",
    dueDate: "10/06/2023",
    status: "pago"
  },
  {
    id: "5",
    number: "INV-005",
    client: "João Pereira",
    contract: "Contrato de Assessoria Jurídica",
    amount: "R$ 2.000,00",
    issueDate: "01/05/2023",
    dueDate: "15/05/2023",
    status: "atrasado"
  }
];

// Dados de horas trabalhadas
const timeEntriesData = [
  {
    id: "1",
    description: "Reunião com cliente",
    client: "Tech Solutions Ltda.",
    date: "22/06/2023",
    time: "2.5",
    rate: "R$ 350,00",
    amount: "R$ 875,00",
    attorney: "Dr. Carlos Santos"
  },
  {
    id: "2",
    description: "Elaboração de petição",
    client: "Maria Silva",
    date: "23/06/2023",
    time: "3.0",
    rate: "R$ 350,00",
    amount: "R$ 1.050,00",
    attorney: "Dra. Ana Oliveira"
  },
  {
    id: "3",
    description: "Revisão contratual",
    client: "Construções Rápidas S.A.",
    date: "24/06/2023",
    time: "1.5",
    rate: "R$ 400,00",
    amount: "R$ 600,00",
    attorney: "Dr. Rafael Lima"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pago":
      return "bg-green-100 text-green-800 border-green-200";
    case "pendente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "atrasado":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pago":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "pendente":
      return <Clock className="h-4 w-4 text-yellow-600" />;
    case "atrasado":
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    default:
      return null;
  }
};

const Billing: React.FC = () => {
  return (
    <MainLayout>
      <div className="py-8 animate-fade-in">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Honorários</h1>
              <p className="text-muted-foreground">
                Gerencie seus honorários e faturamento
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nova Fatura
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recebido (Mês)</CardTitle>
                <CardDescription>
                  Honorários recebidos neste mês
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-500 mr-2" />
                  <div>
                    <p className="text-2xl font-bold">R$ 20.000,00</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      15% em relação ao mês anterior
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">A Receber</CardTitle>
                <CardDescription>
                  Honorários pendentes de recebimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-500 mr-2" />
                  <div>
                    <p className="text-2xl font-bold">R$ 25.000,00</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      5 faturas pendentes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Atrasados</CardTitle>
                <CardDescription>
                  Honorários com pagamento atrasado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <AlertCircle className="h-8 w-8 text-red-500 mr-2" />
                  <div>
                    <p className="text-2xl font-bold">R$ 2.000,00</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      1 fatura atrasada
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Faturas</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
              <CardDescription>
                Gerenciamento de faturas e recebimentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="todas">
                <TabsList className="mb-4">
                  <TabsTrigger value="todas">Todas</TabsTrigger>
                  <TabsTrigger value="pagas">Pagas</TabsTrigger>
                  <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
                  <TabsTrigger value="atrasadas">Atrasadas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="todas" className="space-y-4">
                  <div className="relative w-full mb-4">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Buscar fatura..."
                      className="pl-10 pr-4 py-2 w-full rounded-md border border-input bg-background"
                    />
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nº</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Contrato</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Emissão</TableHead>
                        <TableHead>Vencimento</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoicesData.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.number}</TableCell>
                          <TableCell>{invoice.client}</TableCell>
                          <TableCell>{invoice.contract}</TableCell>
                          <TableCell>{invoice.amount}</TableCell>
                          <TableCell>{invoice.issueDate}</TableCell>
                          <TableCell>{invoice.dueDate}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getStatusIcon(invoice.status)}
                              <span className={cn(
                                "text-xs px-2 py-1 rounded-full border ml-1",
                                getStatusColor(invoice.status)
                              )}>
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" title="Baixar">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Enviar por Email">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                Detalhes
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="pagas">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por faturas pagas
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="pendentes">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por faturas pendentes
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="atrasadas">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por faturas atrasadas
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Horas</CardTitle>
                <CardDescription>
                  Registro de horas trabalhadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeEntriesData.map((entry) => (
                    <div key={entry.id} className="flex items-start justify-between p-3 hover:bg-muted/50 rounded-md">
                      <div>
                        <p className="font-medium">{entry.description}</p>
                        <p className="text-sm text-muted-foreground">{entry.client}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">{entry.date}</p>
                          <Clock className="h-3 w-3 text-muted-foreground ml-2" />
                          <p className="text-xs text-muted-foreground">{entry.time}h</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{entry.amount}</p>
                        <p className="text-xs text-muted-foreground">{entry.attorney}</p>
                      </div>
                    </div>
                  ))}
                  
                  <Button className="w-full">
                    <Clock className="h-4 w-4 mr-2" />
                    Registrar Horas
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Análise Financeira</CardTitle>
                <CardDescription>
                  Visão geral do faturamento por período
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium">Faturamento por Mês</p>
                    <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between items-center text-xs">
                        <span>Janeiro</span>
                        <span>R$ 18.500,00</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-xs">
                        <span>Fevereiro</span>
                        <span>R$ 21.000,00</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-xs">
                        <span>Março</span>
                        <span>R$ 25.500,00</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-xs">
                        <span>Abril</span>
                        <span>R$ 19.800,00</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '66%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-xs">
                        <span>Maio</span>
                        <span>R$ 22.300,00</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '74%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-xs">
                        <span>Junho</span>
                        <span>R$ 30.000,00</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between gap-4">
                  <Button variant="outline" className="flex-1">
                    <BarChart className="h-4 w-4 mr-2" />
                    Relatórios
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileSpreadsheet className="h-4 w-4 mr-2" />
                    Exportar Dados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Billing;
