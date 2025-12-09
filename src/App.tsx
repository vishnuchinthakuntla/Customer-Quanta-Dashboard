import { useState } from 'react';

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

export default function App() {
  const [filters, setFilters] = useState({
    platform: 'all',
    version: 'all',
    feature: 'all',
    segment: 'all',
    region: 'all',
  });

  // Placeholder dashboard data (since Supabase was removed)
  const dashboardData = null;

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
        <AIInsightsModule />
        <RecommendationsModule />
        <RCAPanel />
      </div>
    </div>
  );
}
