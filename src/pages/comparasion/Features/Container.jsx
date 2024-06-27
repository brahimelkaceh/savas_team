import React from "react";
import { useState } from "react";
import "../style/style.css";
import Navbar from "../../../components/navbar/Navbar";
import Header from "./sections/Header";
import Body from "./sections/Body";
const Parametre = () => {
  const [lot, setLot] = useState([]);
  const [lotId, setLotId] = useState([]);
  const [paramId, setParamId] = useState([]);
  const [param, setParam] = useState([]);
  const [data, setData] = useState([]);
  return (
    <main className="page">
      <Navbar />
      <div className="charts-container">
        <Header
          setLot={setLot}
          lot={lot}
          setData={setData}
          param={param}
          setParam={setParam}
          setParamId={setParamId}
          paramId={paramId}
          lotId={lotId}
          setLotId={setLotId}
        />
        <Body paramId={paramId} lot={lot} />
      </div>
    </main>
  );
};

export default Parametre;
