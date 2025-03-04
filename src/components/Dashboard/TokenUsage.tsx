
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Coins, Gauge } from 'lucide-react';
import { formatNumber, formatCompactNumber } from '@/utils/formatters';

interface TokenUsageProps {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  ratio: number;
  dailyTrend: {
    day: string;
    daily_tokens: number;
  }[];
  isLoading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="text-sm font-medium">{new Date(label).toLocaleDateString()}</p>
        <p className="text-sm text-primary">{`Tokens: ${formatNumber(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

export function TokenUsage({
  promptTokens,
  completionTokens,
  totalTokens,
  ratio,
  dailyTrend,
  isLoading = false
}: TokenUsageProps) {
  // Calculate percentages for the token distribution
  const promptPercentage = Math.round((promptTokens / totalTokens) * 100);
  const completionPercentage = Math.round((completionTokens / totalTokens) * 100);

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-amber-500" />
              Token Usage Analytics
            </CardTitle>
            <CardDescription>
              Total usage: {formatCompactNumber(totalTokens)} tokens
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-6">
            <div className="h-8 w-full shimmer rounded-md"></div>
            <div className="h-8 w-full shimmer rounded-md"></div>
            <div className="h-[200px] w-full shimmer rounded-lg"></div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Prompt Tokens</div>
                <div className="font-medium">{formatNumber(promptTokens)} ({promptPercentage}%)</div>
              </div>
              <Progress value={promptPercentage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>Completion Tokens</div>
                <div className="font-medium">{formatNumber(completionTokens)} ({completionPercentage}%)</div>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            
            <div className="rounded-lg border p-4 bg-muted/20">
              <div className="flex items-center gap-3">
                <Gauge className="h-5 w-5 text-primary" />
                <div className="font-medium">Prompt to Completion Ratio</div>
                <div className="ml-auto font-semibold">{ratio.toFixed(2)}</div>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3">Daily Token Usage Trend</h4>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dailyTrend}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      tickFormatter={formatCompactNumber}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <defs>
                      <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="daily_tokens" 
                      stroke="hsl(var(--primary))" 
                      fillOpacity={1} 
                      fill="url(#colorTokens)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
