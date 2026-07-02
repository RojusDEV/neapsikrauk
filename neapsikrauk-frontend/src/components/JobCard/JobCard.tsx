import { CiBookmark, CiLocationOn, CiMoneyBill } from "react-icons/ci";
import "./JobCard.scss";
import { BsSuitcaseLg } from "react-icons/bs";
import formatDate from "@/hooks/FormatDate";
import { GoAlert } from "react-icons/go";
import { capitalize } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
interface JobDetails {
  location?: string;
  jobType?: string;
  salary?: {
    salary_min: number;
    salary_max: number;
  };
}

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  jobDetails: JobDetails;
  category: string;
  isBookmarked: boolean;
  description: string;
  uploadDate?: Date;
  isImportant: boolean;
}

const JobCard = ({
  id,
  title,
  company,
  jobDetails,
  category,
  isBookmarked,
  description,
  uploadDate,
  isImportant,
}: JobCardProps) => {
  const { location, jobType, salary } = jobDetails;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/jobs/${id}/${title.toLowerCase().replace(/\s+/g, "-")}`);
  };
  return (
    <div className="JobCard" onClick={handleCardClick}>
      {isImportant && (
        <div className="important-badge-wrapper">
          <GoAlert color="#d63d3d" strokeWidth={2} />
          <span className="important-badge">Dėmesio</span>
        </div>
      )}
      <div className="JobCard__wrapper">
        <div className="JobCard__header">
          <span className="job_title">{title}</span>
          <button className="bookmark-btn" aria-label="bookmark button">
            <CiBookmark size={20} strokeWidth={1} />
          </button>
        </div>
        <span className="job_company">{company}</span>
        <ul className="job_details">
          {location && (
            <li className="job_detail job_location">
              <CiLocationOn />
              {location}
            </li>
          )}
          {jobType && (
            <li className="job_detail job_type">
              <BsSuitcaseLg />
              {capitalize(jobType.toLocaleLowerCase())}
            </li>
          )}
          {salary && (
            <li className="job_detail job_salary">
              {salary.salary_max == salary.salary_min ? (
                <>
                  <CiMoneyBill />
                  <span>€ from {salary.salary_min}</span>
                </>
              ) : (
                <>
                  <CiMoneyBill />
                  <span>€ {salary.salary_min}-{salary.salary_max}</span>
                </>
              )}
            </li>
          )}
        </ul>
        <div className="job_category">
          <span>{category}</span>
        </div>
        {uploadDate && (
          <span className="upload_date">
            Paskelbta: {formatDate(uploadDate)}
          </span>
        )}
      </div>
    </div>
  );
};

export default JobCard;
