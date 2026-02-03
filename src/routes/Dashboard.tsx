import logo from "@/assets/logo.svg";
import FilterAside from "@/components/layout/FilterAside";
import SearchFieldNav from "@/components/SearchField/SearchField";
import { CiBookmark } from "react-icons/ci";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <nav className="dashboard__nav">
        <div className="wrapper">
          <img src={logo} alt="logo" aria-label="logo" className="nav-logo" />
          <span className="logo-title">neapsikrauk</span>
          <SearchFieldNav
            props={{ className: "", placeholder: "Ieškoti darbo..." }}
          />
        </div>
      </nav>
      <main className="dashboard__main">
        <div className="dashboard__wrapper">
          <FilterAside />
          <section className="">
            <div className="">
              <div className="top">
                <span>5 darbo pasiūlymai</span>
                <div className="bookmark">
                  <CiBookmark />
                  <span>Išsaugoti (0)</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
