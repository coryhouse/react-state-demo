import { useState, useEffect } from "react";

export default function useFetch(url, init) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data || error) return; // Only fetch once
    fetch(process.env.REACT_APP_API_BASE_URL + url, init)
      .then((response) => {
        if (response.ok) return response.json();
        setError("Bad network response.");
      })
      .then((data) => setData(data))
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [data, error, init, url]);

  return [data, error];
}
