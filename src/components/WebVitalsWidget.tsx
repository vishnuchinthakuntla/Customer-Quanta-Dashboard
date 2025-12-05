import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Activity, Gauge, MousePointer, Zap } from 'lucide-react';

const vitals = [
  {
    label: 'LCP (p50)',
    value: '1.8s',
    status: 'good',
    icon: Zap,
    description: 'Largest Contentful Paint',
  },
  {
    label: 'FCP',
    value: '1.2s',
    status: 'good',
    icon: Activity,
    description: 'First Contentful Paint',
  },
  {
    label: 'CLS',
    value: '0.08',
    status: 'good',
    icon: Gauge,
    description: 'Cumulative Layout Shift',
  },
  {
    label: 'Rage Clicks',
    value: '142',
    status: 'warning',
    icon: MousePointer,
    description: 'Last 24 hours',
  },
];

export function WebVitalsWidget() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-slate-900">Web Vitals</h3>
        <p className="text-sm text-slate-500">Core performance metrics</p>
      </div>
      
      <div className="space-y-4">
        {vitals.map((vital, i) => {
          const Icon = vital.icon;
          return (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  vital.status === 'good' ? 'bg-green-100 text-green-600' : 
                  vital.status === 'warning' ? 'bg-amber-100 text-amber-600' : 
                  'bg-red-100 text-red-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-900">{vital.label}</p>
                  <p className="text-xs text-slate-500">{vital.description}</p>
                </div>
              </div>
              <Badge 
                variant={vital.status === 'good' ? 'default' : 'secondary'}
                className="text-sm"
              >
                {vital.value}
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
