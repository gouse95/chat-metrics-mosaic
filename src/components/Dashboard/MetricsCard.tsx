
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

const metricCardVariants = cva(
  "metrics-card group relative overflow-hidden transition-all duration-300",
  {
    variants: {
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
      trend: {
        up: "",
        down: "",
        neutral: "",
      },
    },
    defaultVariants: {
      size: "default",
      trend: "neutral",
    },
  }
);

export interface MetricsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricCardVariants> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trendValue?: number;
  trendLabel?: string;
  isLoading?: boolean;
}

export function MetricsCard({
  className,
  title,
  value,
  icon,
  trend,
  trendValue,
  trendLabel,
  size,
  isLoading = false,
  ...props
}: MetricsCardProps) {
  let trendColor = "text-gray-500";
  let TrendIcon = Minus;

  if (trend === "up") {
    trendColor = "text-emerald-500";
    TrendIcon = ArrowUpRight;
  } else if (trend === "down") {
    trendColor = "text-rose-500";
    TrendIcon = ArrowDownRight;
  }

  return (
    <div
      className={cn(metricCardVariants({ size, trend, className }))}
      {...props}
    >
      {isLoading ? (
        <div className="space-y-3">
          <div className="h-5 w-1/2 shimmer"></div>
          <div className="h-9 w-3/4 shimmer"></div>
          <div className="h-5 w-2/3 shimmer"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {icon && (
              <div className="w-8 h-8 flex items-center justify-center rounded-md bg-primary/10 text-primary">
                {icon}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-semibold tracking-tight">{value}</div>
            {(trendValue !== undefined || trendLabel) && (
              <div className="flex items-center mt-1 gap-1">
                {trendValue !== undefined && (
                  <div className={`flex items-center ${trendColor}`}>
                    <TrendIcon className="h-4 w-4 mr-1" />
                    <span className="text-sm font-medium">{trendValue}%</span>
                  </div>
                )}
                {trendLabel && (
                  <span className="text-sm text-muted-foreground">{trendLabel}</span>
                )}
              </div>
            )}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/10 group-hover:bg-primary/20 transition-colors"></div>
        </>
      )}
    </div>
  );
}
