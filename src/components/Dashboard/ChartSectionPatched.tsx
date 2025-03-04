
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { stringToColor } from '@/utils/formatters';

interface ChartSectionProps {
  title: string;
  description?: string;
  data: { [key: string]: any }[];
  dataKey: string;
  nameKey: string;
  isLoading?: boolean;
}

export function ChartSection({
  title,
  description,
  data,
  dataKey,
  nameKey,
  isLoading = false,
}: ChartSectionProps) {
  // If loading, show a skeleton state
  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="h-6 w-1/3 shimmer mb-2"></div>
          <div className="h-4 w-1/2 shimmer"></div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="h-[300px] w-full shimmer"></div>
        </CardContent>
      </Card>
    );
  }

  // If no data, show an empty state
  if (!data || data.length === 0) {
    return (
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-center text-muted-foreground">
            <p>No data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-md shadow-md p-3">
          <p className="font-medium">{payload[0].payload[nameKey]}</p>
          <p className="text-sm text-muted-foreground">
            {`${dataKey}: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 60,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey={nameKey}
                angle={-45}
                textAnchor="end"
                height={70}
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={stringToColor(entry[nameKey])} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
