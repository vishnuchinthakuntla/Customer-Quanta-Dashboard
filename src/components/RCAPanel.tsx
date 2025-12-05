import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { GitBranch, Layers } from 'lucide-react';

const crashByDevice = [
  { device: 'Galaxy S21', crashes: 156, percentage: 34 },
  { device: 'Galaxy S22', crashes: 148, percentage: 32 },
  { device: 'Pixel 6', crashes: 67, percentage: 15 },
  { device: 'OnePlus 9', crashes: 45, percentage: 10 },
  { device: 'Others', crashes: 42, percentage: 9 },
];

const adoptionByCohort = [
  { cohort: 'Completed Onboarding', value: 78 },
  { cohort: 'Skipped Onboarding', value: 34 },
  { cohort: 'Returning Users', value: 62 },
  { cohort: 'New Users', value: 45 },
];

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#94a3b8'];

export function RCAPanel() {
  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <GitBranch className="w-5 h-5 text-slate-700" />
        <h3 className="text-slate-900">Root Cause Analysis (RCA)</h3>
      </div>
      
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
        
        <TabsContent value="contributions" className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-slate-900">Crash Rate by Device Model</h4>
                <p className="text-sm text-slate-500">Top contributors to Android crashes</p>
              </div>
              <Badge variant="destructive">458 total crashes</Badge>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={crashByDevice} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis dataKey="device" type="category" stroke="#64748b" fontSize={12} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="crashes" radius={[0, 4, 4, 0]}>
                  {crashByDevice.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-slate-900">Feature Adoption by User Cohort</h4>
                <p className="text-sm text-slate-500">Which segments drive adoption?</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={adoptionByCohort}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="cohort" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="trace" className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="default">Variant B</Badge>
                <span className="text-sm text-slate-600">→</span>
                <span className="text-sm text-slate-700">New Onboarding Flow</span>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                Added feature highlight in step 2 of onboarding process
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-slate-600">Impact:</span>
                  <span className="text-green-600">+11.2% Feature Adoption</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-slate-600">Confidence:</span>
                  <Badge variant="default" className="text-xs">p=0.003</Badge>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Guardrail</Badge>
                <span className="text-sm text-slate-600">→</span>
                <span className="text-sm text-slate-700">DAU Monitoring</span>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                Overall user engagement remained stable with slight positive trend
              </p>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-slate-600">Result:</span>
                <span className="text-green-600">+0.8% DAU</span>
                <Badge variant="secondary" className="text-xs ml-2">Within bounds</Badge>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">Guardrail</Badge>
                <span className="text-sm text-slate-600">→</span>
                <span className="text-sm text-slate-700">LCP Performance</span>
              </div>
              <p className="text-sm text-slate-600 mb-2">
                Slight increase in page load time due to additional onboarding assets
              </p>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-slate-600">Result:</span>
                <span className="text-amber-600">+12ms LCP</span>
                <Badge variant="secondary" className="text-xs ml-2">Monitor</Badge>
              </div>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="default">Recommendation</Badge>
              </div>
              <p className="text-sm text-slate-700">
                Proceed with gradual rollout to 25% traffic. Strong positive signal with acceptable guardrail impact. Set automated rollback trigger if LCP exceeds +50ms.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
