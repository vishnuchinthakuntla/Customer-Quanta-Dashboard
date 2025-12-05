import { Users, Target, Zap, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const kpis = [
  {
    label: 'DAU / MAU',
    value: '42.3%',
    subvalue: '12.4K / 29.3K',
    change: '+2.1%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'Stickiness',
    value: '34.8%',
    subvalue: 'DAU/MAU ratio',
    change: '+1.4%',
    trend: 'up',
    icon: Target,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    label: 'Feature Adoption',
    value: '67.2%',
    subvalue: 'Feature X',
    change: '+11.0%',
    trend: 'up',
    icon: Zap,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    label: 'TTV (p50)',
    value: '2.3min',
    subvalue: 'Time to Value',
    change: '-0.4min',
    trend: 'up',
    icon: Clock,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    label: 'Funnel CVR',
    value: '23.4%',
    subvalue: 'View → Purchase',
    change: '+3.2%',
    trend: 'up',
    icon: TrendingUp,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
  },
  {
    label: 'Crash Rate',
    value: '0.89%',
    subvalue: 'Last 7 days',
    change: '-0.11%',
    trend: 'up',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
];

export function KPIRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi, i) => {
        const Icon = kpi.icon;
        return (
          <Card key={i} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className={`${kpi.bgColor} ${kpi.color} p-2 rounded-lg`}>
                <Icon className="w-4 h-4" />
              </div>
              <Badge 
                variant={kpi.trend === 'up' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {kpi.change}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-600">{kpi.label}</p>
              <p className={kpi.color}>{kpi.value}</p>
              <p className="text-xs text-slate-500">{kpi.subvalue}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
