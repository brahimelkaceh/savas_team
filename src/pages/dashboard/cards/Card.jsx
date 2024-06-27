import React, { useMemo } from "react";
import SkeletonBlock from "../skeletons/SkeletonBlock";
import UseFetchData from "../../../hooks/UseFetchData";
import barchart from "../../../assets/bar-charts.svg";
import { Box } from "@mui/material";

let base_url = "https://farmdriver.savas.ma/api/";

const Card = () => {
  const apiUrl = useMemo(() => `${base_url}first-block/`, []);

  const { data, loading, error } = UseFetchData(apiUrl);
  if (loading) {
    return (
      <Box
        gridColumn="span 3"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <SkeletonBlock />
        {/* loading */}
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        gridColumn="span 3"
        display="flex"
        alignItems="center"
        justifyContent="center"
        // className="header-card "
      >
        Error occurred: {error.message}
      </Box>
    );
  }

  if (!data) {
    return <div>No data available.</div>;
  }
  return (
    data && (
      <Box
        gridColumn="span 3"
        display="flex"
        alignItems="center"
        justifyContent="center"
        className="header-card "
      >
        <div className="card-item-content">
          <div className="card-item-icon">
            <img src={barchart} alt="" />
          </div>
          <div className="card-item-footer">
            <p className="moy-age ">
              <span>Total Effectif </span>
              {data?.effectifTot}
            </p>

            <p className="moy-age">
              <span>Age Moyen</span>
              {data?.age_moy}
            </p>
          </div>
        </div>
      </Box>
    )
  );
};

export default Card;
