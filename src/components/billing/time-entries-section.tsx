
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

// Dados de horas trabalhadas
const timeEntriesData = [
  {
    id: "1",
    description: "Reunião com cliente",
    client: "Tech Solutions Ltda.",
    date: "22/06/2023",
    time: "2.5",
    rate: "R$ 350,00",
    amount: "R$ 875,00",
    attorney: "Dr. Carlos Santos"
  },
  {
    id: "2",
    description: "Elaboração de petição",
    client: "Maria Silva",
    date: "23/06/2023",
    time: "3.0",
    rate: "R$ 350,00",
    amount: "R$ 1.050,00",
    attorney: "Dra. Ana Oliveira"
  },
  {
    id: "3",
    description: "Revisão contratual",
    client: "Construções Rápidas S.A.",
    date: "24/06/2023",
    time: "1.5",
    rate: "R$ 400,00",
    amount: "R$ 600,00",
    attorney: "Dr. Rafael Lima"
  }
];

const TimeEntriesSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Controle de Horas</CardTitle>
        <CardDescription>
          Registro de horas trabalhadas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeEntriesData.map((entry) => (
            <div key={entry.id} className="flex items-start justify-between p-3 hover:bg-muted/50 rounded-md">
              <div>
                <p className="font-medium">{entry.description}</p>
                <p className="text-sm text-muted-foreground">{entry.client}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{entry.date}</p>
                  <Clock className="h-3 w-3 text-muted-foreground ml-2" />
                  <p className="text-xs text-muted-foreground">{entry.time}h</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{entry.amount}</p>
                <p className="text-xs text-muted-foreground">{entry.attorney}</p>
              </div>
            </div>
          ))}
          
          <Button className="w-full">
            <Clock className="h-4 w-4 mr-2" />
            Registrar Horas
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeEntriesSection;
