
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, UserPlus } from "lucide-react";
import { useClientsContext } from "../context/ClientsContext";

const ClientsHeader: React.FC = () => {
  const { handleNewClient } = useClientsContext();

  return (
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
  );
};

export default ClientsHeader;
