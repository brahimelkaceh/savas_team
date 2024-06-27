import React, { useEffect, useMemo, useState } from "react";
import Chart from "../Chart";
import UseFetchData from "../../../../hooks/UseFetchData";
import Loader from "../../../../components/loader/Loader";
let base_url = "https://farmdriver.savas.ma/api/";

const Body = ({ paramId, lot }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const accessToken = JSON.parse(
          localStorage.getItem("authTokens")
        ).access;

        const response = await fetch(
          `${base_url}compare-multi-params/?lots=${JSON.stringify(
            lot
          )}&params=${JSON.stringify(paramId)}`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [paramId, lot]);

  // Memoize the Chart component to prevent unnecessary re-renders
  const memoizedChart = useMemo(() => {
    if (paramId.length > 0) {
      return <Chart data={data} paramId={paramId} />;
    }
    // Return null if paramId is empty
    return null;
  }, [paramId, data]);

  return (
    <>
      <div
        className="chart-body-container charts-box modal"
        style={{
          position: "relative",
          paddingTop: "5px",
          height: "81vh",
        }}
      >
        {loading && <Loader />}
        {memoizedChart}
      </div>
    </>
  );
};

export default Body;
