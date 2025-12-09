import { useEffect, useState } from "react";
import { Filter } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";
import { Card } from "./ui/card";

import { getFilters } from "../api/dashboardApi";

interface NormalizedOption {
  value: string;
  label: string;
}

interface NormalizedFilters {
  platforms: NormalizedOption[];
  versions: NormalizedOption[];
  features: NormalizedOption[];
  segments: NormalizedOption[];
  regions: NormalizedOption[];
}

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
  const [filterOptions, setFilterOptions] = useState<NormalizedFilters>({
    platforms: [],
    versions: [],
    features: [],
    segments: [],
    regions: [],
  });

  // Fetch filters from backend
  useEffect(() => {
    async function loadFilters() {
      try {
        const res = await getFilters();
        const data = res.data;

        const normalize = (
          arr: string[],
          defaultLabel: string
        ): NormalizedOption[] => [
            { value: "all", label: defaultLabel }, // ✔ Radix requires non-empty values
            ...arr.map((item) => ({
              value: item.toLowerCase().replace(/\s+/g, "_"),
              label: item,
            })),
          ];

        setFilterOptions({
          platforms: normalize(data.platforms || [], "All Platforms"),
          versions: normalize(data.versions || [], "All Versions"),
          features: normalize(data.features || [], "All Features"),
          segments: normalize(data.segments || [], "All Segments"),
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

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Title */}
        <div className="flex items-center gap-2 text-slate-700">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filters</span>
        </div>

        {/* PLATFORM */}
        <Select
          value={filters.platform}
          onValueChange={(v) => handleChange("platform", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.platforms.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* VERSION */}
        <Select
          value={filters.version}
          onValueChange={(v) => handleChange("version", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Version" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.versions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* FEATURE */}
        <Select
          value={filters.feature}
          onValueChange={(v) => handleChange("feature", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Feature" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.features.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* SEGMENT */}
        <Select
          value={filters.segment}
          onValueChange={(v) => handleChange("segment", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Segment" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.segments.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* REGION */}
        <Select
          value={filters.region}
          onValueChange={(v) => handleChange("region", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.regions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
}
