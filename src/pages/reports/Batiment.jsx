import React, { useEffect } from "react";

import BatimentSelection from "./BatimentSelection";
import BatimentForm from "./BatimentForm";

import { DataProvider, useData } from "./context/DataProvider";
import { useState } from "react";
import FormHeader from "./Components/FormHeader";
import { Box, Grid } from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

function Batiment({ batiments, siteId }) {
  const [batimentId, setBatimentId] = useState();
  const { dispatch } = useData();
  const [nextSendData, setNextSendData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBatData = async (id) => {
    try {
      setLoading(true);
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(`${base_url}get-next-send/?lotId=${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // Check for HTTP error status
        setLoading(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (response.ok) {
        setNextSendData(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setNextSendData({});
      setLoading(false);

      // You can handle the error here, e.g., display a message to the user
    }
  };

  useEffect(() => {
    // Dispatch the data to the context when it's available
    if (nextSendData) {
      dispatch({ type: "SET_DATA", payload: nextSendData });
    }
  }, [nextSendData, dispatch]);
  return (
    <>
      <div className="batiment-category">
        <BatimentSelection
          BatimentIdent={batiments}
          siteId={siteId}
          batimentId={batimentId}
          setBatimentId={setBatimentId}
          getBatData={getBatData}
        />
        <Grid container spacing={0} mb={3}>
          <Grid item md={6} xs={12}>
            <FormHeader
              nextReport={nextSendData?.nextDate}
              loading={loading}
              lot_code={nextSendData?.lot_code}
              siteId={siteId}
            />
          </Grid>
        </Grid>

        <BatimentForm
          siteId={siteId}
          BatimentIdent={batiments}
          batimentId={batimentId}
          isReform={nextSendData?.reforming}
        />
        {/* <LotCreation lotdata={batiments} /> */}
      </div>
    </>
  );
}

export default Batiment;
