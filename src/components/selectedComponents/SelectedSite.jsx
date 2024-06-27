import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import UseFetchData from "../../hooks/UseFetchData";
let base_url = "https://farmdriver.savas.ma/api/";

const SelectedSite = ({ siteId, setSiteId }) => {
  const ApiUrl = React.useMemo(
    () => `${base_url}get-sites-titles/`,
    [base_url]
  );
  const { data, loading, error } = UseFetchData(ApiUrl, "GET");
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="demo-simple-select-standard-label">
        Sélectionnez un Site
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={siteId}
        disabled={loading}
        onChange={(e) => {
          setSiteId(e.target.value);
        }}
        label="Site"
      >
        <MenuItem value=""></MenuItem>
        {data &&
          data?.map((site) => {
            return (
              <MenuItem key={site.id} value={site.id}>
                {site.name}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default SelectedSite;
