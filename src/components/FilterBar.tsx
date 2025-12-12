import { useEffect, useState } from "react";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

import { getFilters } from "../api/dashboardApi";

interface NormalizedOption { value: string; label: string; }
interface NormalizedFilters { platforms: NormalizedOption[]; features: NormalizedOption[]; regions: NormalizedOption[]; }

interface FilterBarProps {
  filters: { platform: string; version: string; feature_name: string; segment: string; region: string; };
  onFilterChange: (filters: any) => void;
  onApply?: () => void; // <-- new
}

export function FilterBar({ filters, onFilterChange, onApply }: FilterBarProps) {
  const [filterOptions, setFilterOptions] = useState<NormalizedFilters>({
    platforms: [], features: [], regions: []
  });

  useEffect(() => {
    async function loadFilters() {
      try {
        const res = await getFilters();
        const data = res.data;
        // normalization logic...
        const normalize = (arr: string[] = [], defaultLabel: string) => {
          const toValue = (s: string) => s.toString().trim().toLowerCase().replace(/\s+/g, "_");
          const cleaned = arr.map((s) => (s == null ? "" : String(s).trim())).filter((s) => s.length > 0 && /[A-Za-z0-9]/.test(s));
          const seen = new Set<string>();
          const unique = cleaned.filter((item) => {
            const v = toValue(item);
            if (seen.has(v)) return false;
            seen.add(v);
            return true;
          });
          return [{ value: "all", label: defaultLabel }, ...unique.map((item) => ({ value: toValue(item), label: item }))];
        };

        setFilterOptions({
          platforms: normalize(data.platforms || [], "All Platforms"),
          features: normalize(data.features || [], "All Features"),
          regions: normalize(data.regions || [], "All Regions"),
        });
      } catch (error) {
        console.error("Error loading filters:", error);
      }
    }
    loadFilters();
  }, []);

  const handleChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleApplyClick = () => {
    // notify parent to run APIs
    if (onApply) {
      onApply();
    } else {
      // fallback: update parent filters (no API trigger)
      onFilterChange(filters);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-slate-700">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filters</span>
        </div>

        {/* Platform, Feature, Region selects — same as before */}
        <Select value={filters.platform} onValueChange={(v) => handleChange("platform", v)}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Platform" /></SelectTrigger>
          <SelectContent>{filterOptions.platforms.map((item) => (<SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>))}</SelectContent>
        </Select>

        <Select value={filters.feature_name} onValueChange={(v) => handleChange("feature_name", v)}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Feature" /></SelectTrigger>
          <SelectContent>{filterOptions.features.map((item) => (<SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>))}</SelectContent>
        </Select>

        <Select value={filters.region} onValueChange={(v) => handleChange("region", v)}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Region" /></SelectTrigger>
          <SelectContent>{filterOptions.regions.map((item) => (<SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>))}</SelectContent>
        </Select>

        {/* APPLY BUTTON */}
        <div className="ml-2 ">
          <Button variant="default" onClick={handleApplyClick} className=" px-3 bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">Apply</Button>
        </div>
      </div>
    </Card>
  );
}
