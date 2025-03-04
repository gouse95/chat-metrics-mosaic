
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Cpu } from 'lucide-react';
import { formatNumber } from '@/utils/formatters';

interface ModelData {
  name: string;
  value: number;
  color: string;
}

interface ModelDistributionProps {
  data: Record<string, number>;
  isLoading?: boolean;
}

const COLORS = {
  'gpt-4': '#8b5cf6',
  'gpt-3.5': '#3b82f6',
  'lamma': '#10b981',
  'mixtral': '#f97316',
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="font-medium">{payload[0].name}</p>
        <p style={{ color: payload[0].payload.color }}>
          Count: {formatNumber(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
};

export function ModelDistribution({ 
  data,
  isLoading = false 
}: ModelDistributionProps) {
  const chartData: ModelData[] = Object.entries(data).map(([name, value]) => ({
    name,
    value,
    color: COLORS[name as keyof typeof COLORS] || '#6c757d'
  }));

  const total = Object.values(data).reduce((sum, val) => sum + val, 0);

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-blue-500" />
              Model Distribution
            </CardTitle>
            <CardDescription>
              Usage across different AI models
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="h-44 w-full shimmer rounded-lg"></div>
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  formatter={(value, entry, index) => {
                    const { payload } = entry as any;
                    const percentage = ((payload.value / total) * 100).toFixed(1);
                    return `${value} (${percentage}%)`;
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
