import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { getRenderData } from "../../../slices/SiteData";
import UseFetchData from "../../../hooks/UseFetchData";
import { getLotId } from "../../../slices/LeftBar";
import { Box, CircularProgress, Grid } from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

export default function SelectedComponents({
  dataLoading,
  setLotId,
  lotId,
  setSiteId,
  siteId,
  setIsReform,
  fetchLotData,
  activeLots,
  isLoading,
  reformLots,
}) {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setLotId(event.target.value);
    const currentLot = activeLots?.filter(
      (lot) => lot.id === event.target.value
    );
    setIsReform(currentLot[0]?.isReforming);
    dispatch(getRenderData(new Date().toString()));
  };
  const sitesTitlesApiUrl = React.useMemo(
    () => `${base_url}get-sites-titles/`,
    [base_url]
  );
  const { data, loading, error } = UseFetchData(sitesTitlesApiUrl, "GET");
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            {loading ? "chargement..." : "Sélectionnez un Site"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={siteId}
            disabled={loading}
            onChange={(e) => {
              setSiteId(e.target.value);
              fetchLotData(e.target.value);
            }}
            label="Age"
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
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            {isLoading ? "chargement..." : "Lots actifs"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={lotId}
            disabled={isLoading}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value=""></MenuItem>
            {activeLots &&
              activeLots?.map((lot) => {
                return (
                  <MenuItem key={lot.id} value={lot.id}>
                    {lot.batiment} ({lot.code})
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            {isLoading ? "chargement..." : "Lots réformé"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={lotId}
            disabled={isLoading}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value=""></MenuItem>
            {reformLots &&
              reformLots?.map((lot) => {
                return (
                  <MenuItem key={lot.id} value={lot.id}>
                    {lot.batiment} ({lot.code})
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
  return (
    <div style={{ display: "flex" }}>
      {dataLoading && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CircularProgress fourColor size={25} />
        </Box>
      )}
    </div>
  );
}
