import { useState } from "react";
import "./SalaryFilter.scss";

import { Slider } from "@/components/ui/slider";
const MAX = 5000;

const SalaryFilter = () => {
  const [range, setRange] = useState({ low: 0, high: MAX });
  return (
    <div className="salary-filter">
      <div className="salary__filter-topWrapper">
        <span className="filter__type">Atlyginimas (EUR/mėn)</span>
        <div className="salary_range">
          <div className="salary_range_low salary_range_block">
            <span>€{range.low}</span>
          </div>
          <span> — </span>
          <div className="salary_range_high salary_range_block">
            €{range.high}
          </div>
        </div>
      </div>
      <div className="range_container">
        <Slider
          defaultValue={[0, 5000]}
          max={5000}
          step={5}
          onValueChange={(values) =>
            setRange({ low: values[0], high: values[1] })
          }
          className="mx-auto w-full"
        />
      </div>
    </div>
  );
};

export default SalaryFilter;
