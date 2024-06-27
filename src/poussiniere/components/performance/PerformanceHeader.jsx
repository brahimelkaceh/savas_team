import React, { useState } from "react";
import SelectedComponents from "../ui/SelectedComponents";
import { Button } from "@mui/material";

const PerformanceHeader = ({ fetchData }) => {
  const [lotId, setLotId] = useState(null);
  return (
    <div className="modification-table-header">
      <div className="header-lot-container">
        <>
          <div className="content-box slide-in-blurred-right">
            <div className="header-content">
              <p>Site :</p>{" "}
            </div>
            <div className="header-content">
              <p>Bâtiment :</p>
            </div>
          </div>
          <div className="content-box slide-in-blurred-right ">
            <div className="header-content">
              <p>Souche :</p>
            </div>
            <div className="header-content">
              <p>Date naissance :</p>{" "}
            </div>
          </div>
          <div className="content-box slide-in-blurred-right">
            <div className="header-content">
              <p>Age Actuel :</p>
            </div>
            <div className="header-content">
              <p>Effectif Départ :</p>
            </div>
          </div>
          <div className="content-box slide-in-blurred-right">
            <div className="header-content">
              <p>Transfert :</p>
            </div>
            <div className="header-content">
              <p>Code lot :</p>
            </div>
          </div>
        </>
      </div>
      <div className="header-lot-container">
        <SelectedComponents lotId={lotId} setLotId={setLotId} />
        <Button
          variant="contained"
          className="fetch-btn"
          onClick={(e) => {
            e.preventDefault();
            fetchData(lotId);
          }}
        >
          Afficher les donnees
        </Button>
      </div>
    </div>
  );
};

export default PerformanceHeader;
