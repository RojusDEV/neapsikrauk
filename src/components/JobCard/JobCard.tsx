import { CiLocationOn, CiMoneyBill } from "react-icons/ci";
import "./JobCard.scss";
import { BsSuitcaseLg } from "react-icons/bs";
import formatDate from "@/hooks/FormatDate";
import { GoAlert } from "react-icons/go";
interface JobDetails {
  location?: string;
  jobType?: string;
  salary?: string;
}

interface JobCardProps {
  title: string;
  company: string;
  jobDetails: JobDetails;
  jobCategory?: string;
  isBookmarked: boolean;
  description: string;
  uploadDate: Date;
  isImportant: boolean;
}

const JobCard = (props: JobCardProps) => {
  const { location, jobType, salary } = props.jobDetails;
  return (
    <div className="JobCard">
      {props.isImportant && (
        <div className="important-badge-wrapper">
          <GoAlert color="#d63d3d" strokeWidth={2} />
          <span className="important-badge">Dėmesio</span>
        </div>
      )}
      <div className="JobCard__wrapper">
        <span className="job_title">{props.title}</span>
        <span className="job_company">{props.company}</span>
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
              {jobType}
            </li>
          )}
          {salary && (
            <li className="job_detail job_salary">
              <CiMoneyBill />
              {salary}
            </li>
          )}
        </ul>
        <div className="job_category">
          <span>{props.jobCategory}</span>
        </div>
        <p className="job_description">{props.description}</p>
        <hr />
        <span className="upload_date">
          Paskelbta: {formatDate(props.uploadDate)}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
