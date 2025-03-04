import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { stringToColor, formatCompactNumber } from '@/utils/formatters';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon } from 'lucide-react';

interface ChartSectionProps {
  title: string;
  description?: string;
  data: any[];
  dataKey: string;
  nameKey: string;
  secondaryData?: { dataKey: string; name: string; color: string }[];
  isLoading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`tooltip-item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${formatCompactNumber(entry.value)}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function ChartSection({
  title,
  description,
  data,
  dataKey,
  nameKey,
  secondaryData,
  isLoading = false
}: ChartSectionProps) {
  const [chartType, setChartType] = useState('bar');
  
  const processedData = useMemo(() => {
    if (!data || !data.length) return [];
    return data.map(item => {
      if (typeof item[nameKey] === 'string' && item[nameKey].length > 15) {
        return {
          ...item,
          [nameKey]: item[nameKey].substring(0, 15) + '...'
        };
      }
      return item;
    });
  }, [data, nameKey]);

  // Colors for the pie chart
  const COLORS = processedData.map((entry) => stringToColor(entry[nameKey]));

  return (
    <Card className="animate-fadeIn">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <Tabs defaultValue="bar" value={chartType} onValueChange={setChartType}>
            <TabsList className="grid grid-cols-3 w-[180px]">
              <TabsTrigger value="bar">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span className="sr-only">Bar</span>
              </TabsTrigger>
              <TabsTrigger value="line">
                <LineChartIcon className="h-4 w-4 mr-1" />
                <span className="sr-only">Line</span>
              </TabsTrigger>
              <TabsTrigger value="pie">
                <PieChartIcon className="h-4 w-4 mr-1" />
                <span className="sr-only">Pie</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="h-44 w-full shimmer rounded-lg"></div>
          </div>
        ) : (
          <div className="h-[300px] w-full">
            {chartType === 'bar' && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={processedData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey={nameKey} 
                    tick={{ fontSize: 12 }} 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={formatCompactNumber}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey={dataKey} 
                    name={dataKey}
                    fill="hsl(var(--primary))" 
                    radius={[4, 4, 0, 0]}
                  />
                  {secondaryData && secondaryData.map((item, index) => (
                    <Bar 
                      key={`secondary-data-${index}`}
                      dataKey={item.dataKey} 
                      name={item.name}
                      fill={item.color} 
                      radius={[4, 4, 0, 0]}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            )}
            
            {chartType === 'line' && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={processedData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey={nameKey} 
                    tick={{ fontSize: 12 }} 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={formatCompactNumber}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <defs>
                    <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey={dataKey} 
                    name={dataKey}
                    stroke="hsl(var(--primary))" 
                    fillOpacity={1} 
                    fill="url(#colorPrimary)" 
                  />
                  {secondaryData && secondaryData.map((item, index) => {
                    const gradientId = `color${index}`;
                    return (
                      <React.Fragment key={`secondary-area-${index}`}>
                        <defs>
                          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={item.color} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={item.color} stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey={item.dataKey} 
                          name={item.name}
                          stroke={item.color} 
                          fillOpacity={1} 
                          fill={`url(#${gradientId})`} 
                        />
                      </React.Fragment>
                    );
                  })}
                </AreaChart>
              </ResponsiveContainer>
            )}
            
            {chartType === 'pie' && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={processedData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey={dataKey}
                    nameKey={nameKey}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {processedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
