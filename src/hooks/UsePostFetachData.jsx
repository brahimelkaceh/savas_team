import { useState, useEffect, useRef } from "react";
function UsePostFetchData(url, method, lotId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const controllerRef = useRef(new AbortController());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = JSON.parse(
          localStorage.getItem("authTokens")
        ).access;

        const response = await fetch(url, {
          method: method,

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controllerRef.current.abort();
  }, [lotId]);

  return { data, loading, error };
}

export default UsePostFetchData;
