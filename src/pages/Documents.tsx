
import React from "react";
import MainLayout from "@/layouts/main-layout";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  FilePlus, 
  Search, 
  Download, 
  Share2, 
  File, 
  FileCheck, 
  Edit, 
  Trash2, 
  Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dados fictícios de documentos
const documentsData = [
  {
    id: "1",
    name: "Petição Inicial - Maria Silva",
    type: "Petição",
    relatedTo: "Processo nº 0001234-12.2023.8.26.0100",
    createdAt: "15/03/2023",
    modifiedAt: "15/03/2023",
    status: "finalizado",
    createdBy: "Dr. Carlos Santos"
  },
  {
    id: "2",
    name: "Contrato de Prestação de Serviços - Tech Solutions",
    type: "Contrato",
    relatedTo: "Tech Solutions Ltda.",
    createdAt: "22/04/2023",
    modifiedAt: "25/04/2023",
    status: "rascunho",
    createdBy: "Dra. Ana Oliveira"
  },
  {
    id: "3",
    name: "Recurso - João Pereira",
    type: "Recurso",
    relatedTo: "Processo nº 0003456-34.2023.8.26.0100",
    createdAt: "08/06/2023",
    modifiedAt: "10/06/2023",
    status: "finalizado",
    createdBy: "Dr. Rafael Lima"
  },
  {
    id: "4",
    name: "Acordo Extrajudicial - Construções Rápidas",
    type: "Acordo",
    relatedTo: "Construções Rápidas S.A.",
    createdAt: "12/05/2023",
    modifiedAt: "14/05/2023",
    status: "revisão",
    createdBy: "Dra. Ana Oliveira"
  },
  {
    id: "5",
    name: "Petição de Divórcio - Ana Beatriz",
    type: "Petição",
    relatedTo: "Processo nº 0005678-56.2023.8.26.0100",
    createdAt: "20/05/2023",
    modifiedAt: "22/05/2023",
    status: "finalizado",
    createdBy: "Dr. Carlos Santos"
  }
];

// Dados de templates de documentos
const templateData = [
  { id: "1", name: "Petição Inicial", category: "Processual", usageCount: 28 },
  { id: "2", name: "Contrato de Prestação de Serviços", category: "Contratual", usageCount: 35 },
  { id: "3", name: "Procuração Ad Judicia", category: "Instrumental", usageCount: 42 },
  { id: "4", name: "Recurso de Apelação", category: "Recursal", usageCount: 17 }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "finalizado":
      return "bg-green-100 text-green-800 border-green-200";
    case "rascunho":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "revisão":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-blue-100 text-blue-800 border-blue-200";
  }
};

const Documents: React.FC = () => {
  return (
    <MainLayout>
      <div className="py-8 animate-fade-in">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Documentos</h1>
              <p className="text-muted-foreground">
                Crie, edite e gerencie seus documentos jurídicos
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
              <Button>
                <FilePlus className="h-4 w-4 mr-2" />
                Novo Documento
              </Button>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Todos os Documentos</CardTitle>
              <CardDescription>
                Biblioteca de documentos e peças processuais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="todos">
                <TabsList className="mb-4">
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                  <TabsTrigger value="peticoes">Petições</TabsTrigger>
                  <TabsTrigger value="contratos">Contratos</TabsTrigger>
                  <TabsTrigger value="recursos">Recursos</TabsTrigger>
                </TabsList>
                
                <TabsContent value="todos" className="space-y-4">
                  <div className="relative w-full mb-4">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Buscar documento..."
                      className="pl-10 pr-4 py-2 w-full rounded-md border border-input bg-background"
                    />
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Relacionado a</TableHead>
                        <TableHead>Criado em</TableHead>
                        <TableHead>Modificado em</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Criado por</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documentsData.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.name}</TableCell>
                          <TableCell>{doc.type}</TableCell>
                          <TableCell>{doc.relatedTo}</TableCell>
                          <TableCell>{doc.createdAt}</TableCell>
                          <TableCell>{doc.modifiedAt}</TableCell>
                          <TableCell>
                            <span className={cn(
                              "text-xs px-2 py-1 rounded-full border",
                              getStatusColor(doc.status)
                            )}>
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>{doc.createdBy}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" title="Editar">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Download">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Compartilhar">
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Excluir">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="peticoes">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por petições
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="contratos">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por contratos
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="recursos">
                  <div className="flex justify-center items-center p-12">
                    <p className="text-muted-foreground">
                      Filtragem por recursos
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Templates Disponíveis</CardTitle>
                <CardDescription>
                  Modelos prontos para criar novos documentos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templateData.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md">
                      <div className="flex items-start gap-3">
                        <File className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">{template.name}</p>
                          <p className="text-sm text-muted-foreground">{template.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Usado {template.usageCount} vezes
                        </span>
                        <Button variant="outline" size="sm">Usar</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Documentos Recentes</CardTitle>
                <CardDescription>
                  Últimos documentos editados ou criados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documentsData.slice(0, 3).map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md">
                      <div className="flex items-start gap-3">
                        {doc.status === "finalizado" ? (
                          <FileCheck className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <FileText className="h-5 w-5 text-primary mt-0.5" />
                        )}
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">Modificado em {doc.modifiedAt}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Abrir</Button>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  <FileText className="h-4 w-4 mr-2" />
                  Ver Todos os Documentos Recentes
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Documents;
