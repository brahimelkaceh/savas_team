import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import api from "../../../api/api";
let base_url = "https://farmdriver.savas.ma/api/";

const SelectedSite = ({ siteId, setSiteId }) => {
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchPoussLot = async () => {
    try {
      setLoading(true);
      const result = await api.getPoussSites();
      if (result.status === 200) {
        setSites(result?.data);
      } else {
        setError("failed to get sites");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("failed to get sites");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPoussLot();
  }, []);
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">
        {"Selectionez un Site"}
      </InputLabel>

      <Select
        fullWidth
        required
        label={"Selectionez un Site"}
        id="site"
        name="site"
        value={siteId}
        disabled={loading}
        onChange={(e) => {
          setSiteId(e.target.value);
        }}
      >
        <MenuItem value="">--</MenuItem>
        {sites &&
          sites?.map((site) => {
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
