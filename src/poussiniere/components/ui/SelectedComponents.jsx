import React, { useState, useEffect, useMemo } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack, Typography } from "@mui/material";
import UseFetchData from "../../../hooks/UseFetchData";

let base_url = "https://farmdriver.savas.ma/api/";

export default function SelectedComponents({ lotId, setLotId, refresh }) {
  const [siteId, setSiteId] = useState("");

  const SiteApiurl = useMemo(() => `${base_url}get-pouss-sites/`, [base_url]);
  const { data, loading, error } = UseFetchData(SiteApiurl, "GET");

  const lotApiUrl = useMemo(
    () => `${base_url}get-pouss-lots/?site=${siteId}`,
    [base_url, siteId]
  );

  const {
    data: lotData,
    loading: lotDataLoading,
    error: lotError,
    refetchData,
  } = UseFetchData(lotApiUrl, "GET");

  useEffect(() => {
    refetchData();
  }, [refresh]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "end",
        justifyContent: "space-between",
      }}
    >
      <Stack flexDirection="row" gap={2}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Sélectionnez un Site
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            value={siteId}
            disabled={loading}
            onChange={(e) => setSiteId(e.target.value)}
          >
            {data?.map((site) => (
              <MenuItem key={site.id} value={site.id}>
                {site.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Sélectionnez un LOT
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Age"
            value={lotId}
            disabled={lotDataLoading}
            onChange={(e) => {
              setLotId(e.target.value);
            }}
          >
            {lotData?.map((lot) => (
              <MenuItem key={lot.id} value={lot.id}>
                {lot.batiment} ({lot.code})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      {/* Display selected lot's batiment in an h1 element */}
    </div>
  );
}
