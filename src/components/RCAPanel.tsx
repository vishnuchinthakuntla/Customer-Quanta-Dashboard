import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { GitBranch, Layers } from "lucide-react";

// ---- API ----
import {
  getCrashRateByDevice,
  getFeatureAdoptionCohort,
  CrashRateResponse,
  FeatureCohortResponse,
} from "../api/dashboardApi";

const COLORS = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#94a3b8"];

export function RCAPanel() {
  const [crashData, setCrashData] = useState<any[]>([]);
  const [totalCrashes, setTotalCrashes] = useState<number>(0);
  const [featureCohortData, setFeatureCohortData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharts = async () => {
      try {
        setLoading(true);

        // ---- Fetch Crash Rate Chart ----
        const crashRes: CrashRateResponse = await getCrashRateByDevice("");
        setTotalCrashes(crashRes.total_crashes);

        const mappedCrash = crashRes.data.map((item) => ({
          device: item.device_model,
          crashes: item.total_crashes,
        }));
        setCrashData(mappedCrash);

        // ---- Fetch Feature Cohort Chart ----
        const cohortRes: FeatureCohortResponse =
          await getFeatureAdoptionCohort("");

        const mappedCohorts = cohortRes.data.map((item) => ({
          cohort: item.cohort,
          value: item.adoption, // using adoption for bar height
        }));
        setFeatureCohortData(mappedCohorts);
      } catch (error) {
        console.error("Failed to fetch RCA data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharts();
  }, []);

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <GitBranch className="w-5 h-5 text-slate-700" />
        <h3 className="text-slate-900">Root Cause Analysis (RCA)</h3>
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-500">Loading charts...</div>
      ) : (
        <Tabs defaultValue="contributions" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="contributions" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Contributions
            </TabsTrigger>
            <TabsTrigger value="trace" className="flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              Impact Trace
            </TabsTrigger>
          </TabsList>

          {/* ---------------- Charts Tab ---------------- */}
          <TabsContent value="contributions" className="space-y-6">
            {/* --- Crash Rate Chart --- */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-slate-900">Crash Rate by Device Model</h4>
                  <p className="text-sm text-slate-500">
                    Top contributors to Android crashes
                  </p>
                </div>

                <Badge variant="destructive">{totalCrashes} total crashes</Badge>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={crashData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" stroke="#64748b" fontSize={12} />
                  <YAxis
                    dataKey="device"
                    type="category"
                    stroke="#64748b"
                    fontSize={12}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="crashes" radius={[0, 4, 4, 0]}>
                    {crashData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* --- Feature Cohort Chart --- */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-slate-900">Feature Adoption by User Cohort</h4>
                  <p className="text-sm text-slate-500">
                    Which segments drive adoption?
                  </p>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={featureCohortData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="cohort" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          {/* ---------------- Trace Tab ---------------- */}
          <TabsContent value="trace" className="space-y-4">
            {/* Keeping your earlier static trace UI */}
            {/* (we can later make this dynamic if needed) */}
          </TabsContent>
        </Tabs>
      )}
    </Card>
  );
}
