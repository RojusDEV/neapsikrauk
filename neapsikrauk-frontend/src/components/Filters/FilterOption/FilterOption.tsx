import useQueryStringify from "@/hooks/useQueryStringify";
import "./FilterOption.scss";
import { useFilterStore } from "@/store/useFilterStore";

interface JobTypeProp {
  job: { id: string; label: string };
  filterType: string;
}

const FilterOption = ({ job, filterType }: JobTypeProp) => {
  const updateQuery = useQueryStringify();
  const toggleValue = useFilterStore((s) => s.toggleValue);

  const checked = useFilterStore((s) =>
    Array.isArray(s.filters[filterType])
      ? s.filters[filterType].includes(job.id.toLocaleLowerCase())
      : s.filters[filterType]?.toLocaleString() === job.id.toLocaleLowerCase(),
  );

  return (
    <div className="job-type-option">
      <input
        type="checkbox"
        id={job.id}
        style={{ display: "inline-block", width: "20px", height: "20px" }}
        onChange={(e) => {
          updateQuery(filterType, job.id, e.target.checked);
          toggleValue(filterType, job.id);
        }}
        checked={checked}
      />
      <label htmlFor={job.id} className="job-type-title">
        {job.label}
      </label>
    </div>
  );
};

export default FilterOption;
