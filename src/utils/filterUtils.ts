// src/utils/filterUtils.ts
export const normalizeFilters = (filters: any, allowed: string[]) => {
  const result: any = {};

  allowed.forEach(key => {
    const value = filters[key];
    result[key] =
      value && value !== "all" && value !== ""
        ? value
        : null;
  });

  return result;
};
