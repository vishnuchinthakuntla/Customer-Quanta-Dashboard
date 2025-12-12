import { useEffect, useState, useRef } from "react";
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

import {
  getCrashRateByDevice,
  getFeatureAdoptionCohort,
} from "../api/dashboardApi";

const COLORS = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#94a3b8"];

// ------------------------
// PROPS INTERFACE
// ------------------------
interface RCAPanelProps {
  filters?: any;
  loadTrigger: number; // 👈 added
}

// ------------------------
export function RCAPanel({ filters = {}, loadTrigger }: RCAPanelProps) {
  const [crashData, setCrashData] = useState<any[]>([]);
  const [totalCrashes, setTotalCrashes] = useState<number>(0);
  const [featureCohortData, setFeatureCohortData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const mountedRef = useRef(false);

  // --------------------------------------
  // Fetch Crash + Cohort Data
  // --------------------------------------
  const fetchCharts = async () => {
    try {
      setLoading(true);

      const crashRes = await getCrashRateByDevice(filters);
      setTotalCrashes(crashRes?.total_crashes || 0);

      setCrashData(
        crashRes?.data?.map((item) => ({
          device: item.device_model,
          crashes: item.total_crashes,
        })) || []
      );

      const cohortRes = await getFeatureAdoptionCohort(filters);
      setFeatureCohortData(
        cohortRes?.data?.map((item) => ({
          cohort: item.cohort,
          value: item.adoption,
        })) || []
      );
    } catch (err) {
      console.error("RCA fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------
  // Run API on:
  //    1. Initial load
  //    2. When loadTrigger changes
  // --------------------------------------
  useEffect(() => {
    // initial load
    if (!mountedRef.current) {
      mountedRef.current = true;
      fetchCharts();
      return;
    }

    // run when Apply button triggers it
    fetchCharts();
  }, [loadTrigger]);

  // --------------------------------------
  // UI
  // --------------------------------------
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
            <TabsTrigger value="contributions">
              <Layers className="w-4 h-4" /> Contributions
            </TabsTrigger>
            <TabsTrigger value="trace">
              <GitBranch className="w-4 h-4" /> Impact Trace
            </TabsTrigger>
          </TabsList>

          {/* Contributions Tab */}
          <TabsContent value="contributions" className="space-y-6">

            {/* Crash Chart */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-slate-900">Crash Rate by Device Model</h4>
                <Badge variant="destructive">{totalCrashes} total crashes</Badge>
              </div>

              {crashData.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  No crash data available.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={crashData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" />
                    <YAxis dataKey="device" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="crashes" radius={[0, 4, 4, 0]}>
                      {crashData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Cohort Chart */}
            <div>
              <h4 className="text-slate-900">Feature Adoption by User Cohort</h4>

              {featureCohortData.length === 0 ? (
                <div className="text-center py-10 text-slate-400">No data.</div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={featureCohortData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="cohort" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </TabsContent>

          {/* Trace Tab */}
          <TabsContent value="trace">
            {/* You can add impact trace UI here */}
          </TabsContent>
        </Tabs>
      )}
    </Card>
  );
}
