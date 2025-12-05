import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { supabase } from '../lib/supabaseClient';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export function CohortAdoptionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase
        .from('cohort_metrics')
        .select('*')
        .order('id', { ascending: true });

      if (!error) {
        setData(data);
      } else {
        console.error(error);
      }
    }

    loadData();
  }, []);

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-slate-900">Adoption by Cohort</h3>
        <p className="text-sm text-slate-500">
          Feature adoption & retention by user cohort
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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
          <Legend wrapperStyle={{ fontSize: '12px' }} />

          <Bar dataKey="adoption" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="retention" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
