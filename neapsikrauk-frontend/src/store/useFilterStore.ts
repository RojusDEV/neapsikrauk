import { create } from "zustand";
import { devtools } from "zustand/middleware";
type FilterValue = string | number | null;

interface FilterStore {
  filters: Record<string, FilterValue[] | FilterValue>;
  setFilter: (key: string, values: FilterValue[]) => void;
  setFilters: (filters: Record<string, FilterValue[] | FilterValue>) => void;
  toggleValue: (key: string, value: FilterValue) => void;
}

export const useFilterStore = create<FilterStore>()(
  devtools((set, get) => ({
    filters: {},
    setFilter: (key, values) =>

      set((state) => ({
        filters: {
          ...state.filters,
          [key]: values.length > 0 ? values.toString() : values,
        },
      })),


    setFilters: (filters) =>
      set((state) => ({
        filters: {
          ...state.filters,
          ...filters,
        },
      })),
    //Toggles a value in the filter array for a specific key. If the value is already present, it removes it, otherwise, it adds it.
    toggleValue: (key, value) => {
      const current = get().filters[key] ?? [];

      let next: FilterValue[] | FilterValue = [];

      if (Array.isArray(current)) {
        next = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
      } else {
        next = "";
      }

      set((state) => ({
        filters: { ...state.filters, [key]: next },
      }));
    },
  })),
);
