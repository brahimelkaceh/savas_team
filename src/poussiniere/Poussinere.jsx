import React from "react";
import TestComponent from "./TestComponent";
import PerformanceHeader from "./components/performance/PerformanceHeader";
import { useState } from "react";
import { useMemo } from "react";
import UseFetchData from "../hooks/UseFetchData";
import Navbar from "./components/navbar/Navbar";
let base_url = "https://farmdriver.savas.ma/api/";

const Poussinere = () => {
  const [lotId, setLotId] = useState("");
  const lotApiUrl = useMemo(
    () => `${base_url}get-pouss-table/?lotId=${lotId}`,
    [base_url, lotId]
  );
  const { data, loading, error } = UseFetchData(lotApiUrl, "GET");
  return (
    <main className="page">
      <Navbar />
      <div className="modification-container"></div>
    </main>
  );
};

export default Poussinere;
