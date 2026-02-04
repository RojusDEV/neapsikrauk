import FiltersWrapper from "../Filters/FiltersWrapper/FiltersWrapper";
import SalaryFilter from "../Filters/SalaryFilter/SalaryFilter";
import "./FilterAside.scss";

const FilterAside = () => {
  return (
    <aside className="filter-option-aside">
      <span className="aside_title">Filtrai</span>
      <SalaryFilter />
      <FiltersWrapper />
    </aside>
  );
};

export default FilterAside;
