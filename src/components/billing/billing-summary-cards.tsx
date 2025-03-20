
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Clock, AlertCircle, ArrowUpRight } from "lucide-react";

const BillingSummaryCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recebido (Mês)</CardTitle>
          <CardDescription>
            Honorários recebidos neste mês
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-500 mr-2" />
            <div>
              <p className="text-2xl font-bold">R$ 20.000,00</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                15% em relação ao mês anterior
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">A Receber</CardTitle>
          <CardDescription>
            Honorários pendentes de recebimento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500 mr-2" />
            <div>
              <p className="text-2xl font-bold">R$ 25.000,00</p>
              <p className="text-xs text-muted-foreground mt-1">
                5 faturas pendentes
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Atrasados</CardTitle>
          <CardDescription>
            Honorários com pagamento atrasado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-red-500 mr-2" />
            <div>
              <p className="text-2xl font-bold">R$ 2.000,00</p>
              <p className="text-xs text-muted-foreground mt-1">
                1 fatura atrasada
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingSummaryCards;
