import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

function WeeklyTableHeader({ i, toggleVisibility }) {
  return (
    <tr className="third-header">
      <th>
        {/* <span
          className="show-action"
          onClick={() => {
            toggleVisibility(i);
          }}
        >
          <RemoveRedEyeIcon fontSize="small" />
          Afficher
        </span> */}
      </th>
      <th>Date</th>
      <th>Sem civil</th>
      <th colSpan="1">Age</th>
      {/* Ambiance */}
      <th>Lumiére</th>
      <th>Flash</th>
      <th>intensité</th>
      <th title="homogèniété">Homog (%)</th>
      <th title="Poids Vif">P.V (g)</th>
      {/* Viabilité */}
      <th>Viabilité(%)</th>
      <th>Mort/Sem</th>
      <th>∑ Mort/Sem</th>
      {/* Consommations */}
      <th>Eau dist</th>
      <th>Alt dist</th>
      <th>EPS</th>
      <th title="Aliment par sujet">APS(g)</th>
      <th>Ratio</th>
      <th>FEP</th>
      {/* Production */}
      <th>Ponte</th>
      <th>Ponte (%)</th>
      <th title="Poids moyen d'oeuf">PMO (g)</th>
      <th>NOPPD</th>
      <th>NOPPP</th>
      {/* Aliment / Oeuf */}
      <th>alt/oeuf</th>
      <th>∑ alt/oeuf</th>
      {/* Mass OEUF */}
      <th>Mass oeuf PP</th>
      <th>Mass oeuf PD</th>
      {/* Indice comvertion */}
      <th>Ic</th>
    </tr>
  );
}

export default WeeklyTableHeader;
