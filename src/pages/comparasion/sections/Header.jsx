import * as React from "react";
import SiteSelected from "../components/SiteSelected";
import { useState } from "react";
import LotSelected from "../components/LotSelected";
import LotList from "../components/LotList";
import ChartSelected from "../components/ChartSelected";
import { Grid } from "@mui/material";

const Header = ({ setLot, setData, setCourbeId }) => {
  const [siteId, setSiteId] = useState("");
  const [lotName, setLotName] = useState([]);
  const handleDeleteItem = (deletedItem) => {
    const updatedParamName = lotName.filter((name) => name !== deletedItem);
    setLotName(updatedParamName);
  };

  return (
    <Grid container spacing={1} mb={1} px={1}>
      <Grid item xs={12} md={6} lg={4}>
        <SiteSelected setSiteId={setSiteId} />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <LotSelected
          siteId={siteId}
          setLot={setLot}
          setData={setData}
          lotName={lotName}
          setLotName={setLotName}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <ChartSelected setCourbeId={setCourbeId} />
      </Grid>
    </Grid>
  );
};

export default Header;
