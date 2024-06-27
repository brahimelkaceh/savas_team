import React, { useMemo } from "react";
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import UseFetchData from "../../../../hooks/UseFetchData";
let base_url = "https://farmdriver.savas.ma/api/";

const SiteSelected = ({ setSiteId }) => {
  const [site, setSite] = useState("");
  const SiteApiurl = useMemo(() => `${base_url}get-pouss-sites/`, [base_url]);
  const { data, loading } = UseFetchData(SiteApiurl);
  return (
    <FormControl sx={{ m: 1, minWidth: 300 }}>
      <InputLabel id="demo-simple-select-label">
        Sélectionnez un Site
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={site}
        label="Sélectionnez un Site"
        onChange={(e) => {
          setSiteId(e.target.value);
          setSite(e.target.value);
        }}
        disabled={loading}
      >
        {data?.map((site) => (
          <MenuItem value={site?.id} key={site?.id}>
            {site?.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SiteSelected;
