import React, { useEffect, useMemo, useState } from "react";
import PerformanceTable from "../components/performance/PerformanceTable";
import PerformanceHeader from "../components/performance/PerformanceHeader";
import "../components/performance/style.css";
import UseFetchData from "../../hooks/UseFetchData";
import Navbar from "../components/navbar/Navbar";
let base_url = "https://farmdriver.savas.ma/api/";

const Performance = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async (id) => {
    setLoading(true);
    try {
      const authTokens = JSON.parse(localStorage.getItem("authTokens"));
      if (!authTokens || !authTokens.access) {
        throw new Error("Access token not found");
      }
      const accessToken = authTokens.access;

      const response = await fetch(`${base_url}get-pouss-table/?lotId=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const fetchedData = await response.json();
      if (response.ok) {
        setData(fetchedData);
        setError("");
      }
      console.log(response);
      if (response.status === 404) {
        setError("Aucun LOT trouvé");
        setData([]);
      }
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="paged">
      <Navbar />
      <div className="modification-container">
        <PerformanceHeader fetchData={fetchData} />
        <PerformanceTable data={data} loading={loading} error={error} />
      </div>
    </main>
  );
};

export default Performance;
