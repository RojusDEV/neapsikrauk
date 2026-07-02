import React from "react";
import "./FiltersWrapper.scss";
import FilterOption from "../FilterOption/FilterOption";
const FiltersWrapper = () => {
  const jobTypes = [
    {
      filterType: "jobType",
      label: "Darbo tipas",
      options: [
        { id: "full_time", label: "Full Time" },
        { id: "part_time", label: "Part Time" },
        { id: "internship", label: "Internship" },
        { id: "contract", label: "Contract" },
        { id: "remote", label: "Remote" },
      ],
    },
    {
      filterType: "location",
      label: "Vieta",
      options: [
        { id: "vilnius", label: "Vilnius" },
        { id: "kaunas", label: "Kaunas" },
        { id: "klaipeda", label: "Klaipėda" },
        { id: "siauliai", label: "Šiauliai" },
        { id: "panevezys", label: "Panevėžys" },
        { id: "remote", label: "Nuotolis" },
      ],
    },
    {
      filterType: "Kategorija",
      label: "Kategorija",
      options: [
        { id: "IT / Technology", label: "IT / Technology" },
        { id: "Marketing / Reklama", label: "Marketing / Reklama" },
        { id: "Paslaugos", label: "Paslaugos" },
        { id: "Finansai / Bankai", label: "Finansai / Bankai" },
        { id: "Logistika / Transportas", label: "Logistika / Transportas" },
        { id: "other", label: "Kita" },
      ],
    },
  ]; //TODO: store in json file and fetch from there to avoid hardcoding
  return (
    <div className="filter_wrapper">
      <form className="filter_options">
        <fieldset className="filter_fieldset">
          {jobTypes.map((el) => (
            <React.Fragment key={el.filterType}>
              <legend className="filter_type_name">{el.label}</legend>
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
