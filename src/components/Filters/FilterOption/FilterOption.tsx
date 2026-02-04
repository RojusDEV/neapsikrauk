import "./FilterOption.scss";

interface JobTypeProps {
  job: { id: string; label: string };
  filterType: string;
}

const FilterOption = ({ job }: JobTypeProps) => {
  return (
    <div className="job-type-option">
      <input
        type="checkbox"
        id={job.id}
        style={{ display: "inline-block", width: "20px", height: "20px" }}
      />
      <label htmlFor={job.id} className="job-type-title">
        {job.label}
      </label>
    </div>
  );
};

export default FilterOption;
