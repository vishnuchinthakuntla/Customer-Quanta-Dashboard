import { Card } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   { date: 'Oct 1', DAU: 11200, WAU: 23400, MAU: 27800 },
//   { date: 'Oct 3', DAU: 11800, WAU: 24100, MAU: 28200 },
//   { date: 'Oct 5', DAU: 12100, WAU: 24800, MAU: 28600 },
//   { date: 'Oct 7', DAU: 11900, WAU: 24500, MAU: 28900 },
//   { date: 'Oct 9', DAU: 12400, WAU: 25200, MAU: 29100 },
//   { date: 'Oct 11', DAU: 12700, WAU: 25800, MAU: 29400 },
//   { date: 'Oct 13', DAU: 12300, WAU: 25500, MAU: 29200 },
//   { date: 'Oct 15', DAU: 12400, WAU: 25900, MAU: 29300 },
// ];
export interface UsageTrend {
  name: string;   
  DAU: number;    
  MAU: number;    
}

interface UsageTrendsChartProps {
  data: UsageTrend[];
}

export function UsageTrendsChart({ data }: UsageTrendsChartProps) {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-slate-900">Usage Trends</h3>
        <p className="text-sm text-slate-500">Daily, Weekly, and Monthly Active Users</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
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
          <Line type="monotone" dataKey="DAU" stroke="#3b82f6" strokeWidth={2} dot={false} />
          {/* <Line type="monotone" dataKey="WAU" stroke="#8b5cf6" strokeWidth={2} dot={false} /> */}
          <Line type="monotone" dataKey="MAU" stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
