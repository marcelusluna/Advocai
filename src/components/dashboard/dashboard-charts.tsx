
import React from "react";
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Enhanced sample data for the charts with more realistic values
const areaChartData = [
  { name: "Jan", cases: 42, growth: 5 },
  { name: "Fev", cases: 38, growth: -9 },
  { name: "Mar", cases: 45, growth: 18 },
  { name: "Abr", cases: 53, growth: 18 },
  { name: "Mai", cases: 49, growth: -8 },
  { name: "Jun", cases: 62, growth: 26 },
  { name: "Jul", cases: 78, growth: 26 },
  { name: "Ago", cases: 71, growth: -9 },
];

const revenueData = [
  { name: "Jan", total: 15500, expenses: 8200, profit: 7300 },
  { name: "Fev", total: 23400, expenses: 12600, profit: 10800 },
  { name: "Mar", total: 18300, expenses: 10500, profit: 7800 },
  { name: "Abr", total: 35800, expenses: 18200, profit: 17600 },
  { name: "Mai", total: 28500, expenses: 14800, profit: 13700 },
  { name: "Jun", total: 42600, expenses: 22400, profit: 20200 },
  { name: "Jul", total: 38900, expenses: 19700, profit: 19200 },
  { name: "Ago", total: 47500, expenses: 23800, profit: 23700 },
];

const pieChartData = [
  { name: "Civil", value: 45, revenue: 168500 },
  { name: "Família", value: 25, revenue: 93600 },
  { name: "Trabalhista", value: 20, revenue: 74900 },
  { name: "Outros", value: 10, revenue: 37400 },
];

const clientAcquisitionData = [
  { name: "Jan", novos: 8, recorrentes: 22 },
  { name: "Fev", novos: 12, recorrentes: 26 },
  { name: "Mar", novos: 7, recorrentes: 31 },
  { name: "Abr", novos: 15, recorrentes: 35 },
  { name: "Mai", novos: 9, recorrentes: 40 },
  { name: "Jun", novos: 18, recorrentes: 44 },
  { name: "Jul", novos: 14, recorrentes: 49 },
  { name: "Ago", novos: 11, recorrentes: 54 },
];

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

// Enhanced custom tooltip component with proper formatting
const CustomTooltip = ({ 
  active, 
  payload, 
  label, 
  formatter, 
  valueLabel 
}: { 
  active?: boolean; 
  payload?: any[]; 
  label?: string;
  formatter?: (value: any) => string;
  valueLabel: string;
}) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const displayValue = formatter ? formatter(value) : value;
    
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="text-gray-600 text-xs font-medium">{`${label}`}</p>
        <p className="text-gray-900 font-medium text-sm">{`${valueLabel}: ${displayValue}`}</p>
      </div>
    );
  }

  return null;
};

// Format currency in BRL
const formatCurrency = (value: number) => 
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

// Format percentage with sign
const formatPercentage = (value: number) => 
  `${value > 0 ? '+' : ''}${value}%`;

export const CasesChart = () => {
  return (
    <Card className="col-span-4 sm:col-span-2 w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Evolução de Casos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={areaChartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                domain={[0, 'dataMax + 10']}
              />
              <Tooltip 
                content={<CustomTooltip valueLabel="Casos" />} 
              />
              <Legend wrapperStyle={{ bottom: 0 }} />
              <Area
                name="Número de Casos"
                type="monotone"
                dataKey="cases"
                stroke="#3b82f6"
                fill="url(#colorCases)"
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const RevenueChart = () => {
  return (
    <Card className="col-span-4 sm:col-span-2 w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Receita e Lucro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={revenueData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${formatCurrency(value).slice(0, -3)}K`}
              />
              <Tooltip 
                content={<CustomTooltip valueLabel="Valor" formatter={(value) => formatCurrency(value)} />} 
              />
              <Legend wrapperStyle={{ bottom: 0 }} />
              <Bar 
                name="Receita Total" 
                dataKey="total" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                name="Lucro Líquido" 
                dataKey="profit" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const CaseTypesPieChart = () => {
  return (
    <Card className="col-span-4 md:col-span-2 w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Tipos de Casos por Receita</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, entry) => {
                  // Check if the tooltip is showing percentage or revenue
                  if (name === "value") {
                    return [`${value}%`, "Porcentagem"];
                  } else {
                    return [formatCurrency(entry?.payload?.revenue || 0), "Receita Anual"];
                  }
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const ClientAcquisitionChart = () => {
  return (
    <Card className="col-span-4 md:col-span-2 w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Aquisição de Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={clientAcquisitionData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                content={<CustomTooltip valueLabel="Clientes" />} 
              />
              <Legend wrapperStyle={{ bottom: 0 }} />
              <Line 
                name="Novos Clientes"
                type="monotone" 
                dataKey="novos" 
                stroke="#F59E0B" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                name="Clientes Recorrentes"
                type="monotone" 
                dataKey="recorrentes" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <CasesChart />
      <RevenueChart />
      <CaseTypesPieChart />
      <ClientAcquisitionChart />
    </div>
  );
};

export default DashboardCharts;
