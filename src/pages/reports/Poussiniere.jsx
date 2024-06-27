import React from "react";
import PoussiniereForm from "./PoussiniereForm";

function Poussiniere({ data }) {
  const fullBatiment = data?.filter((obj) => !obj.isEmpty);
  console.log(fullBatiment);

  return (
    <>
      {fullBatiment.length >= 0 && (
        <div className="poussiniere">
          <h1>Poussiniere</h1>
          <PoussiniereForm />
        </div>
      )}
    </>
  );
}

export default Poussiniere;
