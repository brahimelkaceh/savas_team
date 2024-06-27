import React from "react";

const Production = ({ formik }) => {
  return (
    <div className="edit-inputs-container">
      <fieldset>
        <legend>Production</legend>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            placeholder="Normal"
            type="number"
            className={
              formik.values.prod_normal?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            value={formik.values.prod_normal}
            onChange={formik.handleChange}
            name="prod_normal"
          />

          <label htmlFor="input-field" className="input-label">
            Normal
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.prod_blanc?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Blanc"
            type="number"
            value={formik.values.prod_blanc}
            onChange={formik.handleChange}
            name="prod_blanc"
          />

          <label htmlFor="input-field" className="input-label">
            Blanc
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.prod_feles?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Feles"
            type="number"
            name="prod_feles"
            value={formik.values.prod_feles}
            onChange={formik.handleChange}
          />

          <label htmlFor="input-field" className="input-label">
            Feles
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.prod_dj?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Double jaune"
            name="prod_dj"
            value={formik.values.prod_dj}
            onChange={formik.handleChange}
            type="number"
          />

          <label htmlFor="input-field" className="input-label">
            Double jaune
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.prod_casse?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Cassé"
            type="number"
            name="prod_casse"
            value={formik.values.prod_casse}
            onChange={formik.handleChange}
            //   onChange={(e) => console.log(e.target.value)}
          />

          <label htmlFor="input-field" className="input-label">
            Cassé
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.prod_liquide?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Liquide (Kg)"
            type="number"
            name="prod_liquide"
            value={formik.values.prod_liquide}
            onChange={formik.handleChange}
            //   onChange={(e) => console.log(e.target.value)}
          />

          <label htmlFor="input-field" className="input-label">
            Liquide (Kg)
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <input
            className={
              formik.values.prod_elimne?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Eliminé"
            type="number"
            name="prod_elimne"
            value={formik.values.prod_elimne}
            onChange={formik.handleChange}
            //   onChange={(e) => console.log(e.target.value)}
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
              formik.values.pmo?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="PMO"
            type="number"
            name="pmo"
            value={formik.values.pmo}
            onChange={formik.handleChange}
          />

          <label htmlFor="input-field" className="input-label">
            PMO
          </label>
          <span className="input-highlight"></span>
        </div>
      </fieldset>
    </div>
  );
};

export default Production;
