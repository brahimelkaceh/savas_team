import React from "react";

const Viabilite = ({ formik }) => {
  return (
    <div className="edit-inputs-container">
      <fieldset>
        <legend>Viabilité</legend>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.mort?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Mortalité"
            name="mort"
            type="number"
            value={formik.values.mort}
            onChange={formik.handleChange}
          />

          <label htmlFor="input-field" className="input-label">
            Mortalité
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.hensEliminated?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="sujet elimines"
            name="hensEliminated"
            type="number"
            value={formik.values.hensEliminated}
            onChange={formik.handleChange}
          />

          <label htmlFor="input-field" className="input-label">
            Triage
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.poidVif?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Poids Corporel"
            type="number"
            name="poidVif"
            value={formik.values.poidVif}
            onChange={formik.handleChange}
          />

          <label htmlFor="input-field" className="input-label">
            Poids Corporel
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.homog?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Homogeneité"
            type="number"
            name="homog"
            value={formik.values.homog}
            onChange={formik.handleChange}
          />

          <label htmlFor="input-field" className="input-label">
            Homogeneité
          </label>
          <span className="input-highlight"></span>
        </div>
      </fieldset>
    </div>
  );
};

export default Viabilite;
