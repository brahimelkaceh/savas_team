import { useState, useEffect, useRef } from "react";
function UseFetchData(url, open, openDeleteModal) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0); // State variable to trigger data fetching

  const controllerRef = useRef(new AbortController());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const accessToken = JSON.parse(
          localStorage.getItem("authTokens")
        ).access;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, requestOptions);

        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          setData([]);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          setError("no data");
        }
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();

    // Cleanup function to abort the fetch request when the component is unmounted
    return () => controllerRef.current.abort();
  }, [url, trigger, open, openDeleteModal]); // Dependency array ensures the effect runs only when the URL changes
  // Function to trigger data fetching (use this function after CRUD operations)
  const refetchData = () => {
    setTrigger((prevTrigger) => prevTrigger + 1);
  };

  return { data, loading, error, refetchData };
}

export default UseFetchData;
