import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import  Loader  from '../utils/Loader';



export interface UsageTrend {
  name: string;   
  DAU: number;    
  MAU: number;    
}

interface UsageTrendsChartProps {
  data: UsageTrend[];
  loading?: boolean;

}

export function UsageTrendsChart({ data, loading }: UsageTrendsChartProps) {
  return (
    <Card className="p-6 relative">
      <div className="mb-4">
        <h3 className="text-slate-900">Usage Trends</h3>
        <p className="text-sm text-slate-500">
          Daily, Weekly, and Monthly Active Users
        </p>
      </div>

      {/* 🔥 If loading → show only loader */}
      {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Loader />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Line
              type="monotone"
              dataKey="DAU"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="MAU"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}

