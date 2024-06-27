import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import useCustomFetch from "../hooks/UseFetchData";
import UseLocalStorageState from "../../../hooks/UseLocalStorageState";
import Chart from "./Chart";
let base_url = "https://farmdriver.savas.ma/api/";

const ChartContainer = () => {
  const [id, setId] = useState(null);
  const [value, setValue] = useState(id);
  const [date, setDate] = UseLocalStorageState("ProdTime", 0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const apiUrl = useMemo(() => `${base_url}get-site-or-bats/`, []);

  const { data: batSite, loading, error } = UseFetchData(apiUrl);

  const { data: dataChart, loading: chartLoadin } = useCustomFetch(
    id ? id : false,
    365,
    "dash-charts"
  );
  const fetchDataById = (id) => {
    setId(id);
  };
  return (
    <Box className="chart-swiper">
      <Box sx={{ maxWidth: 400, margin: 1, mb: 0 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" site>
            Selectionez un site
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value ? value : ""}
            label="Selectionez un site"
            size="small"
            onChange={(e) => {
              setValue(e.target.value);
              fetchDataById(e.target.value);
            }}
          >
            {batSite?.map((bat) => {
              return (
                <MenuItem key={bat.id} value={bat.id}>
                  {bat.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      <Chart data={dataChart} />
    </Box>
  );
};

export default ChartContainer;
