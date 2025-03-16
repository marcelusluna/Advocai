
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

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

// Configuração dos gráficos
const chartConfig = {
  processos: {
    label: "Processos",
    theme: {
      light: "#8884d8",
      dark: "#9b87f5",
    },
  },
  valor: {
    label: "Faturamento",
    theme: {
      light: "#82ca9d",
      dark: "#82ca9d",
    },
  },
  civel: {
    label: "Cível",
    theme: {
      light: "#0088FE",
      dark: "#0088FE",
    },
  },
  trabalhista: {
    label: "Trabalhista",
    theme: {
      light: "#00C49F",
      dark: "#00C49F",
    },
  },
  tributario: {
    label: "Tributário",
    theme: {
      light: "#FFBB28",
      dark: "#FFBB28",
    },
  },
  criminal: {
    label: "Criminal",
    theme: {
      light: "#FF8042",
      dark: "#FF8042",
    },
  },
  administrativo: {
    label: "Administrativo",
    theme: {
      light: "#8884d8",
      dark: "#8884d8",
    },
  },
};

const DashboardCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Gráfico de Processos */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Processos Abertos por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={processosData}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} processos`, "Quantidade"]} />
                <Legend 
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{ paddingTop: "10px" }}
                />
                <Bar 
                  dataKey="processos" 
                  name="Processos" 
                  fill="#8884d8" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Faturamento */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Faturamento Mensal (R$)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={faturamentoData}
                margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, "Valor"]} />
                <Legend 
                  verticalAlign="top"
                  height={36}
                  wrapperStyle={{ paddingTop: "10px" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  name="Faturamento" 
                  stroke="#82ca9d" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Tipos de Processos */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Distribuição por Tipo de Processo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <Pie
                  data={tiposProcessosData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {tiposProcessosData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      name={entry.name}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} processos`, "Quantidade"]} />
                <Legend 
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ paddingTop: "20px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
