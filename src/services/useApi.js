import { useState, useEffect } from "react";

export default function useApi(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_BASE_URL + url)
      .then((response) => {
        if (response.ok) return response.json();
        setError("Bad network response.");
      })
      .then((data) => setData(data))
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [url]);

  return [data, error];
}
