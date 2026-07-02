import { fetchJobsByIDQuery } from "@/api/queries/useJobsQuery";
import JobCard from "@/components/JobCard/JobCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { IoIosArrowRoundBack } from "react-icons/io";
import {
  JobPageCardTitle,
  JobPageCard,
  JobPageCardDescription,
  JobPageCardList,
  JobPageCardWrapper,
} from "@/components/JobPageCard/JobPageCard";
import { MapComponent } from "@/components/Map/MapComponent";

const JobPage = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["job", id, slug],
    queryFn: () => fetchJobsByIDQuery(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 60,
  });
  if (isLoading) {
    return (
      <>
        <Card className="w-full max-w-xs">
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video w-full" />
          </CardContent>
        </Card>
        <Card className="w-full max-w-xs">
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video w-full" />
          </CardContent>
        </Card>
        <Card className="w-full max-w-xs">
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-video w-full" />
          </CardContent>
        </Card>
      </>
    );
  }

  if (isError || !data) {
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

  const handleGoBack = () => {
    navigate(-1);
    console.log("test");
  };

  const fakeDataRequirememnts = {
    requirements: [
      "2+ metų patirtis su React",
      "TypeScript žinios",
      "Geri komunikacijos įgūdžiai",
      "Anglų kalba (B2)",
    ],
  };

  return (
    <div className="jobPage">
      <nav className="nav">
        <div className="nav-wrapper">
          <button
            className="back-button"
            aria-label="back button"
            onClick={handleGoBack}
          >
            <IoIosArrowRoundBack size={30} strokeWidth={4} />
            <span>Grįžti</span>
          </button>
        </div>
      </nav>
      <div className="jobPage__content-wrapper">
        <section>
          <JobCard
            id={data.job_id}
            key={data.job_id}
            title={data.title}
            company={data.company}
            jobDetails={{
              location: data.location,
              jobType: data.jobtype,
              salary: {
                salary_min: data.salary_min,
                salary_max: data.salary_max,
              },
            }}
            category={data.category}
            description={data.description}
            isBookmarked={false}
            isImportant={false}
          />
        </section>
        <JobPageCardWrapper>
          <JobPageCard>
            <JobPageCardTitle title="Vieta žemėlapyje" />
            <MapComponent />
          </JobPageCard>
          <JobPageCard>
            <JobPageCardTitle title="Aprašymas" />
            <JobPageCardDescription description={data.description} />
          </JobPageCard>
          <JobPageCard>
            <JobPageCardTitle title="Reikalavimai" />
            <JobPageCardList data={fakeDataRequirememnts.requirements} />
          </JobPageCard>
          {/* <JobPageCard>
            <JobPageCardTitle title="Susisiekimas" />
            <JobPageCardDescription description={data.contact_info} />
          </JobPageCard> */}
          <JobPageCard>
            <JobPageCardTitle title="Papildoma informacija" />
            {/* <JobPageCardDescription description={data.additional_info} /> */}
          </JobPageCard>
        </JobPageCardWrapper>
        {/* <section>
          <span>Atsiliepimai</span>
        </section> */}
      </div>
    </div>
  );
};

export default JobPage;
