import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import LightModeIcon from "@mui/icons-material/LightMode";
import Box from "@mui/material/Box";
import { useState } from "react";
const Ambiance = ({ formik }) => {
  // ! Handle Light Inputs
  const [sliderValue, setSliderValue] = useState("");
  const handleLightInputChange = (e) => {
    formik.handleChange(e);
    // Check if either "lightOn" or "lightOff" has a value, then reset "lightDuration"
    if (e.target.name === "lightOn" || e.target.name === "lightOff") {
      if (formik.values.lightOn || formik.values.lightOff) {
        console.log(formik.values.lightOn, formik.values.lightOff);
        formik.setFieldValue("lightDuration", ""); // Reset "lightDuration"
      }
    }
    // Check if "lightDuration" has a value, then reset "lightOn" and "lightOff"
    else if (e.target.name === "lightDuration" && e.target.value) {
      formik.setFieldValue("lightOn", "");
      formik.setFieldValue("lightOff", "");
    }
  };
  // ! Handle flash Inputs
  const handleFlashInputChange = (e) => {
    formik.handleChange(e);
    // Check if either "flashOn" or "flashOff" has a value, then reset "flashDuration"
    if (e.target.name === "flashOn" || e.target.name === "flashOff") {
      if (formik.values.flashOn || formik.values.flashOff) {
        formik.setFieldValue("flashDuration", ""); // Reset "flashDuration"
      }
    }
    // Check if "flashDuration" has a value, then reset "flashOn" and "flashOff"
    else if (e.target.name === "flashDuration" && e.target.value) {
      formik.setFieldValue("flashOn", "");
      formik.setFieldValue("flashOff", "");
    }
  };

  const handleSliderChange = (event, newValue) => {
    formik.handleChange(event);
    if (newValue) {
      setSliderValue(newValue);
    }
  };
  return (
    <div className="edit-inputs-container">
      <fieldset>
        <legend>Ambiance</legend>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.temperatureMin?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Temperature int min"
            type="number"
            name="temperatureMin"
            value={formik.values.temperatureMin}
            onChange={formik.handleChange}
          />

          <label htmlFor="input-field" className="input-label">
            Temperature min int
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.temperatureMax?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Temperature int max"
            type="number"
            name="temperatureMax"
            value={formik.values.temperatureMax}
            onChange={formik.handleChange}
          />

          <label htmlFor="input-field" className="input-label">
            Temperature max int
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.temperatureMinExt?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Temperature ext min"
            type="number"
            name="temperatureMinExt"
            value={formik.values.temperatureMinExt}
            onChange={formik.handleChange}
          />

          <label htmlFor="input-field" className="input-label">
            Temperature min ext
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.temperatureMaxExt?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Temperature ext max"
            type="number"
            name="temperatureMaxExt"
            value={formik.values.temperatureMaxExt}
            onChange={formik.handleChange}
          />

          <label htmlFor="input-field" className="input-label">
            Temperature max ext
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="light-container">
          <div className="input-container">
            <input
              className={
                formik.values.lightOn?.length === 0
                  ? "input-field"
                  : "input-field-valid input-field"
              }
              placeholder="light on"
              type="time"
              name="lightOn"
              value={formik.values.lightOn}
              onChange={handleLightInputChange}
            />

            <label htmlFor="input-field" className="input-label">
              lumière allumée
            </label>
            <span className="input-highlight"></span>
          </div>
          <div className="input-container">
            <input
              className={
                formik.values.lightOff?.length === 0
                  ? "input-field"
                  : "input-field-valid input-field"
              }
              placeholder="light off"
              type="time"
              name="lightOff"
              value={formik.values.lightOff}
              onChange={handleLightInputChange}
            />

            <label htmlFor="input-field" className="input-label">
              lumière éteinte
            </label>
            <span className="input-highlight"></span>
          </div>
          <div className="input-container">
            <input
              className={
                formik.values.lightDuration?.length === 0
                  ? "input-field"
                  : "input-field-valid input-field"
              }
              placeholder="light duration"
              type="time"
              name="lightDuration"
              value={formik.values.lightDuration}
              onChange={handleLightInputChange}
            />

            <label htmlFor="input-field" className="input-label">
              durée d'éclairage
            </label>
            <span className="input-highlight"></span>
          </div>
        </div>
        <div className="light-container">
          <div className="ic1"></div>
          <div className="input-container">
            <input
              className={
                formik.values.flashOn?.length === 0
                  ? "input-field"
                  : "input-field-valid input-field"
              }
              placeholder="flash on"
              type="time"
              name="flashOn"
              value={formik.values.flashOn}
              onChange={handleFlashInputChange}
            />

            <label htmlFor="input-field" className="input-label">
              Flash allumée
            </label>
            <span className="input-highlight"></span>
          </div>
          <div className="ic1"></div>
          <div className="input-container">
            <input
              className={
                formik.values.flashOff?.length === 0
                  ? "input-field"
                  : "input-field-valid input-field"
              }
              placeholder="flash off"
              type="time"
              name="flashOff"
              value={formik.values.flashOff}
              onChange={handleFlashInputChange}
            />

            <label htmlFor="input-field" className="input-label">
              Flash éteinte
            </label>
            <span className="input-highlight"></span>
          </div>
          <div className="ic1"></div>
          <div className="input-container">
            <input
              className={
                formik.values.flashDuration?.length === 0
                  ? "input-field"
                  : "input-field-valid input-field"
              }
              placeholder="flash duration"
              type="time"
              name="flashDuration"
              value={formik.values.flashDuration}
              onChange={handleFlashInputChange}
            />

            <label htmlFor="input-field" className="input-label">
              Durée du flash
            </label>
            <span className="input-highlight"></span>
          </div>
        </div>

        <div className="ic1"></div>
        <div className="inputs-container">
          <label className="cyberpunk-checkbox-label">
            <input
              type="checkbox"
              className="switch"
              name="intensIsLux"
              checked={formik.values.intensIsLux}
              onChange={(e) => {
                formik.handleChange(e);
              }}
            />
            {formik.values.intensIsLux ? "lux" : "%"}
          </label>
          <Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Typography id="input-slider" gutterBottom>
                  Intensité
                </Typography>
              </Grid>
              <Grid item>
                <LightModeIcon style={{ color: "#002661 " }} />
              </Grid>
              <Grid item xs>
                <Slider
                  value={
                    formik.values.intensite
                      ? formik.values.intensite
                      : sliderValue
                  }
                  onChange={handleSliderChange}
                  name="intensite"
                  id="intensite"
                  max={formik.values.intensIsLux ? 44 : 100}
                  min={0}
                  step={formik.values.intensIsLux ? 1 : 5}
                  type={formik.values.intensIsLux ? "lux" : "%"}
                  size="medium"
                  valueLabelDisplay="on"
                  disableSwap
                  aria-label="Temperature"
                  style={{ color: "#FFDB01 " }}
                />
              </Grid>
            </Grid>
          </Box>
        </div>
      </fieldset>
    </div>
  );
};

export default Ambiance;
