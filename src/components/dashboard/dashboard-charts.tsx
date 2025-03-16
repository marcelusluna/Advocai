
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-lg">Processos Abertos por Mês</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <BarChart
                data={processosData}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend 
                  content={<ChartLegendContent />} 
                  verticalAlign="bottom" 
                  height={36}
                />
                <Bar 
                  dataKey="processos" 
                  name="Processos" 
                  fill="var(--color-processos)" 
                  radius={[4, 4, 0, 0]} 
                />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in delay-100">
        <CardHeader>
          <CardTitle className="text-lg">Faturamento Mensal (R$)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <LineChart
                data={faturamentoData}
                margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    formatter={(value: number) => [`R$ ${value.toLocaleString()}`, "Valor"]} 
                  />} 
                />
                <Legend 
                  content={<ChartLegendContent />} 
                  verticalAlign="bottom" 
                  height={36}
                />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  name="Faturamento" 
                  stroke="var(--color-valor)" 
                  strokeWidth={2} 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="animate-fade-in delay-200 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Distribuição por Tipo de Processo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 flex items-center justify-center">
            <ChartContainer config={chartConfig}>
              <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Pie
                  data={tiposProcessosData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
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
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    formatter={(value: number) => [`${value} processos`, "Quantidade"]} 
                  />} 
                />
                <Legend
                  content={(props) => (
                    <div className="mt-4 flex flex-wrap justify-center gap-4">
                      {props.payload?.map((entry, index) => (
                        <div key={`legend-${index}`} className="flex items-center gap-2">
                          <div
                            className="h-3 w-3 rounded-sm"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-xs">{entry.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  verticalAlign="bottom"
                  height={48}
                />
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
