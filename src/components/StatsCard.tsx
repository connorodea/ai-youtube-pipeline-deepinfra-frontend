import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export const StatsCard = ({ title, value, icon: Icon, trend, trendUp }: StatsCardProps) => {
  return (
    <Card className="border border-border">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-semibold text-foreground tracking-tight">
              {value}
            </p>
            {trend && (
              <p className={`text-xs font-medium ${trendUp ? 'text-success' : 'text-destructive'}`}>
                {trend}
              </p>
            )}
          </div>
          <div className="p-3 rounded-lg bg-muted">
            <Icon className="h-5 w-5 text-foreground" />
          </div>
        </div>
      </div>
    </Card>
  );
};
