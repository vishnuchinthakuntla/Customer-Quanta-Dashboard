import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import  Loader  from '../utils/Loader';


const experiments = [
  {
    name: 'New Onboarding Flow',
    variant: 'B',
    metric: 'Feature Adoption',
    uplift: '+11.2%',
    pvalue: '0.003',
    guardrail: 'DAU: +0.8%',
    status: 'winner',
  },
  {
    name: 'Checkout Button Color',
    variant: 'C',
    metric: 'Conversion Rate',
    uplift: '+3.4%',
    pvalue: '0.042',
    guardrail: 'LCP: +12ms',
    status: 'winner',
  },
  {
    name: 'Simplified Navigation',
    variant: 'A',
    metric: 'Session Duration',
    uplift: '-2.1%',
    pvalue: '0.089',
    guardrail: 'Bounce: +1.2%',
    status: 'neutral',
  },
  {
    name: 'Pricing Page Redesign',
    variant: 'B',
    metric: 'Sign-up Rate',
    uplift: '+8.7%',
    pvalue: '0.011',
    guardrail: 'TTV: -0.3min',
    status: 'winner',
  },
];

interface Experiment {
  experiment: string;
  variant: string;
  primaryMetric: string;
  uplift: number;
  pValue: number;
  guardrail: string;
  status: string;
}

interface ExperimentsTableProps {
  experiments: Experiment[];   // array of objects
  loading?: boolean;

}

export function ExperimentsTable({ experiments , loading }: ExperimentsTableProps) {
   
  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-slate-900">A/B Experiments</h3>
        <p className="text-sm text-slate-500">Active experiments with uplifts and guardrails</p>
      </div>
      
       {loading ? (
        <div className="flex justify-center items-center h-[300px]">
          <Loader />
        </div>
      ) : (<div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Experiment</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead>Primary Metric</TableHead>
              <TableHead>Uplift</TableHead>
              <TableHead>p-value</TableHead>
              <TableHead>Guardrail</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiments?.map((exp, i) => (
              <TableRow key={i}>
                <TableCell>{exp.experiment}</TableCell>
                <TableCell>
                  <Badge variant="outline">{exp.variant}</Badge>
                </TableCell>
                <TableCell className="text-slate-600">{exp.primaryMetric}</TableCell>
                <TableCell>
                  {/* <div className="flex items-center gap-1">
                    {exp.uplift.startsWith('+') ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : exp.uplift.startsWith('-') ? (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    ) : (
                      <Minus className="w-4 h-4 text-slate-400" />
                    )}
                    <span className={
                      exp.uplift.startsWith('+') ? 'text-green-600' :
                      exp.uplift.startsWith('-') ? 'text-red-600' :
                      'text-slate-600'
                    }>
                      {exp.uplift}
                    </span>
                  </div> */}
                  <div className="flex items-center gap-1">
  {exp.uplift > 0 ? (
    <TrendingUp className="w-4 h-4 text-green-600" />
  ) : exp.uplift < 0 ? (
    <TrendingDown className="w-4 h-4 text-red-600" />
  ) : (
    <Minus className="w-4 h-4 text-slate-400" />
  )}

  <span
    className={
      exp.uplift > 0
        ? "text-green-600"
        : exp.uplift < 0
        ? "text-red-600"
        : "text-slate-600"
    }
  >
    {exp.uplift}%
  </span>
</div>

                </TableCell>
                <TableCell>
                  {/* <Badge variant={parseFloat(exp.pvalue) < 0.05 ? 'default' : 'secondary'}>
                    {exp.pvalue}
                  </Badge> */}
                  <Badge variant={exp.pValue < 0.05 ? 'default' : 'secondary'}>
  {Number(exp.pValue).toFixed(2)}
</Badge>

                </TableCell>
                <TableCell className="text-sm text-slate-600">{exp.guardrail}</TableCell>
                <TableCell>
                  <Badge variant={
                    exp.status === 'winner' ? 'default' : 
                    exp.status === 'neutral' ? 'secondary' : 
                    'destructive'
                  }>
                    {exp.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>)}
    </Card>
  );
}
