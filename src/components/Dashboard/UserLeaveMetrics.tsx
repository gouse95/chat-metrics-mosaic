
import React from 'react';
import { UserMinus, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricsCard } from './MetricsCard';
import { formatNumber, formatPercent } from '@/utils/formatters';

interface UserLeaveMetricsProps {
  totalLeaves: number;
  averageLeaveDuration: number;
  leavePercentage: number;
  isLoading?: boolean;
}

export function UserLeaveMetrics({
  totalLeaves,
  averageLeaveDuration,
  leavePercentage,
  isLoading = false
}: UserLeaveMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <MetricsCard
        title="Total User Leaves"
        value={formatNumber(totalLeaves)}
        icon={<UserMinus className="h-5 w-5" />}
        trend="down"
        trendValue={5}
        trendLabel="vs last month"
        isLoading={isLoading}
      />
      <MetricsCard
        title="Average Leave Duration"
        value={`${averageLeaveDuration.toFixed(1)} days`}
        icon={<Clock className="h-5 w-5" />}
        isLoading={isLoading}
      />
      <MetricsCard
        title="User Leave Rate"
        value={formatPercent(leavePercentage)}
        icon={<Users className="h-5 w-5" />}
        trend={leavePercentage < 0.2 ? "down" : "up"}
        trendValue={leavePercentage < 0.2 ? 3 : 2}
        trendLabel="vs last month"
        isLoading={isLoading}
      />
    </div>
  );
}
