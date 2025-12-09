// src/models/models.ts

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
export interface AIInsightsResponse {
  key_insight: {
    confidence: number;
    title: string;
    content: string;
  };
  anomaly: {
    confidence: number;
    title: string;
    content: string;
  };
  forecast: {
    confidence: number;
    title: string;
    content: string;
  };
}
export interface AIRecommendation {
  priority: string;
  effort: string;
  title: string;
  description: string;
  expected_impact: string;
}

export interface AIRecommendationsResponse {
  recommendation_1: AIRecommendation;
  recommendation_2: AIRecommendation;
}

