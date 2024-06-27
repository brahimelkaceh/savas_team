import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const charts = [
  { id: 0, label: "Production" },
  { id: 1, label: "Mortalité" },
  { id: 2, label: "Consommations" },
  { id: 3, label: "Poids corporel & Homogénéité" },
  { id: 4, label: "Masse d'oeufs" },
];

export default function ChartSelected({ setCourbeId }) {
  const [chart, setChart] = React.useState("");

  const handleChange = (event) => {
    setChart(event.target.value);
    setCourbeId(event.target.value);
  };

  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <InputLabel id="demo-simple-select-label">
        Sélectionnez une courbe
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={chart}
        label="Sélectionnez une courbe"
        onChange={handleChange}
      >
        {charts?.map((chart) => (
          <MenuItem key={chart.id} value={chart.id}>
            {chart.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
