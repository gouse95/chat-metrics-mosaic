
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertTriangle, Check } from 'lucide-react';
import { formatCompactNumber, formatNumber } from '@/utils/formatters';

interface GuardrailsData {
  name: string;
  value: number;
  color: string;
}

interface GuardrailsSectionProps {
  title: string;
  data: Record<string, number>;
  totalEvents: number;
  isLoading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
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

const COLORS = [
  '#f97316', // orange
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#10b981', // green
];

export function GuardrailsSection({ 
  title, 
  data, 
  totalEvents,
  isLoading = false 
}: GuardrailsSectionProps) {
  const chartData: GuardrailsData[] = Object.entries(data).map(([name, value], index) => ({
    name,
    value,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-orange-500" />
              {title}
            </CardTitle>
            <CardDescription>
              Total Guardrail Events: {formatNumber(totalEvents)}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center p-2 rounded-lg bg-background">
                  <div 
                    className="w-3 h-3 rounded-full mr-3" 
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatNumber(item.value)}</p>
                    <p className="text-xs text-muted-foreground">
                      {((item.value / totalEvents) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
