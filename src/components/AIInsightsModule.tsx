import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Lightbulb, AlertCircle, TrendingUp } from "lucide-react";
import { getAIInsights } from "../api/dashboardApi"; 

export function AIInsightsModule({ filters = {} }: { filters?: any }) {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Convert backend → your UI card structure
  const mapApiToInsights = (data: any) => {
    return [
      {
        type: "Key Insight",
        icon: Lightbulb,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        title: data.key_insight?.title,
        description: data.key_insight?.content,
        confidence: `${data.key_insight?.confidence}%`,
      },
      {
        type: "Anomaly",
        icon: AlertCircle,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        title: data.anomaly?.title,
        description: data.anomaly?.content,
        confidence: `${data.anomaly?.confidence}%`,
      },
      {
        type: "Forecast",
        icon: TrendingUp,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        title: data.forecast?.title,
        description: data.forecast?.content,
        confidence: `${data.forecast?.confidence}%`,
      },
    ];
  };

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);

        const data = await getAIInsights(
          filters
        );

        setInsights(mapApiToInsights(data));
      } catch (err: any) {
        setError(err.message || "Failed to load insights");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [JSON.stringify(filters)]);

  // Loading state
  if (loading) {
    return (
      <div className="p-6 text-slate-500">
        Loading AI Insights...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 text-red-600">
        Failed to load insights: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900">AI Insights</h2>
          <p className="text-sm text-slate-500">
            Automated insights from your product data
          </p>
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
              <p className="text-sm text-slate-600 leading-relaxed">
                {insight.description}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
