import { useEffect, useState } from "react";
import { Users, Target, Zap, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { getDashboard, DashboardKPI } from "../api/dashboardApi";

// Map string → Icon Component
const IconMap: Record<string, any> = {
  users: Users,
  target: Target,
  zap: Zap,
  clock: Clock,
  trending_up: TrendingUp,
  alert: AlertTriangle,
};

export function KPIRow({ platform, region, featureName }: {
  platform?: string | null;
  region?: string | null;
  featureName?: string | null;
}) {
  const [kpis, setKpis] = useState<DashboardKPI[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await getDashboard(platform, region, featureName);

      if (res.success && res.data?.cards?.overall) {
        const overall = res.data.cards.overall;

        
        const mapped = Object.keys(overall).map(key => {
          const item = overall[key];

          return {
            label: item.title,
            value: item.value,
            subvalue: item.sub_value,
            change: item.change || "",         
            trend: (item.trend === "up" || item.trend === "down") ? item.trend : "up",     
            icon: item.icon || "users",        
            color: item.color || "blue"         
          };
        });

        setKpis(mapped);
      }
    } catch (err) {
      console.error("Failed to load KPI dashboard", err);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, [platform, region, featureName]);


  if (loading) {
    return <div className="text-center py-6 text-slate-500">Loading KPIs...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi, i) => {
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
