
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, FileSpreadsheet } from "lucide-react";

const FinancialAnalysis: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise Financeira</CardTitle>
        <CardDescription>
          Visão geral do faturamento por período
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">Faturamento por Mês</p>
            <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
          </div>
          
          <div className="space-y-2">
            <div>
              <div className="flex justify-between items-center text-xs">
                <span>Janeiro</span>
                <span>R$ 18.500,00</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div className="bg-primary h-2 rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs">
                <span>Fevereiro</span>
                <span>R$ 21.000,00</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs">
                <span>Março</span>
                <span>R$ 25.500,00</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs">
                <span>Abril</span>
                <span>R$ 19.800,00</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div className="bg-primary h-2 rounded-full" style={{ width: '66%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs">
                <span>Maio</span>
                <span>R$ 22.300,00</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div className="bg-primary h-2 rounded-full" style={{ width: '74%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs">
                <span>Junho</span>
                <span>R$ 30.000,00</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between gap-4">
          <Button variant="outline" className="flex-1">
            <BarChart className="h-4 w-4 mr-2" />
            Relatórios
          </Button>
          <Button variant="outline" className="flex-1">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Exportar Dados
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialAnalysis;
