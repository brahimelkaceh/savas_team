import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useMemo, useState } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import ChartOptions from "./ChartOptions";

let base_url = "https://farmdriver.savas.ma/api/";

const Header = ({
  setLotId,
  lotId,
  setTitle,
  checkboxItems,
  setPersonName,
  personName,
}) => {
  const [id, setId] = useState("");

  const sitesTitlesApiUrl = useMemo(
    () => `${base_url}get-sites-titles/`,
    [base_url]
  );
  const {
    data: sitesData,
    loading: sitesLoading,
    error: sitesErros,
  } = UseFetchData(sitesTitlesApiUrl, "GET");
  const lotTitlesApiUrl = useMemo(
    () => `${base_url}get-lots-titles/?site=${id}`,
    [base_url, id]
  );
  const { data, loading, error } = UseFetchData(lotTitlesApiUrl, "GET");
  const filterTitles = (id) => {
    const filterTitle = data.filter((title) => title.id === id);
    setTitle(filterTitle[0].code);
  };
  const handleChange = (event) => {
    setLotId(event.target.value);
    filterTitles(event.target.value);
  };

  return (
    <Grid container spacing={1} mb={1}>
      <Grid item xs={6} lg={3}>
        <FormControl variant="outlined" fullWidth controled>
          <InputLabel id="demo-simple-select-standard-label">
            {sitesLoading ? "chargement..." : "Sélectionnez un Site"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={id}
            disabled={sitesLoading}
            onChange={(e) => {
              setId(e.target.value);
            }}
            label="Age"
          >
            <MenuItem value=""></MenuItem>
            {sitesData &&
              sitesData?.map((site) => {
                return (
                  <MenuItem key={site.id} value={site.id}>
                    {site.name}
                  </MenuItem>
                );
              })}{" "}
          </Select>
        </FormControl>{" "}
      </Grid>
      <Grid item xs={6} lg={3}>
        <FormControl fullWidth variant="outlined" controled>
          <InputLabel id="demo-simple-select-standard-label">
            {loading ? "chargement..." : " Sélectionnez un LOT"}
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={lotId}
            disabled={loading}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value=""></MenuItem>
            {data &&
              data
                ?.filter((d) => d.type == "production")
                ?.map((title) => {
                  console.log(title);
                  return (
                    <MenuItem key={title.id} value={title.id}>
                      {title?.batiment} ({title.code})
                    </MenuItem>
                  );
                })}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} lg={6}>
        <ChartOptions
          personName={personName}
          setPersonName={setPersonName}
          checkboxItems={checkboxItems}
        />
      </Grid>
    </Grid>
  );
};

export default Header;
