import React from "react";

const Constats = ({ formik }) => {
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
  return (
    <div className="edit-inputs-container">
      <fieldset>
        <legend>Constats</legend>
        <div className="ic1"></div>
        <div className="input-container">
          <select
            id="qty_shell"
            name="qty_shell"
            className={
              formik.values.qty_shell?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Bâtiment"
            value={formik.values.qty_shell}
            onChange={formik.handleChange}
          >
            <option value="" disabled>
              --
            </option>
            {Object.keys(qltLabel).map((key, i) => {
              return (
                <option key={i} value={key} className="input">
                  {qltLabel[key]}
                </option>
              );
            })}
          </select>
          <label htmlFor="input-field" className="input-label">
            qty Shell
          </label>
          <span className="input-highlight"></span>
        </div>
        <div className="ic1"></div>
        <div className="input-container">
          <select
            id="coloration"
            name="coloration"
            style={{ width: "100%" }}
            className={
              formik.values.coloration?.length === 0
                ? "input-field"
                : "input-field-valid input-field"
            }
            placeholder="Bâtiment"
            value={formik.values.coloration}
            onChange={formik.handleChange}
          >
            <option value="" disabled>
              --
            </option>
            {Object.keys(colorationLabel).map((key, i) => {
              return (
                <option key={i} value={key} className="input">
                  {colorationLabel[key]}
                </option>
              );
            })}
          </select>
          <label htmlFor="input-field" className="input-label">
            Coloration
          </label>
          <span className="input-highlight"></span>
        </div>
      </fieldset>
    </div>
  );
};

export default Constats;
