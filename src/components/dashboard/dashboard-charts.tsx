
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, MoreHorizontal, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

const customTooltipStyle = {
  backgroundColor: "white",
  border: "1px solid #f0f0f0",
  padding: "8px 12px",
  borderRadius: "4px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
};

// Componente de tooltip personalizado
const CustomTooltip = ({ active, payload, label, formatter, valueLabel }) => {
  if (active && payload && payload.length) {
    const value = formatter 
      ? formatter(payload[0].value) 
      : payload[0].value;
      
    return (
      <div style={customTooltipStyle}>
        <p className="text-xs text-gray-500">{`${label}`}</p>
        <p className="text-sm font-medium">{`${valueLabel || payload[0].name}: ${value}`}</p>
      </div>
    );
  }
  return null;
};

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Gráfico de Processos */}
      <Card className="w-full bg-white shadow-sm border-gray-100">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium text-gray-700">Processos Mensais</CardTitle>
            <p className="text-xs text-gray-500 mt-0.5">Número de processos abertos por mês</p>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <RefreshCcw className="h-4 w-4 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Select defaultValue="last7Days">
              <SelectTrigger className="h-8 w-[140px] text-xs">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="yesterday">Ontem</SelectItem>
                <SelectItem value="last7Days">Últimos 7 dias</SelectItem>
                <SelectItem value="last30Days">Últimos 30 dias</SelectItem>
                <SelectItem value="thisMonth">Este mês</SelectItem>
                <SelectItem value="lastMonth">Mês passado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={processosData}
                margin={{ top: 5, right: 10, left: 0, bottom: 20 }}
                barSize={32}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#888' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#888' }}
                  dx={-10}
                />
                <Tooltip 
                  content={<CustomTooltip valueLabel="Processos" />}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                />
                <Legend 
                  verticalAlign="top" 
                  align="right"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs text-gray-600">{value}</span>}
                />
                <Bar 
                  dataKey="processos" 
                  name="Processos" 
                  fill="#0088FE" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Faturamento */}
      <Card className="w-full bg-white shadow-sm border-gray-100">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium text-gray-700">Faturamento Mensal</CardTitle>
            <p className="text-xs text-gray-500 mt-0.5">Valor de faturamento mensal (R$)</p>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <RefreshCcw className="h-4 w-4 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Select defaultValue="last7Days">
              <SelectTrigger className="h-8 w-[140px] text-xs">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="yesterday">Ontem</SelectItem>
                <SelectItem value="last7Days">Últimos 7 dias</SelectItem>
                <SelectItem value="last30Days">Últimos 30 dias</SelectItem>
                <SelectItem value="thisMonth">Este mês</SelectItem>
                <SelectItem value="lastMonth">Mês passado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={faturamentoData}
                margin={{ top: 5, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#888' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#888' }}
                  dx={-10}
                  tickFormatter={(value) => `R$${(value / 1000)}k`}
                />
                <Tooltip 
                  content={<CustomTooltip 
                    formatter={(value) => `R$ ${value.toLocaleString()}`} 
                    valueLabel="Valor"
                  />}
                  cursor={{ stroke: '#f0f0f0' }}
                />
                <Legend 
                  verticalAlign="top" 
                  align="right"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  formatter={(value) => <span className="text-xs text-gray-600">{value}</span>}
                />
                <Line 
                  type="monotone" 
                  dataKey="valor" 
                  name="Faturamento" 
                  stroke="#00C49F" 
                  strokeWidth={2} 
                  dot={{ r: 4, fill: "#00C49F", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#00C49F", stroke: "white", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico de Tipos de Processos */}
      <Card className="w-full bg-white shadow-sm border-gray-100 md:col-span-2">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium text-gray-700">Distribuição de Processos</CardTitle>
            <p className="text-xs text-gray-500 mt-0.5">Distribuição por tipo de processo</p>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <RefreshCcw className="h-4 w-4 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Select defaultValue="last7Days">
              <SelectTrigger className="h-8 w-[140px] text-xs">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="yesterday">Ontem</SelectItem>
                <SelectItem value="last7Days">Últimos 7 dias</SelectItem>
                <SelectItem value="last30Days">Últimos 30 dias</SelectItem>
                <SelectItem value="thisMonth">Este mês</SelectItem>
                <SelectItem value="lastMonth">Mês passado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[280px] w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tiposProcessosData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    dataKey="value"
                    nameKey="name"
                    labelLine={false}
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
                  <Tooltip 
                    content={<CustomTooltip 
                      formatter={(value) => `${value} processos`} 
                      valueLabel="Quantidade"
                    />}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="text-sm font-medium mb-4 text-gray-700">Tipos de Processos</h4>
              <div className="space-y-3">
                {tiposProcessosData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <span className="ml-auto text-sm text-gray-500">{item.value} ({((item.value / tiposProcessosData.reduce((acc, curr) => acc + curr.value, 0)) * 100).toFixed(0)}%)</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Total</span>
                  <span className="text-sm font-medium text-gray-700">
                    {tiposProcessosData.reduce((acc, curr) => acc + curr.value, 0)} processos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;
