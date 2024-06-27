import FindInPageIcon from "@mui/icons-material/FindInPage";
import {
  Accordion,
  AccordionSummary,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

function EditConstats({ formik, last_rep }) {
  const colorationLabel = {
    70: "70",
    80: "80",
    90: "90",
    100: "100",
    110: "110",
  };
  const qltLabel = {
    1: "1/10",
    2: "3/10",
    3: "5/10",
    4: "7/10",
    5: "10/10",
  };

  // ! Get Coloration Data
  last_rep?.coloration &&
    (formik.values.coloration
      ? (formik.values.coloration = formik.values.coloration)
      : (formik.values.coloration = last_rep?.coloration));
  // ! Get Quality Coquille Data
  last_rep?.qty_coquille &&
    (formik.values.qty_shell
      ? (formik.values.qty_shell = formik.values.qty_shell)
      : (formik.values.qty_shell = last_rep?.qty_coquille));
  return (
    <Accordion
      sx={{
        p: 1,
      }}
      defaultExpanded
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          background: "#ffc000",
          color: "#333",
          p: 1,
          mb: 1,
          fontWeight: "bold",
          borderRadius: 1,
        }}
      >
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <FindInPageIcon /> Constats
        </Stack>
      </AccordionSummary>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              Qualité de coquille
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="qty_shell"
              value={formik.values.qty_shell}
              onChange={formik.handleChange}
              label="Qualité de coquille"
            >
              <MenuItem value="">
                <em>--</em>
              </MenuItem>
              {Object.keys(qltLabel).map((key, i) => {
                return (
                  <MenuItem key={i} value={key}>
                    {qltLabel[key]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-standard-label">
              Coloration d'oeuf
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              name="coloration"
              value={formik.values.coloration}
              onChange={formik.handleChange}
              label="Coloration d'oeuf"
            >
              <MenuItem value="">
                <em>--</em>
              </MenuItem>
              {Object.keys(colorationLabel).map((key, i) => {
                return (
                  <MenuItem key={i} value={key}>
                    {colorationLabel[key]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            id="standard-multiline-static"
            label="Observation"
            name="observation"
            value={formik.values.observation}
            onChange={formik.handleChange}
            multiline
            rows={4}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Accordion>
  );
}

export default EditConstats;
