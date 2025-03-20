
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Mail, MoreHorizontal, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { useClientsContext, getStatusColor } from "../context/ClientsContext";

const ClientsTable: React.FC = () => {
  const { filteredClients, searchTerm, handleSearch } = useClientsContext();

  return (
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
                value={searchTerm}
                onChange={handleSearch}
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
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      Nenhum cliente encontrado
                    </TableCell>
                  </TableRow>
                )}
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
  );
};

export default ClientsTable;
