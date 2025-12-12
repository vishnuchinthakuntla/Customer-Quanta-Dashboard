import { useState, useEffect, useRef } from "react";
import { AppHeader } from "./components/AppHeader";
import { FilterBar } from "./components/FilterBar";
import { KPIRow } from "./components/KPIRow";
import { UsageTrendsChart } from "./components/UsageTrendsChart";
import { CohortAdoptionChart } from "./components/CohortAdoptionChart";
import { TTVDistributionChart } from "./components/TTVDistributionChart";
import { WebVitalsWidget } from "./components/WebVitalsWidget";
import { ConversionFunnelChart } from "./components/ConversionFunnelChart";
import { ExperimentsTable } from "./components/ExperimentsTable";
import { AskAIPanel } from "./components/AskAIPanel";
import { AIInsightsModule } from "./components/AIInsightsModule";
import { RecommendationsModule } from "./components/RecommendationsModule";
import { RCAPanel } from "./components/RCAPanel";
import { getDashboard } from "./api/dashboardApi";

export default function App() {
  const [filters, setFilters] = useState({
    platform: "all",
    version: "all",
    feature_name: "all",
    segment: "all",
    region: "all",
  });

  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Trigger counter used to tell child modules to re-load on Apply
  const [applyTrigger, setApplyTrigger] = useState(0);

  // Protect against race conditions when multiple fetches run
  const latestCallId = useRef(0);

  // Fetch dashboard immediately — used by Apply button (and optionally used once on mount)
  const fetchDashboardNow = async (currentFilters = filters) => {
    const callId = ++latestCallId.current;
    setLoading(true);
    setError(null);

    try {
      const resp = await getDashboard(currentFilters);
      if (callId === latestCallId.current) {
        setDashboardData(resp.data ?? resp);
      }
    } catch (err: any) {
      if (callId === latestCallId.current) {
        setError(err?.message ?? "Failed to fetch dashboard");
        setDashboardData(null);
      }
    } finally {
      if (callId === latestCallId.current) {
        setLoading(false);
      }
    }
  };

  // Optional: initial load on first mount. Remove if you want zero auto-fetch.
  useEffect(() => {
    fetchDashboardNow(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Called by FilterBar when user clicks Apply
  const handleApply = () => {
    // fetch dashboard immediately
    fetchDashboardNow(filters);

    // increment trigger so child modules fetch (pass this as loadTrigger)
    setApplyTrigger((t) => t + 1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <div className="p-6 space-y-6">
        {/* Pass setFilters to update local filters; pass handleApply as onApply */}
        <FilterBar filters={filters} onFilterChange={setFilters} onApply={handleApply} />

        <KPIRow filters={filters} kpis={dashboardData?.cards?.overall} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UsageTrendsChart data={dashboardData?.usage_trends_chart?.data} loading={loading} />
          <CohortAdoptionChart data={dashboardData?.cohort_chart?.data} loading={loading} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TTVDistributionChart data={dashboardData?.time_to_value_distribution} loading={loading} />
          </div>
          <WebVitalsWidget data={dashboardData?.web_vitals} loading={loading} />
        </div>

        <ConversionFunnelChart funnelSteps={dashboardData?.conversion_funnel_details} loading={loading} />
        <ExperimentsTable experiments={dashboardData?.ab_experiments} loading={loading} />

        <AskAIPanel loading={loading} />

        {/* Pass applyTrigger so these modules load only on Apply (or mount). */}
        <AIInsightsModule filters={filters} loadTrigger={applyTrigger} loading={loading} />
        <RecommendationsModule filters={filters} loadTrigger={applyTrigger} loading={loading} />
        <RCAPanel filters={filters} loadTrigger={applyTrigger} loading={loading} />
      </div>
    </div>
  );
}
