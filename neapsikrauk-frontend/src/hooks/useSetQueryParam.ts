import queryString from "query-string";
import { useNavigate } from "react-router-dom";

const useSetQueryParam = () => {
  const navigate = useNavigate();

  return (key: string, value: string | string[]) => {
    const parsed = queryString.parse(window.location.search);

    if (Array.isArray(value)) {
      parsed[key] = value;
    } else {
      parsed[key] = value;
    }

    const newQueryString = queryString.stringify(parsed);

    navigate(`${location.pathname}?${newQueryString}`, {
      replace: true,
    });
  };
};

export default useSetQueryParam;
