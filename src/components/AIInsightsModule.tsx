import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Lightbulb, AlertCircle, TrendingUp } from 'lucide-react';

const insights = [
  {
    type: 'Key Insight',
    icon: Lightbulb,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    title: 'Feature X adoption surging in v3.4',
    description: 'Feature X adoption increased by 11% in version 3.4, primarily driven by the new onboarding step that highlights the feature during first-time user experience. Users who complete the onboarding see 2.3x higher adoption rates.',
    confidence: '94%',
  },
  {
    type: 'Anomaly',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    title: 'Crash rate spike on Android build 21014',
    description: 'Crash rate exceeded 1.2% threshold on Android build 21014, affecting ~450 users. Root cause analysis points to a memory leak in the image carousel component. Device models Samsung Galaxy S21 and S22 are disproportionately affected (68% of crashes).',
    confidence: '98%',
  },
  {
    type: 'Forecast',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    title: 'DAU projected to reach 14.2K in 6 weeks',
    description: 'Based on current growth trajectory and seasonal patterns, DAU is forecasted to reach 14.2K ±800 by November 27th. The model accounts for typical end-of-quarter uplift and the upcoming holiday season. Confidence interval widens after week 4 due to external factors.',
    confidence: '87%',
  },
];

export function AIInsightsModule() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900">AI Insights</h2>
          <p className="text-sm text-slate-500">Automated insights from your product data</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <Card key={i} className={`p-5 border-2 ${insight.borderColor}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className={`${insight.bgColor} ${insight.color} p-2 rounded-lg`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="outline" className="text-xs">
                      {insight.type}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {insight.confidence}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <h4 className="text-slate-900 mb-2">{insight.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{insight.description}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
