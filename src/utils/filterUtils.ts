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
export function normalizeFilters(filters: Record<string, any>, allowedKeys: string[]) {
  const params: Record<string, any> = {};

  allowedKeys.forEach((key) => {
    const rawVal = filters?.[key];

    // treat "all", empty string, null, undefined as "no param"
    if (rawVal === undefined || rawVal === null) return;
    if (typeof rawVal === "string" && rawVal.trim().toLowerCase() === "all") return;

    params[key] = rawVal;
  });

  return params;
}


