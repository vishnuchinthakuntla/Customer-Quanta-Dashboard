import { Card } from './ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '0-1min', users: 1200 },
  { time: '1-2min', users: 2800 },
  { time: '2-3min', users: 3600 },
  { time: '3-4min', users: 2400 },
  { time: '4-5min', users: 1800 },
  { time: '5-6min', users: 1200 },
  { time: '6-7min', users: 800 },
  { time: '7-8min', users: 400 },
  { time: '8+min', users: 200 },
];

export function TTVDistributionChart() {
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-slate-900">Time to Value Distribution</h3>
        <p className="text-sm text-slate-500">How long it takes users to reach their first value moment</p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTTV" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="users" 
            stroke="#f59e0b" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorTTV)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
