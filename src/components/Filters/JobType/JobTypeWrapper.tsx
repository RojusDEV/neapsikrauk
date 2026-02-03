import JobType from "./JobType";
import "./JobTypeWrapper.scss";

const JobTypeWrapper = () => {
  const jobTypes = [
    { id: "full-time", label: "Full-Time" },
    { id: "part-time", label: "Part-Time" },
    { id: "internship", label: "Internship" },
    { id: "contract", label: "Contract" },
    { id: "remote", label: "Remote" },
  ];

  const handleOnSelect = (job: { id: string; label: string }) => {
    // Selection logic to be implemented
  };

  return (
    <div className="job_type_wrapper">
      <form className="job_type_form">
        <legend className="filter_type_name">Darbo tipas</legend>
        <fieldset className="filter_fieldset">
          {jobTypes.map((el) => (
            <JobType key={el.id} job={el} onSelect={handleOnSelect} />
          ))}
        </fieldset>
      </form>
    </div>
  );
};

export default JobTypeWrapper;
