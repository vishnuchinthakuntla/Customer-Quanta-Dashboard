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
    feature: 'all',
     segment: 'all',
     region: 'all',
  });

  console.log(filters,"filterssss")

  // Placeholder dashboard data (since Supabase was removed)
  // const dashboardData = null;
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // debounce timer
  const debounceRef = useRef<number | null>(null);
  // track latest request to avoid applying stale responses
  const latestCallId = useRef(0);

  useEffect(() => {
    // call API when filters change (debounced)
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      const callId = ++latestCallId.current;
      setLoading(true);
      setError(null);

      getDashboard(filters)
        .then((resp) => {
          // apply response only if it is the latest call
          if (callId === latestCallId.current) {
            setDashboardData(resp.data ?? resp); // adapt depending on your DashboardResponse shape
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
    }, 300); // 300ms debounce — tweak if you like

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
        <FilterBar filters={filters} onFilterChange={setFilters} />

         <KPIRow filters={filters} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UsageTrendsChart />
          <CohortAdoptionChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TTVDistributionChart />
          </div>
          <WebVitalsWidget  />
        </div>

        <ConversionFunnelChart  />
        <ExperimentsTable  />

        <AskAIPanel />
        <AIInsightsModule filters={filters} />
        <RecommendationsModule />
        <RCAPanel filters={filters}/>
      </div>
    </div>
  );
}
