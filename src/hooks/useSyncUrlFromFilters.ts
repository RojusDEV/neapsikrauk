import { useNavigate } from "react-router";
import queryString from "query-string";
import { useFilterStore } from "@/store/useFilterStore";
import { useEffect } from "react";

export const useSyncUrlFromFilters = () => {
  const navigate = useNavigate();
  const filters = useFilterStore((s) => s.filters);

  useEffect(() => {
    const qs = queryString.stringify(
      Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v.length > 0),
      ),
    );

    navigate(qs ? `?${qs}` : "", { replace: true });
  }, [filters]);
};
