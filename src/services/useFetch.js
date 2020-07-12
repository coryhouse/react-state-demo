import { useState, useEffect, useRef } from "react";

export default function useFetch(url, init) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    if (!loading ?? data ?? error) return; // Only run once

    fetch(process.env.REACT_APP_API_BASE_URL + url, init)
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => {
        if (isMounted.current) setData(data);
      })
      .catch((err) => {
        if (isMounted.current) {
          console.error(err);
          setError(err);
        }
      })
      .finally(() => {
        if (isMounted.current) setLoading(false);
      });

    return () => {
      isMounted.current = false;
    };
  }, [data, error, init, loading, url]);

  return [data, loading, error];
}
