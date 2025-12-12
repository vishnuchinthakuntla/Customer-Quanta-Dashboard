import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Activity, Gauge, MousePointer, Zap } from 'lucide-react';
import  Loader  from '../utils/Loader';


export interface WebVitalItem {
  metric_name: string;
  value_unit: string;
  description: string;
}

export interface WebVitalsWidgetProps {
  data?: WebVitalItem[];
  loading?: boolean;

}

// Map metric_name → icons (fallback if not found)
const metricIcons: Record<string, any> = {
  "LCP": Zap,
  "LCP (p50)": Zap,
  "FCP": Activity,
  "CLS": Gauge,
  "Rage Clicks": MousePointer,
  "TTFB": Zap,
  "FID": Activity,
};

function getStatus(value: string) {
  // Basic logic - you can adjust this based on your requirement
  if (value.includes("ms") || value.includes("s") || parseFloat(value) < 0.1) return "good";
  if (parseFloat(value) < 2) return "warning";
  return "bad";
}

export function WebVitalsWidget({ data, loading }: WebVitalsWidgetProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="p-20">
        <p><Loader/></p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-slate-900">Web Vitals</h3>
        <p className="text-sm text-slate-500">Core performance metrics</p>
      </div>
      
      <div className="space-y-4">
        {data.map((vital, i) => {
          
          const Icon = metricIcons[vital.metric_name] || Gauge; // default icon
          const status = getStatus(vital.value_unit);

          return (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  status === 'good' ? 'bg-green-100 text-green-600' : 
                  status === 'warning' ? 'bg-amber-100 text-amber-600' : 
                  'bg-red-100 text-red-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-slate-900">{vital.metric_name}</p>
                  <p className="text-xs text-slate-500">{vital.description}</p>
                </div>
              </div>

              <Badge 
                variant={status === 'good' ? 'default' : 'secondary'}
                className="text-sm"
              >
                {vital.value_unit}
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
