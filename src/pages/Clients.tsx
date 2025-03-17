import React, { useContext } from "react";
import MainLayout, { CreateEntityContext } from "@/layouts/main-layout";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, Search, UserPlus, Download, Mail, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const clientsData = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria.silva@example.com",
    phone: "(11) 98765-4321",
    type: "Pessoa Física",
    createdAt: "12/03/2023",
    status: "ativo"
  },
  {
    id: "2",
    name: "Tech Solutions Ltda.",
    email: "contato@techsolutions.com",
    phone: "(11) 3456-7890",
    type: "Pessoa Jurídica",
    createdAt: "25/04/2023",
    status: "ativo"
  },
  {
    id: "3",
    name: "João Pereira",
    email: "joao.pereira@example.com",
    phone: "(21) 99876-5432",
    type: "Pessoa Física",
    createdAt: "05/01/2023",
    status: "pendente"
  },
  {
    id: "4",
    name: "Construções Rápidas S.A.",
    email: "contato@construcoesrapidas.com",
    phone: "(11) 2345-6789",
    type: "Pessoa Jurídica",
    createdAt: "17/05/2023",
    status: "ativo"
  },
  {
    id: "5",
    name: "Ana Beatriz Mendes",
    email: "anabeatriz@example.com",
    phone: "(11) 97654-3210",
    type: "Pessoa Física",
    createdAt: "22/06/2023",
    status: "inativo"
  },
  {
    id: "6",
    name: "Global Importações Ltda.",
    email: "contato@globalimport.com",
    phone: "(11) 4567-8901",
    type: "Pessoa Jurídica",
    createdAt: "08/02/2023",
    status: "ativo"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "ativo":
      return "bg-green-100 text-green-800 border-green-200";
    case "pendente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "inativo":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
};

const Clients: React.FC = () => {
  const { openDialog } = useContext(CreateEntityContext);
  
  const handleNewClient = () => {
    openDialog({
      title: "Adicionar Novo Cliente",
      description: "Preencha os campos abaixo para adicionar um novo cliente.",
      fields: [
        { id: "name", label: "Nome", placeholder: "Nome do cliente" },
        { id: "email", label: "Email", placeholder: "email@exemplo.com", type: "email" },
        { id: "phone", label: "Telefone", placeholder: "(00) 00000-0000" },
        { 
          id: "type", 
          label: "Tipo", 
          placeholder: "Selecione o tipo",
          options: [
            { value: "Pessoa Física", label: "Pessoa Física" },
            { value: "Pessoa Jurídica", label: "Pessoa Jurídica" }
          ]
        },
      ],
      submitLabel: "Adicionar Cliente",
      entityType: "client"
    });
  };

  return (
    <MainLayout>
      <div className="py-8 animate-fade-in">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Clientes</h1>
              <p className="text-muted-foreground">
                Gerencie seus clientes e acompanhe suas informações
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
              <Button onClick={handleNewClient}>
                <UserPlus className="h-4 w-4 mr-2" />
                Novo Cliente
              </Button>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Visão Geral</CardTitle>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
              <CardDescription>
                Visualize e gerencie todos os seus clientes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="todos">
                <TabsList className="mb-4">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="ativos">Ativos</TabsTrigger>
                  <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
                  <TabsTrigger value="inativos">Inativos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="todos" className="space-y-4">
                  <div className="relative w-full mb-4">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Buscar cliente..."
                      className="pl-10 pr-4 py-2 w-full rounded-md border border-input bg-background"
                    />
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Data de Cadastro</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientsData.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>{client.email}</TableCell>
                          <TableCell>{client.phone}</TableCell>
                          <TableCell>{client.type}</TableCell>
                          <TableCell>{client.createdAt}</TableCell>
                          <TableCell>
                            <span className={cn(
                              "text-xs px-2 py-1 rounded-full border",
                              getStatusColor(client.status)
                            )}>
                              {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
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
                      Filtragem por clientes ativos
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="pendentes">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por clientes pendentes
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="inativos">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por clientes inativos
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Clientes Recentes</CardTitle>
                <CardDescription>
                  Últimos clientes cadastrados no sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientsData.slice(0, 3).map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md">
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.email}</p>
                      </div>
                      <Button variant="outline" size="sm">Ver detalhes</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Próximas Interações</CardTitle>
                <CardDescription>
                  Reuniões e contatos agendados com clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 hover:bg-muted/50 rounded-md">
                    <p className="font-medium">Reunião - Tech Solutions</p>
                    <p className="text-sm text-muted-foreground">28/07/2023 às 14:30</p>
                  </div>
                  <div className="p-3 hover:bg-muted/50 rounded-md">
                    <p className="font-medium">Retorno - Maria Silva</p>
                    <p className="text-sm text-muted-foreground">30/07/2023 às 10:00</p>
                  </div>
                  <div className="p-3 hover:bg-muted/50 rounded-md">
                    <p className="font-medium">Assinatura - Global Importações</p>
                    <p className="text-sm text-muted-foreground">02/08/2023 às 15:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Clients;
