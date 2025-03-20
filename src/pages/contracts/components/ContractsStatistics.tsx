
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePen, AlertTriangle, Clock, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContractsContext, getPriorityColor } from "../context/ContractsContext";

const ContractsStatistics: React.FC = () => {
  const { contractAlerts } = useContractsContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Alertas Contratuais</CardTitle>
          <CardDescription>
            Obrigações e prazos importantes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contractAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between p-3 hover:bg-muted/50 rounded-md">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium">{alert.contract}</p>
                    <p className="text-sm">{alert.client}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{alert.date}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full border",
                    getPriorityColor(alert.priority)
                  )}>
                    {alert.type}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Check className="h-3 w-3 text-green-500" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <X className="h-3 w-3 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Análise Contratual</CardTitle>
          <CardDescription>
            Estatísticas e métricas dos contratos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Por Status</p>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Ativos</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Pendentes</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Finalizados</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Cancelados</span>
                  <span className="text-sm font-medium">5%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <div className="mt-2">
                <p className="text-2xl font-bold">R$ 125.000,00</p>
                <p className="text-xs text-muted-foreground mt-1">Em contratos ativos</p>
                
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="flex justify-between">
                    <span className="text-sm">Média por contrato</span>
                    <span className="text-sm font-medium">R$ 31.250,00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            <FilePen className="h-4 w-4 mr-2" />
            Gerar Relatório de Contratos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractsStatistics;
