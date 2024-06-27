import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function AgeSelected({ ages, status, setObject, lotId }) {
  const [ag, setAge] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setAge(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    setObject({ lotId, times: ag });
  }, [ag]);
  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="demo-multiple-checkbox-label">Age</InputLabel>
      <Select
        disabled={status}
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        className="select-lot-box"
        multiple
        value={ag}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {ages.map((age) => (
          <MenuItem key={age} value={age}>
            <Checkbox checked={ag.indexOf(age) > -1} />
            <ListItemText primary={age} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
