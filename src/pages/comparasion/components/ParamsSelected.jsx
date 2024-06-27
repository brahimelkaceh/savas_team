import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";

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
export const params = [
  { id: 0, label: "Ponte (%)" },
  { id: 1, label: "∑ NOPPD" },
  { id: 2, label: "PMO (g)" },
  { id: 3, label: "Blancs" },
  { id: 4, label: "Declassés" },
  { id: 5, label: "Mortalité / Semaine (%)" },
  { id: 6, label: "∑ Mortalité / PD (%s)" },
  { id: 7, label: "Eau consommée (ml/j)" },
  { id: 8, label: "Aliment consommé (g/j)" },
  { id: 9, label: "∑ Aliment consommé (kg)" },
  { id: 10, label: "Ratio (Eau/Alt)" },
  { id: 11, label: "Homogénéité (%)" },
  { id: 12, label: "Poids corporel (g)" },
  { id: 13, label: "Masse d'oeuf hebdomadaire (g)" },
  { id: 14, label: "∑ Masse Oeuf (Kg)" },
];
export default function ParamSelected({ param, setParam, setParamId }) {
  useEffect(() => {
    setParam((prevLot) => [...param]);
  }, [param]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // Find the corresponding parameter objects based on the selected labels
    const selectedParams = params.filter((par) => value.includes(par.label));

    // Extract the ids of the selected parameters
    const selectedIds = selectedParams.map((par) => par.id);
    // Update the states
    setParam(typeof value === "string" ? value.split(",") : value);
    setParamId(selectedIds);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">
          {" "}
          Sélectionnez les Paramétres
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={param}
          onChange={handleChange}
          input={<OutlinedInput label="Sélectionnez les Lots" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {params?.map((par) => {
            return (
              <MenuItem key={par.id} value={par.label}>
                <Checkbox checked={param.indexOf(par.label) > -1} />
                <ListItemText primary={par.label} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
