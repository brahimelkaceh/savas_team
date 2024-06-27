import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UseFetchData from "../../hooks/UseFetchData";
import SelectedSite from "./SelectedSite";
import { useState, useMemo } from "react";
import SelectedBat from "./SelectedBat";
import SelectedDate from "./SelectedDate";
import SelectedComponents from "../../pages/dashboard/modals/SelectedComponents";
let base_url = "https://farmdriver.savas.ma/api/";

export default function Container({
  date,
  setDate,
  handleDateInputChange,
  siteId,
  setSiteId,
  lotId,
  setLotId,
}) {
  console.log(siteId);
  const lotTitlesApiUrl = useMemo(
    () => `${base_url}get-lots-titles/?site=${siteId}`,
    [base_url, siteId]
  );
  const { data, loading, error } = UseFetchData(lotTitlesApiUrl, "GET");
  return (
    <div
      className="observation-modal"
      style={{ display: "flex", alignItems: "center" }}
    >
      <SelectedComponents
        setSiteId={setSiteId}
        siteId={siteId}
        setLotId={setLotId}
        lotId={lotId}
        lotTitlesLoading={loading}
        lotTitlesData={data}
      />

      <SelectedDate
        date={date}
        setDate={setDate}
        handleDateInputChange={handleDateInputChange}
      />
    </div>
  );
}
