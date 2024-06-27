import * as React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import BarCharts from "../charts/BarCharts";

const icon = (
  //   <BarCharts elevation={4} />
  <Paper sx={{ m: 1 }} elevation={4}>
    <Box sx={{ width: 300, height: 200 }}></Box>
  </Paper>
);

export default function CollapsBtn() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ height: 300 }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Box
        sx={{
          "& > :not(style)": {
            display: "flex",
            justifyContent: "space-around",
            height: "100%",
            width: "99%",
            bgcolor: "red",
          },
        }}
      >
        <div>
          {/* <Collapse in={checked}>{icon}</Collapse> */}
          <Collapse in={checked} collapsedSize={40}>
            {icon}
          </Collapse>
        </div>
      </Box>
    </Box>
  );
}
