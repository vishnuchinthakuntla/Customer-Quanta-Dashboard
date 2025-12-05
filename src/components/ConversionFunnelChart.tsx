import { Card } from './ui/card';
import { ArrowRight } from 'lucide-react';

const funnelSteps = [
  { label: 'Product View', users: 10000, percentage: 100, color: 'bg-blue-500' },
  { label: 'Add to Cart', users: 4200, percentage: 42, color: 'bg-blue-600' },
  { label: 'Checkout Started', users: 3100, percentage: 31, color: 'bg-blue-700' },
  { label: 'Payment Info', users: 2600, percentage: 26, color: 'bg-blue-800' },
  { label: 'Purchase Complete', users: 2340, percentage: 23.4, color: 'bg-blue-900' },
];

export function ConversionFunnelChart() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-slate-900">Conversion Funnel</h3>
        <p className="text-sm text-slate-500">User journey from view to purchase · Last 7 days</p>
      </div>
      
      <div className="space-y-3">
        {funnelSteps.map((step, i) => (
          <div key={i} className="relative">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-700">{step.label}</span>
                    {i < funnelSteps.length - 1 && (
                      <span className="text-xs text-slate-500">
                        ({((funnelSteps[i + 1].users / step.users) * 100).toFixed(1)}% → next)
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-slate-900">{step.users.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">{step.percentage}%</p>
                  </div>
                </div>
                <div className="h-12 bg-slate-100 rounded-lg overflow-hidden relative">
                  <div 
                    className={`${step.color} h-full flex items-center justify-center text-white transition-all`}
                    style={{ width: `${step.percentage}%` }}
                  >
                    {step.percentage > 20 && (
                      <span className="text-xs">{step.percentage}%</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {i < funnelSteps.length - 1 && (
              <div className="flex justify-center my-2">
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
