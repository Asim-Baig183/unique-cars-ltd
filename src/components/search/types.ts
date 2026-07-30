// src/components/search/types.ts

export interface SearchFilterState extends Record<string, string> {
  make: string;
  model: string;
  minYear: string;
  maxYear: string;
}

// 👈 Ensure 'export' is added here
export interface SelectOption {
  label: string;
  value: string;
}