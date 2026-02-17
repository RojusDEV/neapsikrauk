import logo from "@/assets/logo.svg";
import FilterAside from "@/components/layout/FilterAside/FilterAside";
import JobCardLayout from "@/components/layout/JobCardLayout/JobCardLayout";
import SearchFieldNav from "@/components/SearchField/SearchField";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { NavLink } from "react-router";

const Dashboard = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  return (
    <div className="dashboard">
      <nav className="dashboard__nav">
        <div className="wrapper">
          <img src={logo} alt="logo" aria-label="logo" className="nav-logo" />
          <NavLink to="/" className="logo-title" >
            neapsikrauk
          </NavLink>
          <SearchFieldNav
            props={{ className: "", placeholder: "Ieškoti darbo..." }}
          />
          <button
            className="filter-btn-mobile"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <CiFilter size={25} strokeWidth={1} color="#575b60"/>
          </button>
        </div>
      </nav>
      <main className="dashboard__main">
        <div className="dashboard__wrapper">
          <FilterAside isOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}/>
          <JobCardLayout />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
