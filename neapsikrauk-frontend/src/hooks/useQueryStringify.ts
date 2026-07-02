import queryString from "query-string";
import { useNavigate } from "react-router-dom";

const useQueryStringify = () => {
  const navigate = useNavigate();

  return (key: string, value: string, checked: boolean) => {
    const parsed = queryString.parse(window.location.search);
    const current = parsed[key];

    let values: string[] = [];

    if (typeof current === "string") {
      values = current.split(",");
    }
    // If the checkbox is checked, add the value to the array; if unchecked, remove it.
    if (checked) {
      if (!values.includes(value)) {
        values.push(value);
      }
    } else {
      values = values.filter((v) => v !== value);
    }
    // If there are values, set them in the query string, if not remove the key from the query string.
    if (values.length > 0) {
      parsed[key] = values.join(",");
    } else {
      delete parsed[key];
    }

    const newQueryString = queryString.stringify(parsed);

    navigate(`${location.pathname}?${newQueryString}`, {
      replace: true,
    });
  };
};

export default useQueryStringify;
