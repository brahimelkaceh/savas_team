import React from "react";
function DailyTableHeader({ isReform }) {
  return (
    <>
      <tr className="second-header  scale-in-ver-top ">
        {/* Actions */}
        <td className="border-right"></td>
        {/* Calendrie */}
        <td className="">Semaine Civile</td>
        <td className="">Date</td>
        <td className="border-right ">Age (sem) </td>
        {/* Ambiance */}
        <td title="durée en heure" className="borde">
          Lumiére
        </td>
        <td title="durée en heure">Flash</td>
        <td>intensité</td>
        <td
          className="border-right"
          title="Température intérieure minimale / maximale °C"
        >
          Temp °C
        </td>
        {/* Viabilité */}
        <td>Effectif présent</td>
        <td title="Homogénéité (%)">Homogénéité (%)</td>
        <td title="Poids corporel (g)">P.corporel (g)</td>

        <td>Viabilité(%)</td>
        <td title="Mortalité (%)">Mort (%)</td>
        <td title="Mortalité cumulée (%)" className="border-right">
          ∑ mort (%)
        </td>
        {/* Consommations */}
        <td title="Eau consommée (m³)">Eau (m³)</td>
        <td title="Aliment consommé (tonne) ">Aliment (t)</td>
        <td title="Eau par Sujet (ml)">EPS(ml)</td>
        <td title="Aliment par sujet (g)">APS(g)</td>
        <td title="Aliment par sujet cumulé(kg)">∑ APS(kg)</td>
        <td title="Ration Eau/Aliment">Ratio E/A</td>
        <td title="Réference aliment" className="border-right">
          Réf.Alt
        </td>
        {/* Production */}
        <td>Ponte</td>
        <td>Ponte (%)</td>
        <td title="Poid moyen d'œuf (g)">PMO (g)</td>

        <td title="Nombre d'œuf par poule présente">NOPPP</td>
        <td title="Nombre d'œuf par poule présente cumulée">∑ NOPPP</td>
        <td title="Nombre d'œuf par poule départ" className="border-right">
          NOPPD
        </td>
        <td title="Nombre d'œuf par poule départ cumulé">∑ NOPPD</td>
        <td title="Declassé" className="border-right">
          Déclasse
        </td>

        {/* Mass OEUF */}
        <td title="masse d'œuf par poule présente par semaine (g)">
          MOPPP/sem (g)
        </td>
        <td title="masse d'œuf par poule présente cumulé (kg)">∑ MOPPP (kg)</td>
        <td
          title="masse d'œuf par poule départ par semaine(g)"
          className="border-right"
        >
          MOPPD/sem (g)
        </td>
        <td
          title="masse d'œuf par poule départ cumulé(kg)"
          className="border-right"
        >
          ∑ MOPPD (kg)
        </td>
        {/* Aliment / Oeuf */}
        <td title="aliment par œuf (g)">APO (g)</td>
        <td title="aliment par œuf cumul (g)">∑ APO (g)</td>
        {/* Indice comvertion */}
        <td title="Cumul Aliment/cumul Mass d'œuf" className="border-right">
          IC
        </td>
        {isReform && (
          <td title="Effectif sortie normal" className="border-right">
            Effectif sortie
          </td>
        )}
      </tr>
    </>
  );
}

export default React.memo(DailyTableHeader);
