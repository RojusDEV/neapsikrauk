const CardHeading = ({ children }: { children: String }) => {
  return <span className="landing-page__cardHeading">{children}</span>;
};

const SubHeading = ({ children }: { children: String }) => {
  return <span className="landing-page__cardSubHeading">{children}</span>;
};

const LandingPageCard = ({ children }: { children: React.ReactNode }) => {
  return <div className="landing-page__card">{children}</div>;
};

const LandingPageCardWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="landing-page__cardsWrapper">{children}</div>;
};

export { LandingPageCardWrapper, LandingPageCard, CardHeading, SubHeading };
