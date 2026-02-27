import queryString from "query-string";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useFilterStore } from "@/store/useFilterStore";

export const useSyncFiltersFromUrl = () => {
  const location = useLocation();
  const setFilter = useFilterStore((s) => s.setFilter);

  useEffect(() => {
    const parsed = queryString.parse(location.search);

    Object.entries(parsed).forEach(([key, value]) => {
      if (typeof value === "string") {
        setFilter(key, value.split(","));
      }
    });
  }, []);
};
