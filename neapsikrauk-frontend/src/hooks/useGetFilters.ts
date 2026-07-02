import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useFilterStore } from "@/store/useFilterStore";

const useGetFilters = () => {
  const location = useLocation();
  const setFilters = useFilterStore((state) => state.setFilters);
  const [normalized, setNormalized] = useState<
    Record<string, string | string[]>
  >({});

  useEffect(() => {
    const parsed = queryString.parse(location.search, { arrayFormat: "comma" });
    const normalizedData: Record<string, string | string[]> = {};

    Object.entries(parsed).forEach(([key, value]) => {
      if (value == null) return;

      const isNumericalFilter =
        key === "salaryRange" || key === "salaryMin" || key === "salaryMax";

      if (typeof value === "string") {
        if (isNumericalFilter) {
          normalizedData[key] = value.trim();
        } else {
          normalizedData[key] = value
            .split(",")
            .map((s) => s.trim().toLowerCase());
        }
      } else if (Array.isArray(value)) {
        normalizedData[key] = value
          .map((s) => s?.trim().toLowerCase())
          .filter((s) => s !== undefined) as string[];
      }

    });

    setNormalized(normalizedData);
    setFilters(normalizedData);
  }, [location.search, setFilters]);


  return [normalized];
};

export default useGetFilters;
