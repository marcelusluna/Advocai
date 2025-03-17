
import React, { useContext } from "react";
import MainLayout, { CreateEntityContext } from "@/layouts/main-layout";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, Search, FileText, Calendar, Clock, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Dados fictícios de processos
const casesData = [
  {
    id: "1",
    number: "0001234-12.2023.8.26.0100",
    client: "Maria Silva",
    subject: "Indenização por Danos Morais",
    type: "Cível",
    date: "15/03/2023",
    stage: "Inicial",
    nextDeadline: "28/07/2023"
  },
  {
    id: "2",
    number: "0002345-23.2023.8.26.0100",
    client: "Tech Solutions Ltda.",
    subject: "Rescisão Contratual",
    type: "Trabalhista",
    date: "22/04/2023",
    stage: "Recursal",
    nextDeadline: "05/08/2023"
  },
  {
    id: "3",
    number: "0003456-34.2023.8.26.0100",
    client: "João Pereira",
    subject: "Execução de Título Extrajudicial",
    type: "Cível",
    date: "10/01/2023",
    stage: "Execução",
    nextDeadline: "10/08/2023"
  },
  {
    id: "4",
    number: "0004567-45.2023.8.26.0100",
    client: "Construções Rápidas S.A.",
    subject: "Disputa Societária",
    type: "Empresarial",
    date: "05/06/2023",
    stage: "Conhecimento",
    nextDeadline: "15/08/2023"
  },
  {
    id: "5",
    number: "0005678-56.2023.8.26.0100",
    client: "Ana Beatriz Mendes",
    subject: "Divórcio Litigioso",
    type: "Família",
    date: "20/05/2023",
    stage: "Inicial",
    nextDeadline: "30/07/2023"
  }
];

// Dados de tarefas processuais
const caseTasks = [
  {
    id: "1",
    title: "Audiência - Maria Silva",
    case: "0001234-12.2023.8.26.0100",
    date: "28/07/2023, 14:30",
    priority: "alta"
  },
  {
    id: "2",
    title: "Prazo - Contestação",
    case: "0002345-23.2023.8.26.0100",
    date: "05/08/2023, 23:59",
    priority: "alta"
  },
  {
    id: "3",
    title: "Elaborar petição",
    case: "0003456-34.2023.8.26.0100",
    date: "10/08/2023, 18:00",
    priority: "média"
  }
];

const getStageColor = (stage: string) => {
  switch (stage) {
    case "Inicial":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Conhecimento":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "Recursal":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Execução":
      return "bg-green-100 text-green-800 border-green-200";
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

const Cases: React.FC = () => {
  const { openDialog } = useContext(CreateEntityContext);
  
  const handleNewCase = () => {
    openDialog({
      title: "Adicionar Novo Processo",
      description: "Preencha os campos abaixo para adicionar um novo processo.",
      fields: [
        { id: "number", label: "Número", placeholder: "0000000-00.0000.0.00.0000" },
        { id: "client", label: "Cliente", placeholder: "Nome do cliente" },
        { id: "subject", label: "Assunto", placeholder: "Assunto do processo" },
        { 
          id: "type", 
          label: "Tipo", 
          placeholder: "Selecione o tipo",
          options: [
            { value: "Cível", label: "Cível" },
            { value: "Trabalhista", label: "Trabalhista" },
            { value: "Empresarial", label: "Empresarial" },
            { value: "Família", label: "Família" },
            { value: "Tributário", label: "Tributário" }
          ]
        },
        { 
          id: "stage", 
          label: "Fase", 
          placeholder: "Selecione a fase",
          options: [
            { value: "Inicial", label: "Inicial" },
            { value: "Conhecimento", label: "Conhecimento" },
            { value: "Recursal", label: "Recursal" },
            { value: "Execução", label: "Execução" }
          ]
        },
      ],
      submitLabel: "Adicionar Processo",
      entityType: "case"
    });
  };

  return (
    <MainLayout>
      <div className="py-8 animate-fade-in">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Processos</h1>
              <p className="text-muted-foreground">
                Acompanhe e gerencie seus processos judiciais
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
              <Button onClick={handleNewCase}>
                <Plus className="h-4 w-4 mr-2" />
                Novo Processo
              </Button>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Processos Ativos</CardTitle>
              <CardDescription>
                Gerenciamento de processos e acompanhamento judicial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="todos">
                <TabsList className="mb-4">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="civel">Cível</TabsTrigger>
                  <TabsTrigger value="trabalhista">Trabalhista</TabsTrigger>
                  <TabsTrigger value="empresarial">Empresarial</TabsTrigger>
                </TabsList>
                
                <TabsContent value="todos" className="space-y-4">
                  <div className="relative w-full mb-4">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Buscar processo..."
                      className="pl-10 pr-4 py-2 w-full rounded-md border border-input bg-background"
                    />
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Número</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Assunto</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Data de Entrada</TableHead>
                        <TableHead>Fase</TableHead>
                        <TableHead>Próximo Prazo</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {casesData.map((caseItem) => (
                        <TableRow key={caseItem.id}>
                          <TableCell className="font-medium">{caseItem.number}</TableCell>
                          <TableCell>{caseItem.client}</TableCell>
                          <TableCell>{caseItem.subject}</TableCell>
                          <TableCell>{caseItem.type}</TableCell>
                          <TableCell>{caseItem.date}</TableCell>
                          <TableCell>
                            <span className={cn(
                              "text-xs px-2 py-1 rounded-full border",
                              getStageColor(caseItem.stage)
                            )}>
                              {caseItem.stage}
                            </span>
                          </TableCell>
                          <TableCell>{caseItem.nextDeadline}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              <ArrowUpRight className="h-4 w-4 mr-2" />
                              Detalhes
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="civel">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por processos cíveis
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="trabalhista">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por processos trabalhistas
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="empresarial">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por processos empresariais
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Próximos Prazos</CardTitle>
                <CardDescription>
                  Prazos e compromissos processuais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md">
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.case}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">{task.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full border",
                          getPriorityColor(task.priority)
                        )}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>
                        <Button variant="ghost" size="sm">
                          <Calendar className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas Processuais</CardTitle>
                <CardDescription>
                  Visão geral dos processos por tipo e fase
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Por Tipo</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Cível</span>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Trabalhista</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Empresarial</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Família</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">Por Fase</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Inicial</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Conhecimento</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Recursal</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Execução</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  <FileText className="h-4 w-4 mr-2" />
                  Gerar Relatório Completo
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Cases;
