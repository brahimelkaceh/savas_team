import { Box, FormControl, Input, InputLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format

const SelectedDate = ({ formik }) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
      <TextField
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        type="date"
        name="date"
        value={formik.values.date}
        onChange={formik.handleChange}
        max={currentDate}
        variant="standard"
        error={formik.errors.date && Boolean(formik.errors.date)}
        helperText={formik.touched.date && formik.errors.date}
      />
    </FormControl>
  );
};

export default SelectedDate;
