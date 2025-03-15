
import React from "react";
import { Calendar, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Dados de exemplo para tarefas próximas
const upcomingTasksData = [
  {
    id: "1",
    title: "Audiência - Maria Silva",
    description: "Processo nº 0001234-12.2023.8.26.0100",
    date: "Hoje, 14:30",
    priority: "alta"
  },
  {
    id: "2",
    title: "Prazo - Contestação",
    description: "Processo nº 0002345-23.2023.8.26.0100",
    date: "Amanhã, 23:59",
    priority: "alta"
  },
  {
    id: "3",
    title: "Reunião - João Pereira",
    description: "Discussão de estratégia para o caso",
    date: "28/07/2023, 10:00",
    priority: "média"
  },
  {
    id: "4",
    title: "Revisão - Contrato Tech Solutions",
    description: "Análise final de contrato de prestação de serviços",
    date: "30/07/2023, 18:00",
    priority: "baixa"
  }
];

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

const UpcomingTasks: React.FC = () => {
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm animate-slide-up delay-200">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h3 className="font-medium">Tarefas Próximas</h3>
        </div>
        <span className="text-xs text-muted-foreground">Total: {upcomingTasksData.length}</span>
      </div>
      
      <div className="p-2">
        {upcomingTasksData.map((task) => (
          <div 
            key={task.id} 
            className="flex items-start justify-between p-3 hover:bg-muted/50 rounded-md transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                <button className="h-5 w-5 rounded-full border border-muted-foreground/30 flex items-center justify-center hover:bg-primary/10 transition-colors">
                  <Check className="h-3 w-3 text-transparent hover:text-primary" />
                </button>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{task.title}</span>
                <span className="text-xs text-muted-foreground">{task.description}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{task.date}</span>
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full border",
                getPriorityColor(task.priority)
              )}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-border">
        <button className="text-sm text-primary hover:text-primary/80 transition-colors w-full text-center">
          Ver todas as tarefas
        </button>
      </div>
    </div>
  );
};

export default UpcomingTasks;
