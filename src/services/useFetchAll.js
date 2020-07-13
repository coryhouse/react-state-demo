import { useState, useEffect, useRef } from "react";

export default function useFetchAll(urls) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prevUrls = useRef([]);

  function areEqual(array1, array2) {
    return (
      array1.length === array2.length &&
      array1.every((value, index) => value === array2[index])
    );
  }

  useEffect(() => {
    // Only re-run if the array of URLs passed in changes
    if (areEqual(prevUrls.current, urls)) return;
    prevUrls.current = urls;
    const promises = urls.map((url) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [urls]);

  return [data, loading, error];
}
