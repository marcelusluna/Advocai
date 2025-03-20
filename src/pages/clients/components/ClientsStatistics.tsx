
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useClientsContext } from "../context/ClientsContext";

const ClientsStatistics: React.FC = () => {
  const { clients } = useClientsContext();

  return (
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
            {clients.slice(0, 3).map((client) => (
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
  );
};

export default ClientsStatistics;
