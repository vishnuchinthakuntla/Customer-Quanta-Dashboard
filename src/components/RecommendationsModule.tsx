import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Rocket, Wrench, ChevronRight } from "lucide-react";
import { getAIRecommendations } from "../api/dashboardApi";

export function RecommendationsModule({
  platform = "all",
  region = "all",
  featureName = "all",
  version = "all",
  segment = "all",
}: {
  platform?: string;
  region?: string;
  featureName?: string;
  version?: string;
  segment?: string;
}) {
  const [recs, setRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Map API response → UI structure
  const mapApiToUI = (data: any) => {
    return [
      {
        icon: Rocket,
        color: "text-green-600",
        bgColor: "bg-green-50",
        priority: data.recommendation_1.priority,
        priorityColor: data.recommendation_1.priority === "High" ? "default" : "secondary",
        title: data.recommendation_1.title,
        description: data.recommendation_1.description,
        impact: data.recommendation_1.expected_impact,
        effort: data.recommendation_1.effort,
      },
      {
        icon: Wrench,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        priority: data.recommendation_2.priority,
        priorityColor: data.recommendation_2.priority === "High" ? "default" : "secondary",
        title: data.recommendation_2.title,
        description: data.recommendation_2.description,
        impact: data.recommendation_2.expected_impact,
        effort: data.recommendation_2.effort,
      },
    ];
  };

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        setLoading(true);
        const data = await getAIRecommendations(
          platform,
          region,
          featureName,
          version,
          segment
        );
        setRecs(mapApiToUI(data));
      } catch (err: any) {
        setError(err.message || "Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecs();
  }, [platform, region, featureName, version, segment]);

  if (loading) {
    return <div className="p-6 text-slate-500">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Failed to load: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-slate-900">AI Recommendations</h2>
        <p className="text-sm text-slate-500">
          Actionable suggestions based on your data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {recs.map((rec, i) => {
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
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                {rec.description}
              </p>

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
