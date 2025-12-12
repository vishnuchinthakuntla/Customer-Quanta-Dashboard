import { useState, useEffect, useRef} from 'react';
import { AppHeader } from './components/AppHeader';
import { FilterBar } from './components/FilterBar';
import { KPIRow } from './components/KPIRow';
import { UsageTrendsChart } from './components/UsageTrendsChart';
import { CohortAdoptionChart } from './components/CohortAdoptionChart';
import { TTVDistributionChart } from './components/TTVDistributionChart';
import { WebVitalsWidget } from './components/WebVitalsWidget';
import { ConversionFunnelChart } from './components/ConversionFunnelChart';
import { ExperimentsTable } from './components/ExperimentsTable';
import { AskAIPanel } from './components/AskAIPanel';
import { AIInsightsModule } from './components/AIInsightsModule';
import { RecommendationsModule } from './components/RecommendationsModule';
import { RCAPanel } from './components/RCAPanel';
import { getDashboard } from "./api/dashboardApi";

export default function App() {
  const [filters, setFilters] = useState({
    platform: 'all',
    version: 'all',
    feature_name: 'all',
     segment: 'all',
     region: 'all',
  });


  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceRef = useRef<number | null>(null);
  const latestCallId = useRef(0);

  useEffect(() => {
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      const callId = ++latestCallId.current;
      setLoading(true);
      setError(null);

      getDashboard(filters)
        .then((resp) => {
          if (callId === latestCallId.current) {
            setDashboardData(resp.data ?? resp); 
          }
        })
        .catch((err) => {
          if (callId === latestCallId.current) {
            setError(err?.message ?? "Failed to fetch dashboard");
            setDashboardData(null);
          }
        })
        .finally(() => {
          if (callId === latestCallId.current) {
            setLoading(false);
          }
        });
    }, 300); 


    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [filters]);


  return (
    <div className="min-h-screen bg-slate-50">
      <AppHeader />

      <div className="p-6 space-y-6">
        <FilterBar filters={filters} onFilterChange={setFilters}  />

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
        <AIInsightsModule filters={filters} loading={loading} />
        <RecommendationsModule filters={filters} loading={loading} />
        <RCAPanel filters={filters} loading={loading} />
      </div>
    </div>
  );
}
