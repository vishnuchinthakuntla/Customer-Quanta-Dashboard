// src/api/api.ts
import baseApi from "./baseApi";
import {
  CrashRateResponse,
  FiltersResponse,
  FeatureCohortResponse,
  DashboardResponse,
  AIInsightsResponse,
  AIRecommendationsResponse
} from "../models/models";

import { normalizeFilters } from "../utils/filterUtils";

// ------------------------------------------------
//  Get Crash Rate By Device  (supports ONLY platform)
// ------------------------------------------------
// export const getCrashRateByDevice = async (
//   filters: any
// ): Promise<CrashRateResponse> => {
//   const params = normalizeFilters(filters, ["platform"]);

//   const res = await baseApi.post<CrashRateResponse>(
//     "/crash-rate-by-device",
//     {},
//     { params }
//   );

//   return res.data;
// };

export const getCrashRateByDevice = async (
  filters: any
): Promise<CrashRateResponse> => {
  const params = normalizeFilters(filters, ["platform", "region", "version", "segment", "feature_name"]);

  const res = await baseApi.post<CrashRateResponse>(
    "/crash-rate-by-device",
    {}, // body (if any)
    { params }
  );

  return res.data;
};

// ------------------------------------------------
// Get Filters (no change)
// ------------------------------------------------
export const getFilters = async (): Promise<FiltersResponse> => {
  const res = await baseApi.get<FiltersResponse>("/api/filters");
  return res.data;
};

// ------------------------------------------------
// Get Feature Adoption Cohort (supports ONLY feature_name)
// ------------------------------------------------
export const getFeatureAdoptionCohort = async (
  filters: any
): Promise<FeatureCohortResponse> => {
  const params = normalizeFilters(filters, ["feature_name"]);

  const res = await baseApi.post<FeatureCohortResponse>(
    "/feature-adoption-cohort",
    {},
    { params }
  );

  return res.data;
};

// ------------------------------------------------
// Get Dashboard Data (supports ALL filters)
// ------------------------------------------------
export const getDashboard = async (
  filters: any
): Promise<DashboardResponse> => {
  const params = normalizeFilters(filters, [
    "platform",
    "region",
    "feature_name",
    "version",
    "segment",
  ]);

  const res = await baseApi.get<DashboardResponse>("/api/dashboard", {
    params,
  });

  return res.data;
};

// ------------------------------------------------
// AI Insights (supports ALL filters)
// ------------------------------------------------

export const getAIInsights = async (
  filters: any
): Promise<AIInsightsResponse> => {
  const params = normalizeFilters(filters, [
    "platform",
    "region",
    "feature_name",
    "version",
    "segment",
  ]);

  const res = await baseApi.post<AIInsightsResponse>(
    "/ai-insights",
    {},
    {
      params,
      headers: { accept: "application/json" },
    }
  );

  return res.data;
};

// ------------------------------------------------
// AI Recommendations (supports ALL filters)
// ------------------------------------------------
export const getAIRecommendations = async (
  filters: any
): Promise<AIRecommendationsResponse> => {
  const params = normalizeFilters(filters, [
    "platform",
    "region",
    "feature_name",
    "version",
    "segment",
  ]);

  const res = await baseApi.post<AIRecommendationsResponse>(
    "/ai-recommendations",
    "",
    {
      params,
      headers: { accept: "application/json" },
    }
  );

  return res.data;
};
