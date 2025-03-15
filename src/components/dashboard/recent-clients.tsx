
import React from "react";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Dados de exemplo para clientes recentes
const recentClientsData = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria.silva@example.com",
    type: "Pessoa Física",
    date: "Há 2 dias",
    status: "ativo"
  },
  {
    id: "2",
    name: "Tech Solutions Ltda.",
    email: "contato@techsolutions.com",
    type: "Pessoa Jurídica",
    date: "Há 4 dias",
    status: "ativo"
  },
  {
    id: "3",
    name: "João Pereira",
    email: "joao.pereira@example.com",
    type: "Pessoa Física",
    date: "Há 1 semana",
    status: "pendente"
  },
  {
    id: "4",
    name: "Construções Rápidas S.A.",
    email: "contato@construcoesrapidas.com",
    type: "Pessoa Jurídica",
    date: "Há 2 semanas",
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

const RecentClients: React.FC = () => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm animate-slide-up">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Clientes Recentes</h3>
        </div>
        <span className="text-xs text-muted-foreground">Total: {recentClientsData.length}</span>
      </div>
      
      <div className="p-2">
        {recentClientsData.map((client) => (
          <div 
            key={client.id} 
            className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-medium">{client.name}</span>
              <span className="text-xs text-muted-foreground">{client.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{client.date}</span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full border",
                getStatusColor(client.status)
              )}>
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-border">
        <button className="text-sm text-primary hover:text-primary/80 transition-colors w-full text-center">
          Ver todos os clientes
        </button>
      </div>
    </div>
  );
};

export default RecentClients;
