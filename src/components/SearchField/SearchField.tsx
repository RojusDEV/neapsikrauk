import { CiSearch } from "react-icons/ci";

interface Searchfieldprops {
  placeholder?: string;
  className?: string;
}

const SearchFieldNav = ({ props }: { props: Searchfieldprops }) => {
  return (
    <div className="search-field-wrapper">
      <CiSearch strokeWidth={2} color="#9FA6B4" size={20}/>
      <input
        type="text"
        className={`search-field-nav ${props.className}`}
        placeholder={props.placeholder}
        aria-label={props.placeholder}
      />
    </div>
  );
};

export default SearchFieldNav;
