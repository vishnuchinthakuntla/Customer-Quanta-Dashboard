import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';

interface FilterBarProps {
  filters: {
    platform: string;
    version: string;
    feature: string;
    segment: string;
    region: string;
  };
  onFilterChange: (filters: any) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const handleChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-slate-700">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filters</span>
        </div>
        
        <Select value={filters.platform} onValueChange={(v) => handleChange('platform', v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="ios">iOS</SelectItem>
            <SelectItem value="android">Android</SelectItem>
            <SelectItem value="web">Web</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.version} onValueChange={(v) => handleChange('version', v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Version" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Versions</SelectItem>
            <SelectItem value="v3.4">v3.4</SelectItem>
            <SelectItem value="v3.3">v3.3</SelectItem>
            <SelectItem value="v3.2">v3.2</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.feature} onValueChange={(v) => handleChange('feature', v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Feature" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Features</SelectItem>
            <SelectItem value="feature-x">Feature X</SelectItem>
            <SelectItem value="onboarding">Onboarding</SelectItem>
            <SelectItem value="checkout">Checkout</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.segment} onValueChange={(v) => handleChange('segment', v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Segment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Segments</SelectItem>
            <SelectItem value="new">New Users</SelectItem>
            <SelectItem value="returning">Returning</SelectItem>
            <SelectItem value="power">Power Users</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.region} onValueChange={(v) => handleChange('region', v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="eu">Europe</SelectItem>
            <SelectItem value="apac">APAC</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
