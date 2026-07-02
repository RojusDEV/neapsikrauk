import { useEffect, useState } from "react";
import "./SalaryFilter.scss";

import { Slider } from "@/components/ui/slider";
import { useFilterStore } from "@/store/useFilterStore";
import useSetQueryParam from "@/hooks/useSetQueryParam";
import { useLocation } from "react-router";
import queryString from "query-string";
const MAX = 5000;

const SalaryFilter = () => {
  const [range, setRange] = useState({ min: 0, max: MAX });
  const setQuery = useSetQueryParam();
  const updateFiltersZustand = useFilterStore((state) => state.setFilter);
  const location = useLocation();

  // Initialize range from URL on mount
  useEffect(() => {
    const parsed = queryString.parse(location.search, { arrayFormat: "comma" });
    const min = parsed.salaryMin ? Number(parsed.salaryMin) : 0;
    const max = parsed.salaryMax ? Number(parsed.salaryMax) : MAX;

    if (!isNaN(min) && !isNaN(max) && (min !== range.min || max !== range.max)) {
      setRange({ min, max });
    }
  }, [location.search]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const parsed = queryString.parse(location.search);
      if (
        parsed.salaryMin === range.min.toString() &&
        parsed.salaryMax === range.max.toString()
      ) {
        return;
      }
      setQuery("salaryMin", range.min.toString());
      setQuery("salaryMax", range.max.toString());

      updateFiltersZustand("salaryMin", [range.min.toString()]);
      updateFiltersZustand("salaryMax", [range.max.toString()]);

    }, 500);
    return () => clearTimeout(timeoutId);
  }, [range, setQuery, updateFiltersZustand]);

  return (
    <div className="salary-filter">
      <div className="salary__filter-topWrapper">
        <span className="filter__type">Atlyginimas (EUR/mėn)</span>
        <div className="salary_range">
          <div className="salary_range_min salary_range_block">
            <span>€{range.min}</span>
          </div>
          <span> — </span>
          <div className="salary_range_max salary_range_block">
            €{range.max}
          </div>
        </div>
      </div>
      <div className="range_container">
        <Slider
          defaultValue={[0, 5000]}
          max={5000}
          step={5}
          onValueChange={(values) =>
            setRange({ min: values[0], max: values[1] })
          }
          className="mx-auto w-full"
        />
      </div>
    </div>
  );
};

export default SalaryFilter;
