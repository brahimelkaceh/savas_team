import React from "react";
import Form from "./Form";

function Production({ data }) {
  // Use the filter() method to create a new array containing only objects with isEmpty: true
  const fullBatiment = data?.filter((obj) => !obj.isEmpty);

  return (
    <div className="production">
      <Form productionData={fullBatiment} />
    </div>
  );
}

export default Production;
