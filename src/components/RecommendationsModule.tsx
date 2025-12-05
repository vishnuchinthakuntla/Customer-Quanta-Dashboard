import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Rocket, Wrench, ChevronRight } from 'lucide-react';

const recommendations = [
  {
    icon: Rocket,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    priority: 'High',
    priorityColor: 'default',
    title: 'Roll forward A/B winner to 25% traffic',
    description: 'The "New Onboarding Flow" variant B has achieved statistical significance (p=0.003) with strong positive results. Recommendation: Gradually increase traffic to 25% while monitoring LCP guardrail (currently +12ms). Set rollback trigger if LCP exceeds +50ms or DAU drops >2%.',
    impact: 'Estimated +1.2K DAU',
    effort: 'Low',
  },
  {
    icon: Wrench,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    priority: 'Medium',
    priorityColor: 'secondary',
    title: 'Fix carousel rage-click issue',
    description: 'Detected 142 rage-click events on the image carousel in the last 24 hours, suggesting a UX friction point. Analysis shows users expect faster image transitions. Recommendation: Add 300ms debounce and visual loading indicator. Similar fix reduced rage-clicks by 67% in previous iteration.',
    impact: 'Better UX, -60% rage clicks',
    effort: 'Medium',
  },
];

export function RecommendationsModule() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-slate-900">AI Recommendations</h2>
        <p className="text-sm text-slate-500">Actionable suggestions based on your data</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recommendations.map((rec, i) => {
          const Icon = rec.icon;
          return (
            <Card key={i} className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className={`${rec.bgColor} ${rec.color} p-2 rounded-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={rec.priorityColor as any}>
                      {rec.priority} Priority
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {rec.effort} Effort
                    </Badge>
                  </div>
                </div>
              </div>
              
              <h4 className="text-slate-900 mb-2">{rec.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">{rec.description}</p>
              
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <p className="text-sm text-slate-700">{rec.impact}</p>
                <Button size="sm" variant="ghost">
                  View Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
