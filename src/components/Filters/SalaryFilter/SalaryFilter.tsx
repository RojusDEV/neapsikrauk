import "./SalaryFilter.scss";

import { useRef, useState, useEffect, type ChangeEvent } from "react";

const MAX = 5000;
const THUMB_OFFSET = 20;

const SalaryFilter = () => {
  const [range, setRange] = useState({ low: 0, high: MAX });
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }
  }, []);

  const handleLowChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRange((prev) => ({
      ...prev,
      low: Math.min(value, prev.high),
    }));
  };

  const handleHighChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRange((prev) => ({
      ...prev,
      high: Math.max(value, prev.low),
    }));
  };

  const usableWidth = sliderWidth - THUMB_OFFSET * 2;
  const leftPx = (range.low / MAX) * usableWidth + THUMB_OFFSET;
  const rightPx = (range.high / MAX) * usableWidth + THUMB_OFFSET;
  const trackWidth = rightPx - leftPx;
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
        <div className="sliders_control" ref={sliderRef}>
          <div
            className="range_track"
            style={{
              left: `${leftPx}px`,
              width: `${trackWidth}px`,
            }}
          />

          <input
            type="range"
            min="0"
            max={MAX}
            id="fromSlider"
            value={range.low}
            onChange={handleLowChange}
          />

          <input
            type="range"
            min="0"
            max={MAX}
            id="toSlider"
            value={range.high}
            onChange={handleHighChange}
          />
        </div>
        <div className="ranges">
          <span
            id="ranges-left"
            style={{
              left: `${leftPx - THUMB_OFFSET}px`,
            }}
          >
            €{range.low}
          </span>
          <span
            id="ranges-right"
            style={{
              left: `${rightPx - THUMB_OFFSET}px`,
            }}
          >
            €{range.high}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SalaryFilter;
