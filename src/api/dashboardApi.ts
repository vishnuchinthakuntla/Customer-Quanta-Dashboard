import baseApi from "./baseApi";

// ------- API Response Types -------
export interface CrashDeviceEntry {
  device_model: string;
  total_crashes: number;
}

export interface CrashRateResponse {
  total_crashes: number;
  data: CrashDeviceEntry[];
}
export interface FiltersResponse {
  success: boolean;
  message: string;
  data: {
    platforms: string[];
    versions: string[];
    features: string[];
    segments: string[];
    regions: string[];
  };
}
export interface FeatureCohortItem {
  cohort: string;
  adoption: number;
  retention: number;
}

export interface FeatureCohortResponse {
  data: FeatureCohortItem[];
}

export interface DashboardKPI {
  label: string;
  value: string;
  subvalue: string;
  change: string;
  trend: "up" | "down";
  icon: string;
  color: string;
  

}


export interface DashboardResponse {
  success: boolean;
  message: string;
  data: {
    filters_used: {
      platform: string;
      region: string;
      feature_name: string;
    };
    cards: {
      overall: {
        [key: string]: {
          title: string;
          value: string;
          sub_value: string;
          change?: string;
          trend?: "up" | "down" | "neutral";
          icon?: string;
          color?: string;
        };
      };
    };
    usage_trends_chart: { data: any[] };
    cohort_chart: { data: any[] };
    conversion_funnel_details: any[];
    ab_experiments: any[];
  };
}


// ------- API Function -------
export const getCrashRateByDevice = async (
  platform: string
): Promise<CrashRateResponse> => {
  const payload = { platform };

  const res = await baseApi.post<CrashRateResponse>(
    "/crash-rate-by-device",
    payload
  );

  return res.data;
};
export const getFilters = async (): Promise<FiltersResponse> => {
  const res = await baseApi.get<FiltersResponse>("/api/filters");
  return res.data;
};
export const getFeatureAdoptionCohort = async (
  featureName?: string | null
): Promise<FeatureCohortResponse> => {
  const res = await baseApi.post<FeatureCohortResponse>(
    "/feature-adoption-cohort",
    {
      feature_name:
        featureName && featureName.trim() !== "" ? featureName : null,
    }
  );

  return res.data;
};

export const getDashboard = async (
  platform?: string | null,
  region?: string | null,
  featureName?: string | null
): Promise<DashboardResponse> => {
  const res = await baseApi.get<DashboardResponse>("/api/dashboard", {
    params: {
      platform: platform || null,
      region: region || null,
      feature_name: featureName || null,
    }
  });

  return res.data;
};