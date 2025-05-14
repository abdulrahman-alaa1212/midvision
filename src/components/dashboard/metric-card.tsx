import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  metricType?: "positive" | "neutral" | "negative";
}

export function MetricCard({ title, value, description, icon: Icon, metricType = "neutral" }: MetricCardProps) {
  const valueColor = {
    positive: "text-[hsl(var(--metric-positive))]",
    neutral: "text-foreground",
    negative: "text-[hsl(var(--metric-negative))]",
  }[metricType];

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={cn("text-3xl font-bold", valueColor)}>{value}</div>
        {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
      </CardContent>
    </Card>
  );
}
