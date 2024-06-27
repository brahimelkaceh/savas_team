import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import Switecher from "../../pages/reports/Components/Switecher";
import RangSlider from "../../pages/reports/Components/RangSlider";
import {
  Accordion,
  AccordionSummary,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
function Ambiance({ formik, isProduction }) {
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
          background: "#61dafb",
          color: "#22223b",
          p: 1,
          mb: 1,
          fontWeight: "bold",
          borderRadius: 1,
        }}
      >
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <SentimentSatisfiedIcon /> Ambiance
        </Stack>
      </AccordionSummary>
      <Grid container spacing={2}>
        {/* Temperature int min */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Température intérieure minimale"
            name="temperatureMin"
            size="small"
            value={formik.values.temperatureMin}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.temperatureMin &&
              Boolean(formik.errors.temperatureMin)
            }
            helperText={
              formik.touched.temperatureMin && formik.errors.temperatureMin
            }
          />
        </Grid>
        {/* Temperature int max */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Température intérieure maximale"
            name="temperatureMax"
            size="small"
            value={formik.values.temperatureMax}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.temperatureMax &&
              Boolean(formik.errors.temperatureMax)
            }
            helperText={
              formik.touched.temperatureMax && formik.errors.temperatureMax
            }
          />
        </Grid>
        {/* Temperature int max */}
        {isProduction && (
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Température extérieure minimale"
              name="temperatureMinExt"
              size="small"
              value={formik.values.temperatureMinExt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.temperatureMinExt &&
                Boolean(formik.errors.temperatureMinExt)
              }
              helperText={
                formik.touched.temperatureMinExt &&
                formik.errors.temperatureMinExt
              }
            />
          </Grid>
        )}
        {isProduction && (
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Température extérieure maximale"
              name="temperatureMaxExt"
              size="small"
              value={formik.values.temperatureMaxExt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.temperatureMaxExt &&
                Boolean(formik.errors.temperatureMaxExt)
              }
              helperText={
                formik.touched.temperatureMaxExt &&
                formik.errors.temperatureMaxExt
              }
            />
          </Grid>
        )}
        {/* light on */}
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            label="Allumage de lumiére"
            name="lightOn"
            size="small"
            type="time"
            value={formik.values.lightOn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.lightOn && Boolean(formik.errors.lightOn)}
            helperText={formik.touched.lightOn && formik.errors.lightOn}
          />
        </Grid>
        {/* light off */}
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            label="Extinction de lumière"
            name="lightOff"
            size="small"
            type="time"
            value={formik.values.lightOff}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.lightOff && Boolean(formik.errors.lightOff)}
            helperText={formik.touched.lightOff && formik.errors.lightOff}
          />
        </Grid>
        {/* light off */}
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            label="Durée de lumiére"
            name="lightDuration"
            size="small"
            type="time"
            value={formik.values.lightDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.lightDuration &&
              Boolean(formik.errors.lightDuration)
            }
            helperText={
              formik.touched.lightDuration && formik.errors.lightDuration
            }
          />
        </Grid>
        {/* flash on */}
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            label="Allumage de flash"
            name="flashOn"
            size="small"
            type="time"
            value={formik.values.flashOn}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.flashOn && Boolean(formik.errors.flashOn)}
            helperText={formik.touched.flashOn && formik.errors.flashOn}
          />
        </Grid>
        {/* flash off */}
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            label="Extinction de flash"
            name="flashOff"
            size="small"
            type="time"
            value={formik.values.flashOff}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.flashOff && Boolean(formik.errors.flashOff)}
            helperText={formik.touched.flashOff && formik.errors.flashOff}
          />
        </Grid>
        {/* flash duration */}
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            label="Durée de flash"
            name="flashDuration"
            size="small"
            type="time"
            value={formik.values.flashDuration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.flashDuration &&
              Boolean(formik.errors.flashDuration)
            }
            helperText={
              formik.touched.flashDuration && formik.errors.flashDuration
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Stack
            flexDirection={"row"}
            width={"100%"}
            alignItems={"center"}
            gap={4}
          >
            <Grid item md={3} xs={12}>
              <Switecher formik={formik} />
            </Grid>
            <Grid item md={9} xs={12}>
              {formik?.values?.intensIsLux == "true" ? (
                <RangSlider maxValue={44} step={1} type="lux" formik={formik} />
              ) : (
                <RangSlider maxValue={100} step={1} type="%" formik={formik} />
              )}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </Accordion>
  );
}

export default Ambiance;
