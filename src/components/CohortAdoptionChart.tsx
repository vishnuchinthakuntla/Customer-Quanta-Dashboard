import { Card } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { cohort: 'Week 1', adoption: 45, retention: 78 },
  { cohort: 'Week 2', adoption: 52, retention: 74 },
  { cohort: 'Week 3', adoption: 58, retention: 71 },
  { cohort: 'Week 4', adoption: 61, retention: 69 },
  { cohort: 'Week 5', adoption: 67, retention: 68 },
  { cohort: 'Week 6', adoption: 72, retention: 67 },
];

interface CohortAdoption {
  week: string;
  adoption: number;
  retention: number;
}

interface CohortAdoptionChartProps {
  data: CohortAdoption[];
}


export function CohortAdoptionChart({ data }: CohortAdoptionChartProps) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-slate-900">Adoption by Cohort</h3>
        <p className="text-sm text-slate-500">Feature adoption & retention by user cohort</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Bar dataKey="adoption" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="retention" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
