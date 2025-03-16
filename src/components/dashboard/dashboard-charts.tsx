
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dados fictícios para os gráficos
const processosData = [
  { name: "Jan", processos: 12 },
  { name: "Fev", processos: 19 },
  { name: "Mar", processos: 15 },
  { name: "Abr", processos: 23 },
  { name: "Mai", processos: 28 },
  { name: "Jun", processos: 17 },
  { name: "Jul", processos: 22 },
];

const faturamentoData = [
  { name: "Jan", valor: 32000 },
  { name: "Fev", valor: 28000 },
  { name: "Mar", valor: 34500 },
  { name: "Abr", valor: 39000 },
  { name: "Mai", valor: 42000 },
  { name: "Jun", valor: 47000 },
  { name: "Jul", valor: 45280 },
];

const tiposProcessosData = [
  { name: "Cível", value: 45 },
  { name: "Trabalhista", value: 25 },
  { name: "Tributário", value: 15 },
  { name: "Criminal", value: 10 },
  { name: "Administrativo", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const DashboardCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg">Processos Abertos por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={processosData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} processos`, "Quantidade"]} />
                <Bar dataKey="processos" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in delay-100">
        <CardHeader>
          <CardTitle className="text-lg">Faturamento Mensal (R$)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={faturamentoData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, "Valor"]} />
                <Line type="monotone" dataKey="valor" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in delay-200 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Distribuição por Tipo de Processo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tiposProcessosData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {tiposProcessosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} processos`, "Quantidade"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
