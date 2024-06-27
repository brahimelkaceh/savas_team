import "./staticSide.css";
export const StaticSide = () => {
  return (
    <div className="table__container-static">
      <div className="table__header">
        <p>Batiment</p>
      </div>
      <div className="table__body">
        <p>Age (SEM)</p>
        <p>Souche</p>
        <p>Effectif Présent</p>
        <p>Performances</p>
        <p>Mortalité % Sem</p>
        <p>Mortalité Cumulée (%)</p>
        <p>Ponte (%)</p>
        <p>Aliment (g)/j/Sujet</p>
        <p>Nbre Oeufs Cuml (PD)</p>
        <p>Poids Vif (g)</p>
        <p>Homogénéité (%)</p>
        <p>Poids Oeufs (g)</p>
        <p>Aliment Cumule (kg)</p>
        <p>Aliment/Oeufs Cum (g/PD)</p>
        <p>Mass d’Oeufs Cumlée (kg)</p>
        <p>Mass d’Oeufs cuml/Sem (g)</p>
        <p>Indice de Conversion</p>
        <p>Eau (ml/sujet) | Ratio(Eau/Alt)</p>
        <p>Lumiére / Flash</p>
      </div>
      <div className="table__footer">
        <p>Formule en Place</p>
        <p className="qlt">Qualité de Coquille</p>
        <p className="coloration">Coloration oeuf</p>
        <p className="observation">Observation</p>
      </div>
    </div>
  );
};
