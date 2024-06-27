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

function Constats({ formik, isProduction }) {
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
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Humidité (%)"
            name="humidity"
            size="small"
            value={formik.values.humidity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.humidity && Boolean(formik.errors.humidity)}
            helperText={formik.touched.humidity && formik.errors.humidity}
          />
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

export default Constats;
