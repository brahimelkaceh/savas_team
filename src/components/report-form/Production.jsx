import EggIcon from "@mui/icons-material/Egg";
import {
  Accordion,
  AccordionSummary,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
function Production({ formik }) {
  return (
    <Accordion
      sx={{
        p: 1,
      }}
      defaultExpanded
    >
      <AccordionSummary
        expandIcon={
          <ExpandMore
            sx={{
              color: "#fff",
            }}
          />
        }
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          background: "#8b4513",
          color: "#fff",
          p: 1,
          mb: 1,
          fontWeight: "bold",
          borderRadius: 1,
        }}
      >
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <EggIcon /> Production
        </Stack>
      </AccordionSummary>
      <Grid container spacing={2}>
        {/* Production Normal */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Œufs normaux"
            name="prod_normal"
            size="small"
            autoComplete="off"
            value={formik.values.prod_normal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.prod_normal && Boolean(formik.errors.prod_normal)
            }
            helperText={formik.touched.prod_normal && formik.errors.prod_normal}
          />
        </Grid>
        {/* Production Double jaune */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Œufs double jaune"
            name="prod_dj"
            size="small"
            autoComplete="off"
            value={formik.values.prod_dj}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.prod_dj && Boolean(formik.errors.prod_dj)}
            helperText={formik.touched.prod_dj && formik.errors.prod_dj}
          />
        </Grid>
        {/* Production  feles*/}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Sale"
            name="prod_feles"
            size="small"
            autoComplete="off"
            value={formik.values.prod_feles}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.prod_feles && Boolean(formik.errors.prod_feles)
            }
            helperText={formik.touched.prod_feles && formik.errors.prod_feles}
          />
        </Grid>
        {/* Production  Cassé*/}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Cassé"
            name="prod_casse"
            size="small"
            autoComplete="off"
            value={formik.values.prod_casse}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.prod_casse && Boolean(formik.errors.prod_casse)
            }
            helperText={formik.touched.prod_casse && formik.errors.prod_casse}
          />
        </Grid>
        {/* Production  Blanc*/}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Œufs blancs"
            name="prod_blanc"
            size="small"
            autoComplete="off"
            value={formik.values.prod_blanc}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.prod_blanc && Boolean(formik.errors.prod_blanc)
            }
            helperText={formik.touched.prod_blanc && formik.errors.prod_blanc}
          />
        </Grid>
        {/* Production  Liquide*/}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Liquide (Kg)"
            name="prod_liquide"
            size="small"
            autoComplete="off"
            value={formik.values.prod_liquide}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.prod_liquide && Boolean(formik.errors.prod_liquide)
            }
            helperText={
              formik.touched.prod_liquide && formik.errors.prod_liquide
            }
          />
        </Grid>
        {/* Production  Eliminé*/}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Triage"
            name="prod_elimne"
            size="small"
            autoComplete="off"
            value={formik.values.prod_elimne}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.prod_elimne && Boolean(formik.errors.prod_elimne)
            }
            helperText={formik.touched.prod_elimne && formik.errors.prod_elimne}
          />
        </Grid>
        {/* PMO */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="PMO (g)"
            name="pmo"
            size="small"
            autoComplete="off"
            value={formik.values.pmo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.pmo && Boolean(formik.errors.pmo)}
            helperText={formik.touched.pmo && formik.errors.pmo}
          />
        </Grid>
      </Grid>
    </Accordion>
  );
}

export default Production;
