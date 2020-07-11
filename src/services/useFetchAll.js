import { useState, useEffect } from "react";

export default function useFetchAll(requests) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loading ?? data ?? error) return; // Only run once

    const promises = requests.map(({ url, init }) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url, init).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [data, error, loading, requests]);

  return [data, loading, error];
}
