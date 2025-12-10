import { Users, Target, Zap, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const IconMap: Record<string, any> = {
  users: Users,
  target: Target,
  zap: Zap,
  clock: Clock,
  trending_up: TrendingUp,
  alert: AlertTriangle,
};

export interface KPIItem {
  title: string;
  value: string;
  sub_value: string;
  change?: string;
  trend?: "up" | "down";
  icon?: string;
  color?: string;
}

interface KPIRowProps {
  filters?: any;
  kpis?: Record<string, KPIItem> | null;
}

export function KPIRow({ kpis }: KPIRowProps) {
  if (!kpis) {
    return (
      <div className="text-center py-6 text-slate-500">
        No KPI data available
      </div>
    );
  }

  // Convert incoming object → array for UI
  const mapped = Object.keys(kpis).map((key) => {
    const item = kpis[key];

    return {
      label: item.title,
      value: item.value,
      subvalue: item.sub_value,
      change: item.change || "",
      trend: item.trend === "down" ? "down" : "up",
      icon: item.icon || "users",
      color: item.color || "blue",
    };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {mapped.map((kpi, i) => {
        const Icon = IconMap[kpi.icon] || Users;
        const colorClass = `text-${kpi.color}-600`;
        const bgClass = `bg-${kpi.color}-50`;

        return (
          <Card key={i} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className={`${bgClass} ${colorClass} p-2 rounded-lg`}>
                <Icon className="w-4 h-4" />
              </div>

              <Badge
                variant={kpi.trend === "up" ? "default" : "secondary"}
                className="text-xs"
              >
                {kpi.change}
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-slate-600">{kpi.label}</p>
              <p className={colorClass}>{kpi.value}</p>
              <p className="text-xs text-slate-500">{kpi.subvalue}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
