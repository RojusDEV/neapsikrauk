import { IoClose } from "react-icons/io5";
import "./FilterAside.scss";
import type { Dispatch, SetStateAction } from "react";
import SalaryFilter from "@/components/Filters/SalaryFilter/SalaryFilter";
import FiltersWrapper from "@/components/Filters/FiltersWrapper/FiltersWrapper";


const FilterAside = ({
  isOpen,
  setIsFilterOpen,
}: {
  isOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <aside
      className={`filter-option-aside ${isOpen ? "filter-option-aside--open" : "filter-option-aside--closed"}`}
    >
      <div className="filter-option-aside__wrapper">
        <div className="aside_header">
          <span className="aside_title">Filtrai</span>
          <button
            className="aside_mobile_close_btn"
            onClick={() => setIsFilterOpen(!isOpen)}
          >
            <IoClose size={25} />
          </button>
        </div>
        <SalaryFilter />
        <FiltersWrapper />
      </div>
    </aside>
  );
};

export default FilterAside;
