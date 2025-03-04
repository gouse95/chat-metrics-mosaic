
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { LoadingState } from './LoadingState';

// Use the original ChartSection implementation but with proper React imports
// This is a temporary file to be used until the original can be updated

interface ChartSectionProps {
  title: string;
  description?: string;
  data: { [key: string]: any }[];
  nameKey: string;
  dataKey: string;
  isLoading?: boolean;
  chartType?: 'bar' | 'pie';
  className?: string;
}

export function ChartSection({
  title,
  description,
  data,
  nameKey,
  dataKey,
  isLoading = false,
  chartType = 'bar',
  className,
}: ChartSectionProps) {
  // No data or loading state
  if (isLoading) {
    return (
      <Card className={cn("flex flex-col", className)}>
        <CardHeader className="pb-2">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <LoadingState message="Loading chart data..." />
        </CardContent>
      </Card>
    );
  }

  // Empty data state
  if (!data || data.length === 0) {
    return (
      <Card className={cn("flex flex-col", className)}>
        <CardHeader className="pb-2">
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center text-center py-10 space-y-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-muted-foreground"
            >
              <rect width="8" height="14" x="8" y="6" rx="2" />
              <path d="M4 10h4" />
              <path d="M4 14h4" />
              <path d="M4 18h4" />
              <path d="M16 4v4" />
            </svg>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-semibold">No data available</h3>
            <p className="text-sm text-muted-foreground">
              There is no data to display for this chart at the moment.
            </p>
          </div>
          <Badge variant="outline" className="mt-4">
            Check back later
          </Badge>
        </CardContent>
      </Card>
    );
  }

  // Common chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#5DADE2', '#48C9B0', '#F4D03F', '#EB984E'];

  const renderChart = () => {
    if (chartType === 'pie') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: any) => [`${value}`, 'Value']}
              labelFormatter={(label: any) => `${label}`}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 65,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey={nameKey} 
            angle={-45} 
            textAnchor="end" 
            tick={{ fontSize: 12 }}
            height={60} 
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#8884d8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        {renderChart()}
      </CardContent>
    </Card>
  );
}
