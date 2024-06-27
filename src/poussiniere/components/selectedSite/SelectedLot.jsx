import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import api from "../../../api/api";
let base_url = "https://farmdriver.savas.ma/api/";

const SelectedLot = ({ siteId, lotId, setLotId }) => {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchPoussLot = async (id) => {
    console.log(id);
    try {
      if (!id) {
        return;
      }
      setLoading(true);
      const result = await api.getPoussLot(id);
      if (result.status === 200) {
        setLots(result?.data);
      } else {
        setError("failed to get lot");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("failed to get lot");
    } finally {
      setLoading(false);
      setLotId("");
    }
  };

  useEffect(() => {
    fetchPoussLot(siteId);
  }, [siteId]);
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">
        {"Selectionez un lot"}
      </InputLabel>

      <Select
        fullWidth
        required
        label={"Selectionez un lot"}
        id="lot"
        name="lot"
        value={lotId}
        disabled={loading}
        onChange={(e) => {
          setLotId(e.target.value);
        }}
      >
        <MenuItem value="">--</MenuItem>
        {lots &&
          lots?.map((lot) => {
            return (
              <MenuItem key={lot.id} value={lot.id}>
                {lot.batiment} ({lot.code})
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
};

export default SelectedLot;
