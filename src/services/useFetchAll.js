import { useState, useEffect } from "react";

export default function useFetchAll(requests) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data ?? error) return; // Only run once
    const promises = requests.map(({ url, init }) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url, init)
    );
    Promise.all(promises)
      .then((responses) => {
        return Promise.all(
          responses.map((response) => {
            if (!response.ok) setError("Bad network response.");
            return response.json();
          })
        );
      })
      .then((data) => setData(data))
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [data, error, requests]);

  return [data, error];
}
