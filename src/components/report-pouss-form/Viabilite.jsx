import StreamIcon from "@mui/icons-material/Stream";
import {
  Accordion,
  AccordionSummary,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
function Viabilite({ formik }) {
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
          background: "#ffe0c8",
          color: "#0d1f2d",
          p: 1,
          mb: 1,
          fontWeight: "bold",
          borderRadius: 1,
        }}
      >
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <StreamIcon /> Viabilité
        </Stack>
      </AccordionSummary>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          {/* MORT */}
          <TextField
            fullWidth
            label="Mortalité (Sujet)"
            name="mort"
            size="small"
            value={formik.values.mort}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.mort && Boolean(formik.errors.mort)}
            helperText={formik.touched.mort && formik.errors.mort}
          />
        </Grid>
        {/* SJT-ELMNT */}
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Triage (Sujet)"
            name="hensEliminated"
            size="small"
            value={formik.values.hensEliminated}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.hensEliminated &&
              Boolean(formik.errors.hensEliminated)
            }
            helperText={
              formik.touched.hensEliminated && formik.errors.hensEliminated
            }
          />
        </Grid>
        {/* POID VIF */}

        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Poids corporel (g)"
            name="poidVif"
            size="small"
            value={formik.values.poidVif}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.poidVif && Boolean(formik.errors.poidVif)}
            helperText={formik.touched.poidVif && formik.errors.poidVif}
          />
        </Grid>
        {/* HOMOGENITÉ */}
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            label="Homogeneité (%)"
            name="homog"
            size="small"
            value={formik.values.homog}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.homog && Boolean(formik.errors.homog)}
            helperText={formik.touched.homog && formik.errors.homog}
          />
        </Grid>
      </Grid>
    </Accordion>
  );
}

export default Viabilite;
