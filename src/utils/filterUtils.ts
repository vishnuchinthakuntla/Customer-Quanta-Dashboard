// src/utils/filterUtils.ts
// export const normalizeFilters = (filters: any, allowed: string[]) => {
//   const result: any = {};

//   allowed.forEach(key => {
//     const value = filters[key];
//     result[key] =
//       value && value !== "all" && value !== ""
//         ? value
//         : null;
//   });

//   return result;
// };

// utils/normalizeFilters.ts
// export function normalizeFilters(filters: Record<string, any>, allowedKeys: string[]) {
//   const params: Record<string, any> = {};

//   allowedKeys.forEach((key) => {
//     const rawVal = filters?.[key];

//     // treat "all", empty string, null, undefined as "no param"
//     if (rawVal === undefined || rawVal === null) return;
//     if (typeof rawVal === "string" && rawVal.trim().toLowerCase() === "all") return;

//     params[key] = rawVal;
//   });

//   return params;
// }


export function normalizeFilters(filters: Record<string, any>, allowedKeys: string[]) {
  const params: Record<string, any> = {};

  const isAllish = (raw: unknown) => {
    if (raw === undefined || raw === null) return true;
    const s = String(raw).trim().toLowerCase();
    if (s === "") return true;
    // treat "all", "all_features", "all platforms", "all features", or strings containing the separate word "all"
    if (s === "all") return true;
    if (s.startsWith("all_")) return true;
    if (/\ball\b/i.test(s.replace(/[_-]/g, " "))) return true;
    return false;
  };

  allowedKeys.forEach((key) => {
    const rawVal = filters?.[key];

    // Skip empty / null / undefined
    if (rawVal === undefined || rawVal === null) return;

    // If it's a string and looks like "all" or "all_*" or contains the word "all", ignore it
    if (typeof rawVal === "string") {
      if (isAllish(rawVal)) return;
      params[key] = rawVal.trim();
      return;
    }

    // For arrays: ignore empty arrays, otherwise dedupe array values
    if (Array.isArray(rawVal)) {
      if (rawVal.length === 0) return;
      // remove duplicate array items (stringify for safety)
      params[key] = Array.from(new Set(rawVal.map((v) => (typeof v === "string" ? v.trim() : v))));
      return;
    }

    // For numbers/booleans/objects — pass through
    params[key] = rawVal;
  });

  return params;
}









