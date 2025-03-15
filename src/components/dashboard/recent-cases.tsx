
import React from "react";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

// Dados de exemplo para processos recentes
const recentCasesData = [
  {
    id: "1",
    number: "0001234-12.2023.8.26.0100",
    client: "Maria Silva",
    type: "Cível",
    date: "Há 3 dias",
    stage: "Inicial"
  },
  {
    id: "2",
    number: "0002345-23.2023.8.26.0100",
    client: "Tech Solutions Ltda.",
    type: "Trabalhista",
    date: "Há 5 dias",
    stage: "Recursal"
  },
  {
    id: "3",
    number: "0003456-34.2023.8.26.0100",
    client: "João Pereira",
    type: "Cível",
    date: "Há 1 semana",
    stage: "Execução"
  },
  {
    id: "4",
    number: "0004567-45.2023.8.26.0100",
    client: "Construções Rápidas S.A.",
    type: "Administrativo",
    date: "Há 2 semanas",
    stage: "Conhecimento"
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

const RecentCases: React.FC = () => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm animate-slide-up delay-100">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Processos Recentes</h3>
        </div>
        <span className="text-xs text-muted-foreground">Total: {recentCasesData.length}</span>
      </div>
      
      <div className="p-2">
        {recentCasesData.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="font-medium">{item.number}</span>
              <span className="text-xs text-muted-foreground">{item.client} • {item.type}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{item.date}</span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full border",
                getStageColor(item.stage)
              )}>
                {item.stage}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-border">
        <button className="text-sm text-primary hover:text-primary/80 transition-colors w-full text-center">
          Ver todos os processos
        </button>
      </div>
    </div>
  );
};

export default RecentCases;
