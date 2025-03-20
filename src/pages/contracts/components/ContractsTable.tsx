
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Eye, Edit, Download, AlertTriangle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContractsContext, getStatusColor } from "../context/ContractsContext";

const ContractsTable: React.FC = () => {
  const { filteredContracts, searchTerm, handleSearch } = useContractsContext();

  return (
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
                value={searchTerm}
                onChange={handleSearch}
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
                {filteredContracts.length > 0 ? (
                  filteredContracts.map((contract) => (
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                      Nenhum contrato encontrado
                    </TableCell>
                  </TableRow>
                )}
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
  );
};

export default ContractsTable;
