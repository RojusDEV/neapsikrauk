import JobCategory from "../JobCategory";

const popularCategories = [
  "IT",
  "HoReCa",
  "Marketing",
  "Finansai",
  "Nuotolinis",
];

const PopularCategories = () => {
  return (
    <div className="categories">
      <span className="categories-title">Populiariausios kategorijos:</span>
      <ul className="popular-categories-list">
        {popularCategories.map((category) => (
          <li key={category} className="popular-category-el">
            <JobCategory title={category} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PopularCategories;
