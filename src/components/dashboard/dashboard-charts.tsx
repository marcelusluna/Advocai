
// This file has errors with missing properties in tooltip components.
// We need to fix it by ensuring all required properties are provided.

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
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for the charts
const areaChartData = [
  { name: "Jan", cases: 40 },
  { name: "Feb", cases: 30 },
  { name: "Mar", cases: 45 },
  { name: "Apr", cases: 50 },
  { name: "May", cases: 35 },
  { name: "Jun", cases: 60 },
  { name: "Jul", cases: 75 },
  { name: "Aug", cases: 65 },
];

const revenueData = [
  { name: "Jan", total: 1500 },
  { name: "Feb", total: 2300 },
  { name: "Mar", total: 1800 },
  { name: "Apr", total: 3500 },
  { name: "May", total: 2800 },
  { name: "Jun", total: 4200 },
  { name: "Jul", total: 3800 },
  { name: "Aug", total: 4700 },
];

const pieChartData = [
  { name: "Civil", value: 45 },
  { name: "Família", value: 25 },
  { name: "Trabalhista", value: 20 },
  { name: "Outros", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Custom tooltip component with all required properties
const CustomTooltip = ({ active, payload, label, formatter, valueLabel }: { 
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
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
        <p className="text-gray-600 text-xs">{`${label}`}</p>
        <p className="text-gray-900 font-medium">{`${valueLabel}: ${displayValue}`}</p>
      </div>
    );
  }

  return null;
};

export const CasesChart = () => {
  return (
    <Card className="col-span-4 w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Casos por Mês</CardTitle>
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
                bottom: 0,
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
              />
              <Tooltip 
                content={
                  <CustomTooltip 
                    active={false} 
                    payload={[]} 
                    label="" 
                    valueLabel="Casos" 
                  />
                } 
              />
              <Area
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
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  return (
    <Card className="col-span-4 w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Receita Mensal</CardTitle>
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
                bottom: 0,
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
                content={
                  <CustomTooltip 
                    active={false} 
                    payload={[]} 
                    label="" 
                    formatter={(value) => formatCurrency(value)} 
                    valueLabel="Receita" 
                  />
                } 
              />
              <Bar 
                dataKey="total" 
                fill="#3b82f6" 
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
        <CardTitle className="text-lg font-medium">Tipos de Casos</CardTitle>
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
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                content={
                  <CustomTooltip 
                    active={false} 
                    payload={[]} 
                    label="" 
                    formatter={(value) => `${value}%`} 
                    valueLabel="Porcentagem" 
                  />
                } 
              />
              <Legend />
            </PieChart>
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
    </div>
  );
};

export default DashboardCharts;
