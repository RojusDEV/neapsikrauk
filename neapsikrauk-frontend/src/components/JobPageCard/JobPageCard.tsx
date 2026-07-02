import "./JobPageCard.scss";

export const JobPageCardTitle = ({ title }: { title: string }) => {
  return (
    <div className="job-page-card-title-container">
      <h2 className="job-page-card-title__heading">{title}</h2>
    </div>
  );
};

export const JobPageCardDescription = ({
  description,
}: {
  description: string;
}) => {
  return (
    <div className="job-page-card-description">
      <p>{description}</p>
    </div>
  );
};

export const JobPageCardList = ({ data }: { data: string[] }) => {
  return (
    <ul className="job-page-card-list">
      {data.map((item, index) => (
        <li key={index} className="job-page-card-list__item">
          <span className="job-page-card-list__label">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export const JobPageCardWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="job-page-card-list__wrapper">{children}</div>;
};

export const JobPageCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="content-card" id="job-page-card">
      <div className="content-card__wrapper" id="job-page-card__wrapper">
        {children}
      </div>
    </section>
  );
};
