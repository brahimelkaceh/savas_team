import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState } from "react";
import { useEffect } from "react";
import { useData } from "../context/DataProvider";
import { Stack } from "@mui/material";
const RangSlider = ({ maxValue, step, type, formik }) => {
  const [sliderValue, setSliderValue] = useState(formik?.values?.intensite);
  // ! Get Intensite Data
  const handleSliderChange = (event, newValue) => {
    formik?.handleChange(event);
    if (newValue) {
      setSliderValue(newValue);
    }
  };

  return (
    <Stack gap={2} flexDirection={"row"} alignItems="center">
      <Grid item>
        <LightModeIcon style={{ color: "#002661 " }} />
      </Grid>
      <Grid item xs>
        <Slider
          value={
            formik?.values?.intensite ? formik?.values?.intensite : sliderValue
          }
          onChange={handleSliderChange}
          name="intensite"
          id="intensite"
          max={maxValue}
          min={0}
          step={step}
          size="medium"
          valueLabelDisplay="on"
          disableSwap
          aria-label="Temperature"
          style={{ color: "#FFDB01 " }}
        />
      </Grid>
    </Stack>
  );
};

export default RangSlider;
