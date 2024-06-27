import React, { useMemo, useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import UseFetchData from "../../../hooks/UseFetchData";

let base_url = "https://farmdriver.savas.ma/api/";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function LotSelected({
  siteId,
  setLot,
  setData,
  lotName,
  setLotName,
}) {
  const lotApiUrl = useMemo(
    () => `${base_url}get-lots-titles/?site=${siteId}`,
    [base_url, siteId]
  );
  const { data, loading, error } = UseFetchData(lotApiUrl, "GET");
  const prodLot = data?.filter((lot) => lot.type === "production");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setLotName(typeof value === "string" ? value.split(",") : value);
    setLot(typeof value === "string" ? value.split(",") : value);
    // setLot(newSelectedLots);
  };

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel id="demo-multiple-checkbox-label">
        {loading ? "Télechargment encours..." : "Sélectionnez les Lots"}
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={lotName}
        onChange={handleChange}
        input={<OutlinedInput label="Sélectionnez les Lots" />}
        renderValue={(selected) => {
          const codeLot = prodLot.filter((par) => selected.includes(par.id));
          return codeLot.map((lot, i) => (
            <span key={i}> {`${lot.batiment} (${lot.code})`},</span>
          ));
        }}
        MenuProps={MenuProps}
      >
        {prodLot?.map((lot) => {
          return (
            <MenuItem key={lot.id} value={lot.id}>
              <Checkbox checked={lotName.includes(lot.id)} />
              <ListItemText secondary={`${lot.batiment} (${lot.code})`} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
