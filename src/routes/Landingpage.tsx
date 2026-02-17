import LandingPageButton from "@/components/Button";
import FeaturedCards, {
  featureCards,
} from "@/components/FeaturedCards/FeaturedCards";
import Header from "@/components/Header/Header";
import { LandingPageCardWrapper } from "@/components/LandingPageCard/LandingPageCard";
import PopularCategories from "@/components/PopularCategories/PopularCategories";
import { CiSearch } from "react-icons/ci";

const Landingpage = () => {
  return (
    <div className="landing-page">
      <Header />
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
              <LandingPageButton
                title="Ieškoti darbo"
                buttonType="button"
                label="ieskoti darbo mygtukas"
                colorPallete="blue"
                className="animation-pop-out"
              />
              <LandingPageButton
                title="Kaip tai veikia?"
                buttonType="button"
                label=""
                colorPallete="white"
                className="animation-shadow"
              />
            </div>
            <hr />
            <PopularCategories />
          </div>
          <div className="content-bottom">
            <LandingPageCardWrapper>
              {featureCards.map((card, index) => (
                <FeaturedCards key={index} {...card} />
              ))}
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
