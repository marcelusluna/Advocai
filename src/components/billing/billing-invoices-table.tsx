
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, Download, Mail, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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

const BillingInvoicesTable: React.FC = () => {
  return (
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
  );
};

export default BillingInvoicesTable;
