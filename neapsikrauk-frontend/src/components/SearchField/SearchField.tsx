import useSetQueryParam from "@/hooks/useSetQueryParam";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "react-router";

interface Searchfieldprops {
  placeholder?: string;
  className?: string;
}

const SearchFieldNav = ({ props }: { props: Searchfieldprops }) => {
  const [searchParams] = useSearchParams();
  const keyw = searchParams.get("keyw") ?? "";

  const [search, setSearch] = useState(keyw);

  const updateQuery = useSetQueryParam();

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      updateQuery("keyw", search);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="search-field-wrapper">
      <CiSearch strokeWidth={2} color="#9FA6B4" size={20} />
      <input
        type="text"
        value={search}
        className={`search-field-nav ${props.className}`}
        placeholder={props.placeholder}
        aria-label={props.placeholder}
        onChange={(e) => handleSearchChange(e)}
        onKeyDown={(e) => handleSubmit(e)}
      />
    </div>
  );
};

export default SearchFieldNav;
