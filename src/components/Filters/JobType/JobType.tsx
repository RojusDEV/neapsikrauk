interface JobTypeProps {
  job: { id: string; label: string };
  onSelect: (job: { id: string; label: string }) => void;
}

const JobType = ({ job, onSelect }: JobTypeProps) => {
  return (
    <div className="job-type-option">
      <input
        type="checkbox"
        id={job.id}
        onChange={() => onSelect(job)}
        style={{ display: "inline-block", width: "20px", height: "20px" }}
      />
      <label htmlFor={job.id} className="job-type-title">{job.label}</label>
    </div>
  );
};

export default JobType;
