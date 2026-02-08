import { CiBookmark } from "react-icons/ci";
import "./JobCardLayout.scss";
import JobCard from "@/components/JobCard/JobCard";

const JobCardLayout = () => {
  const props = {
    title: "Frontend Developer",
    company: "Tech Corp",
    jobDetails: {
      location: "Vilnius, Lithuania",
      jobType: "Full-time",
      salary: "€3000 - €4000",
    },
    jobCategory: "IT / Technology",
    isBookmarked: false,
    description:
      "We are looking for a skilled frontend developer to join our team.",
    uploadDate: new Date(),
    isImportant: false
  };
  return (
    <section className="job_card_layout">
      <div className="job_card_layout__wrapper">
        <div className="job_card_layout__header">
          <span className="job_card_layout__header-title">
            5 darbo pasiūlymai
          </span>
          <div className="job_card_layout__header-bookmark">
            <CiBookmark size={20} strokeWidth={1} />
            <span className="job_card_layout__header-saved-count">
              Išsaugoti (0)
            </span>
          </div>
        </div>
        <div className="job_card_layout__cards">
          <JobCard {...props} />
          <JobCard {...props} />
        </div>
      </div>
    </section>
  );
};

export default JobCardLayout;
