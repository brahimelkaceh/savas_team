import { useState, useEffect, useRef } from "react";
let base_url = "https://farmdriver.savas.ma/api/";

const useFetchData = (id, date, param) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    return () => {
      abortControllerRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (id !== null && date !== null) {
      const fetchData = async () => {
        try {
          setLoading(true);

          const abortController = new AbortController();
          abortControllerRef.current = abortController;
          const accessToken = JSON.parse(
            localStorage.getItem("authTokens")
          ).access;
          const requestOptions = {
            signal: abortController.signal,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          };

          const response = await fetch(
            `${base_url}${param}/?place=${id}&time=${date}`,
            requestOptions
          );

          if (response.status === 200) {
            const result = await response.json();
            setData(result);
          } else {
            throw new Error("Request failed with status: " + response.status);
          }
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Request aborted");
          } else {
            console.error("Error during fetch:", error);
            setData([]);
          }
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      return () => {
        abortControllerRef.current.abort();
      };
    }
  }, [id, date]);
  return { data, loading };
};
const useCustomFetch = (id, date, param) => {
  return useFetchData(id, date, param);
};

export default useCustomFetch;
