import Button from "@/components/Button";
import JobCategory from "@/components/JobCategory";
import {
  LandingPageCardWrapper,
  LandingPageCard,
  CardHeading,
  SubHeading,
} from "@/components/LandingPageCard/LandingPageCard";
import { CiSearch } from "react-icons/ci";

const Landingpage = () => {
  return (
    <div className="landing-page">
      <div className="landing-page__wrapper">
        <div className="landing-page__content">
          <div className="content-top">
            <h1 className="content-header">neapsikrauk</h1>
            <h2 className="content-subHeader">
              Rask darbą netoli tavęs. Greitai. Paprastai.
            </h2>
          </div>
          <div className="content-middle">
            <form action="#" className="search-form">
              <div className="search-form__wrapper">
                <input
                  type="text"
                  className="search-form-input"
                  placeholder="Įvesk profesiją, įmonę ar raktažodį..."
                />
                <button
                  type="submit"
                  className="search-button"
                  aria-label="search button"
                >
                  <CiSearch color="white" size={20} strokeWidth={1} />
                </button>
              </div>
            </form>
            <div className="buttons">
              <Button
                title="Ieškoti darbo"
                buttonType="button"
                label="ieskoti darbo mygtukas"
                colorPallete="blue"
                className="animation-pop-out"
              />
              <Button
                title="Kaip tai veikia?"
                buttonType="button"
                label=""
                colorPallete="white"
                className="animation-shadow"
              />
            </div>
            <hr />
            <div className="categories">
              <span className="categories-title">
                Populiariausios kategorijos:
              </span>
              <ul className="popular-categories-list">
                <li className="popular-category-el">
                  <JobCategory title="IT" />
                </li>
                <li className="popular-category-el">
                  <JobCategory title="HoReCa" />
                </li>
                <li className="popular-category-el">
                  <JobCategory title="Marketing" />
                </li>
                <li className="popular-category-el">
                  <JobCategory title="Finansai" />
                </li>
                <li className="popular-category-el">
                  <JobCategory title="Nuotolinis" />
                </li>
              </ul>
            </div>
          </div>
          <div className="content-bottom">
            <LandingPageCardWrapper>
              <LandingPageCard>
                <CardHeading>500+</CardHeading>
                <SubHeading>Aktyvių skelbimų</SubHeading>
              </LandingPageCard>
              {/*  */}
              <LandingPageCard>
                <CardHeading>50+</CardHeading>
                <SubHeading>Darbdavių</SubHeading>
              </LandingPageCard>
              {/*  */}
              <LandingPageCard>
                <CardHeading>24/7</CardHeading>
                <SubHeading>Atnaujinama</SubHeading>
              </LandingPageCard>
            </LandingPageCardWrapper>
            <button
              type="button"
              className="content-button"
              aria-label="button-search-job"
            >
              <span>Darbo ieškai? Neapsikrauk.</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
