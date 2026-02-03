import SalaryFilter from "../Filters/SalaryFilter";
import "./FilterAside.scss";

const FilterAside = () => {
  return (
    <aside className="filter-option-aside">
      <span>Filtrai</span>
      <SalaryFilter />
    </aside>
  );
};

export default FilterAside;
