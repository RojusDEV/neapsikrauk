import { CiBookmark } from "react-icons/ci";
import "./JobCardLayout.scss";
import JobCard from "@/components/JobCard/JobCard";
import { useQuery } from "@tanstack/react-query";
import { useJobsQuery, type JobsResponse } from "@/api/queries/useJobsQuery";

import useGetFilters from "@/hooks/useGetFilters";
import { useEffect, useRef } from "react";

const JobCardLayout = () => {
  const [filters] = useGetFilters();

  const { isLoading, isError, data } = useQuery<JobsResponse | undefined>({
    queryKey: ["jobs", filters],
    queryFn: () => useJobsQuery(filters),
    staleTime: 1000 * 60 * 60,
    enabled: !!filters,
  });

  const filteredJobs = data?.data ?? [];
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const handleFiltersSet = () => {};

      handleFiltersSet();
    }

    return () => {
      effectRan.current = true;
    };
  }, [data?.data && data?.data !== undefined]);

  if (isLoading) {
    return (
      <section className="job_card_layout">
        <div className="job_card_layout__wrapper">
          <div className="job_card_layout__header">
            <span className="job_card_layout__header-title">
              Loading jobs...
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data?.data || data.data.length === 0) {
    return (
      <section className="job_card_layout">
        <div className="job_card_layout__wrapper">
          <div className="job_card_layout__header">
            <span className="job_card_layout__header-title">
              No jobs available
            </span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="job_card_layout">
      <div className="job_card_layout__wrapper">
        <div className="job_card_layout__header">
          <span className="job_card_layout__header-title">
            {data.total_count} darbo pasiūlymai
          </span>
          <div className="job_card_layout__header-bookmark">
            <CiBookmark size={20} strokeWidth={1} />
            <span className="job_card_layout__header-saved-count">
            </span>
          </div>
        </div>
        <div className="job_card_layout__cards">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                id={job.job_id}
                key={job.job_id}
                title={job.title}
                company={job.company}
                jobDetails={{
                  location: job.location,
                  jobType: job.jobtype,
                  salary: {
                    salary_min: job.salary_min,
                    salary_max: job.salary_max
                  }
                }}
                category={job.category}
                description={job.description}
                uploadDate={new Date(job.posteddate)}
                isBookmarked={false}
                isImportant={false}
              />
            ))
          ) : (
            <p>No jobs match the selected filters.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobCardLayout;
