import React, { useState } from "react";
import PdfDownloadBtn from "../../../components/buttons/PdfDownloadBtn";

const Index = () => {
  const [date, setDate] = useState("");
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div
          className="input-container"
          style={{
            width: "300px",
          }}
        >
          <input
            placeholder="Enter text"
            className="input-field"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />

          <span className="input-highlight"></span>
        </div>
      </div>
      <PdfDownloadBtn content={"Télecharger"} date={date} />
    </div>
  );
};

export default Index;
