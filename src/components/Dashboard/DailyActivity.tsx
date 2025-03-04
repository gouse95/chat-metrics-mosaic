
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';
import { formatNumber, formatCompactNumber } from '@/utils/formatters';

interface DailyActivityData {
  day: string;
  message_count: number;
}

interface DailyActivityProps {
  data: DailyActivityData[];
  isLoading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="font-medium">{new Date(label).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</p>
        <p className="text-primary">
          Messages: {formatNumber(payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
};

export function DailyActivity({ 
  data,
  isLoading = false 
}: DailyActivityProps) {
  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-500" />
              Daily Message Activity
            </CardTitle>
            <CardDescription>
              Volume of messages per day
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
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
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
                  dataKey="message_count" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
