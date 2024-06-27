import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

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

export default function DateSelected({ dates, status }) {
  const [dat, setDate] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setDate(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  React.useEffect(() => {
    // getLotIdDateOrAge(dat);
  }, [dat]);

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">Date</InputLabel>
        <Select
          disabled={!status}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          className="select-lot-box"
          multiple
          value={dat}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {dates.map((date) => (
            <MenuItem key={date} value={date}>
              <Checkbox checked={dat.indexOf(date) > -1} />
              <ListItemText primary={date} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
