import React, { useEffect, useState } from "react";
import BatimentCat from "../batimentCat/BatimentCat";
import SitesBar from "../sitesBar/SitesBar";
import { useSelector } from "react-redux";
import TopDrawer from "../drawer/TopDrawer";

function BatimentBox({ siteData, CreateReports }) {
  const data = useSelector((state) => state.ShowBatimentCat.data);
  const batimentCatState = useSelector(
    (state) => state.ShowBatimentCat.batimentCatState
  );
  // console.log(batimentCatState);

  if (data.production !== undefined) {
    console.log();
  }
  // console.log(siteData.map((sData) => sData));

  return (
    <div style={{ width: " 100%" }}>
      <SitesBar siteData={siteData} />

      {batimentCatState && (
        <>
          <TopDrawer data={data} />
          <BatimentCat CreateReports={CreateReports} data={data} />
        </>
      )}
    </div>
  );
}

export default BatimentBox;
