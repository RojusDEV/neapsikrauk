import logo from "@/assets/logo.svg";
import FilterAside from "@/components/layout/FilterAside";
import JobCardLayout from "@/components/layout/JobCardLayout/JobCardLayout";
import SearchFieldNav from "@/components/SearchField/SearchField";
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
          <JobCardLayout />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
