import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import UseFetchData from "../../../hooks/UseFetchData";
let base_url = "https://farmdriver.savas.ma/api/";

const SelectedLot = ({ siteId, setLotId, lotId, formik }) => {
  const ApiUrl = React.useMemo(
    () => `${base_url}get-pouss-lots/?site=${siteId}`,
    [base_url, siteId]
  );
  const { data, loading, error } = UseFetchData(ApiUrl, "GET");
  return (
    <label>
      <select
        required
        id="lot"
        name="lot"
        className="input"
        value={formik.values.lot}
        disabled={loading}
        onChange={(e) => {
          setLotId(e.target.value);
          formik.handleChange(e);
        }}
      >
        <option value="">--</option>
        {data &&
          data?.map((site) => {
            return (
              <option key={site.id} value={site.id}>
                {site.batiment} ({site.code})
              </option>
            );
          })}
      </select>
      <span> Selectionez un Lot*</span>
    </label>
  );
};

export default SelectedLot;
