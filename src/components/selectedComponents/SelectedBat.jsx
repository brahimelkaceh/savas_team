import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import UseFetchData from "../../hooks/UseFetchData";
import { useData } from "../../pages/reports/context/DataProvider";
import { useSelector } from "react-redux";
let base_url = "https://farmdriver.savas.ma/api/";
const SelectedBat = ({ siteId, setBatId, batId }) => {
  const [bats, setBats] = useState([]);
  const [loading, setLoading] = useState(false);
  let renderData = useSelector((state) => state.getSiteData.renderData);

  const { dispatch } = useData();

  const apiUrl = useMemo(
    () => `${base_url}get-next-send/?batiment=${batId}`,
    [base_url, batId]
  );

  const {
    data,
    loading: nextLoading,
    error,
  } = UseFetchData(apiUrl, "GET", batId);

  useEffect(() => {
    // Dispatch the data to the context when it's available
    if (data) {
      dispatch({ type: "SET_DATA", payload: data });
    }
  }, [data, dispatch]);
  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }

  useEffect(() => {
    setBatId("");
  }, [renderData]);
  const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${base_url}get-site-bats/?site=${siteId}`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setBats(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [siteId]);
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id="demo-simple-select-standard-label">
        Sélectionnez un Bâtiment
      </InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={batId}
        disabled={loading}
        onChange={(e) => {
          setBatId(e.target.value);
        }}
        label="Bâtiment"
      >
        <MenuItem value=""></MenuItem>
        {bats?.length > 0 &&
          bats?.map((bat) => {
            return (
              <MenuItem key={bat.id} value={bat.id}>
                {bat.name}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default SelectedBat;
