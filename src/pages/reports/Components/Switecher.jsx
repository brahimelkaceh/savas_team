import { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Chip,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
const Switecher = ({ formik }) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="intensIsLux"
        row
        value={formik.values.intensIsLux}
        onChange={formik?.handleChange}
      >
        <Stack flexDirection={"row"} alignItems={"center"}>
          <FormLabel id="demo-row-radio-buttons-group-label">
            <Chip size="small" label="Intensité" color="info" />
          </FormLabel>
          <FormControlLabel value={false} control={<Radio />} label="%" />
          <FormControlLabel value={true} control={<Radio />} label="Lux" />
        </Stack>
      </RadioGroup>
    </FormControl>
  );
};

export default Switecher;
