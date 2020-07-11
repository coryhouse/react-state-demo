import { useState, useEffect, useRef } from "react";

export default function useFetch(url, init) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(false);
  const prevInit = useRef();
  const prevUrl = useRef();

  useEffect(() => {
    isMounted.current = true;
    // Only refetch if url or init params change.
    if (prevUrl.current === url && prevInit.current === init) return;
    prevUrl.current = url;
    prevInit.current = init;
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
  }, [init, url]);

  return [data, loading, error];
}
