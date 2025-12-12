import { useEffect, useRef, useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Rocket, Wrench, ChevronRight } from "lucide-react";
import { getAIRecommendations } from "../api/dashboardApi";

interface RecommendationsModuleProps {
  filters?: any;
  loadTrigger?: number; // increment this in parent when Apply is clicked
}

export function RecommendationsModule({
  filters = {},
  loadTrigger,
}: RecommendationsModuleProps) {
  const [recs, setRecs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const mountedRef = useRef(false);

  // Map API response → UI structure
  const mapApiToUI = (data: any) => {
    // Defensive access in case API shape varies
    const r1 = data?.recommendation_1 ?? {};
    const r2 = data?.recommendation_2 ?? {};
    return [
      {
        icon: Rocket,
        color: "text-green-600",
        bgColor: "bg-green-50",
        priority: r1.priority ?? "Medium",
        priorityColor: (r1.priority ?? "Medium") === "High" ? "default" : "secondary",
        title: r1.title ?? "",
        description: r1.description ?? "",
        impact: r1.expected_impact ?? "",
        effort: r1.effort ?? "",
      },
      {
        icon: Wrench,
        color: "text-amber-600",
        bgColor: "bg-amber-50",
        priority: r2.priority ?? "Medium",
        priorityColor: (r2.priority ?? "Medium") === "High" ? "default" : "secondary",
        title: r2.title ?? "",
        description: r2.description ?? "",
        impact: r2.expected_impact ?? "",
        effort: r2.effort ?? "",
      },
    ];
  };

  const fetchRecs = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getAIRecommendations(filters);
      setRecs(mapApiToUI(data));
    } catch (err: any) {
      console.error("Recommendations fetch failed", err);
      setError(err?.message ?? "Failed to load recommendations");
      setRecs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial mount
    if (!mountedRef.current) {
      mountedRef.current = true;
      fetchRecs();
      return;
    }

    // subsequent runs only when parent increments loadTrigger
    if (typeof loadTrigger !== "undefined") {
      fetchRecs();
    }

    // NOTE: intentionally do NOT depend on filters here so changing selects won't auto-trigger fetch
    // dependencies: loadTrigger only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadTrigger]);

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
        <p className="text-sm text-slate-500">Actionable suggestions based on your data</p>
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
                    <Badge variant={rec.priorityColor as any}>{rec.priority} Priority</Badge>
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
