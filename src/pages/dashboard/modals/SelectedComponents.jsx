import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch } from "react-redux";
import { getRenderData } from "../../../slices/SiteData";
import UseFetchData from "../../../hooks/UseFetchData";
import { getLotId } from "../../../slices/LeftBar";
import {
  Box,
  CircularProgress,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { useState } from "react";
import api from "../../../api/api";
import { useEffect } from "react";
let base_url = "https://farmdriver.savas.ma/api/";

export default function SelectedComponents({ formik }) {
  const [siteId, setSiteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [sites, setSites] = useState([]);
  const [errors, setError] = useState(false);
  const [lotData, setLotData] = useState([]);

  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(getRenderData(new Date().toString()));
  };

  useEffect(() => {
    const fetchSites = async () => {
      try {
        setLoading(true);
        const result = await api.getAllSites();
        setSites(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, []);
  const fetchLotData = async (id) => {
    try {
      setLoading(true);
      const result = await api.getLotTitles(id);
      console.log(result);
      setLotData(result);
    } catch (error) {
      setError("failed to fetch");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
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
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
          <TextField
            TextField
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            name="lotId"
            value={formik.values.lotId}
            onChange={formik.handleChange}
            variant="standard"
            onBlur={formik.handleBlur}
            error={formik.errors.lotId && Boolean(formik.errors.lotId)}
            select
            label={loading ? "chargement..." : "Sélectionnez un LOT"}
            helperText={formik.touched.lotId && formik.errors.lotId}
          >
            <MenuItem value="">--</MenuItem>
            {lotData &&
              lotData?.map((title) => {
                return (
                  <MenuItem key={title.id} value={title.id}>
                    {title.code}
                  </MenuItem>
                );
              })}
          </TextField>
        </FormControl>
      </Grid>
    </Grid>
  );
}
