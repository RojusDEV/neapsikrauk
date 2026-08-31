import logo from "@/assets/logo.svg";
import chevronLeft from "@/assets/UI/chevron-left.svg";
import chevronRight from "@/assets/UI/chevron-right.svg";
import FilterAside from "@/components/layout/FilterAside/FilterAside";
import JobCardLayout from "@/components/layout/JobCardLayout/JobCardLayout";
import SearchFieldNav from "@/components/SearchField/SearchField";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { NavLink, useParams } from "react-router";

const Dashboard = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  let params = useParams();
const [currPage, setCurrPage] = useState(params.page || 1);
  console.log(currPage);
  return (
    <div className="dashboard">
      <nav className="dashboard__nav">
        <div className="wrapper">
          <img src={logo} alt="logo" aria-label="logo" className="nav-logo" />
          <NavLink to="/" className="logo-title">
            neapsikrauk
          </NavLink>
          <SearchFieldNav
            props={{ className: "", placeholder: "Ieškoti darbo..." }}
          />
          <button
            className="filter-btn-mobile"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <CiFilter size={25} strokeWidth={1} color="#575b60" />
          </button>
        </div>
      </nav>
      <main className="dashboard__main">
        <div className="dashboard__wrapper">
          <FilterAside
            isOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
          />
          <JobCardLayout />
        </div>
        <div className="pagination">
          <div className="pagination__wrapper"> 
            <button className="pagination__button">
              <img src={chevronLeft} alt="move left" />
              <span>back</span>
            </button>
            <div className="pagination__pages">
              <div className="pagination__page">
                
              </div>
            </div>
            <button className="pagination__button">
              <span>next</span>
              <img src={chevronRight} alt="move right" />
            </button>
          </div>
          </div>
      </main>
    </div>
  );
};

export default Dashboard;
