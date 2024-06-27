import React from "react";

const Consommation = ({ formik }) => {
  return (
    <div className="edit-inputs-container">
      <fieldset>
        <legend>Consommation</legend>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.alimentDist?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Aliment Distribué"
            type="number"
            name="alimentDist"
            value={formik.values.alimentDist}
            onChange={formik.handleChange}
          />

          <label htmlFor="input-field" className="input-label">
            Aliment Distribué
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.eauDist?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Eau Distribué"
            type="number"
            name="eauDist"
            value={formik.values.eauDist}
            onChange={formik.handleChange}
          />

          <label htmlFor="input-field" className="input-label">
            Eau Distribué
          </label>
          <span className="input-highlight"></span>
        </div>

        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.formule?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Formule en place"
            type="text"
            name="formule"
            value={formik.values.formule}
            onChange={formik.handleChange}
          />

          <label htmlFor="input-field" className="input-label">
            Réference aliment
          </label>
          <span className="input-highlight"></span>
        </div>
      </fieldset>
    </div>
  );
};

export default Consommation;
