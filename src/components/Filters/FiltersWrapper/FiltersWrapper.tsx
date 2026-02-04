import React from "react";
import "./FiltersWrapper.scss";
import FilterOption from "../FilterOption/FilterOption";

const FiltersWrapper = () => {
  const jobTypes = [
    {
      filterType: "Darbo tipas",
      options: [
        { id: "full-time", label: "Full-Time" },
        { id: "part-time", label: "Part-Time" },
        { id: "internship", label: "Internship" },
        { id: "contract", label: "Contract" },
        { id: "remote", label: "Remote" },
      ],
    },
    {
      filterType: "Vieta",
      options: [
        { id: "vilnius", label: "Vilnius" },
        { id: "kaunas", label: "Kaunas" },
        { id: "klaipeda", label: "Klaipėda" },
        { id: "siauliai", label: "Šiauliai" },
        { id: "panevezys", label: "Panevėžys" },
        { id: "nuotolis", label: "Nuotolis" },
      ],
    },
    {
      filterType: "Kategorija",
      options: [
        { id: "it", label: "IT / Technology" },
        { id: "marketing", label: "Marketing / Reklama" },
        { id: "services", label: "Paslaugos" },
        { id: "finance", label: "Finansai / Bankai" },
        { id: "logistics", label: "Logistika / Transportas" },
        { id: "other", label: "Kita" },
      ],
    },
  ];
  return (
    <div className="filter_wrapper">
      <form className="filter_options">
        <fieldset className="filter_fieldset">
          {jobTypes.map((el) => (
            <React.Fragment key={el.filterType}>
              <legend className="filter_type_name">{el.filterType}</legend>
              {el.options.map((option) => (
                <FilterOption
                  key={option.id}
                  job={option}
                  filterType={el.filterType}
                />
              ))}
            </React.Fragment>
          ))}
        </fieldset>
      </form>
    </div>
  );
};

export default FiltersWrapper;
