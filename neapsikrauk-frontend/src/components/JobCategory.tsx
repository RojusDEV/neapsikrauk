const JobCategory = ({title}: {title: String}) => {
  return (
    <div className="job-category">
      <span className="job-category-title">{title}</span>
    </div>
  );
};

export default JobCategory;
