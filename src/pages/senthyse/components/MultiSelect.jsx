import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import LotContext from "../context/LotContext";
const animatedComponents = makeAnimated();

export default function MultiSelect({ lots, getAllSelectedLots }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleSelectChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };
  const getSelectedLots = (selectedLot) => {
    const selectedValuesArray = selectedLot.map((option) => option.value);
    console.log(selectedValuesArray);
    getAllSelectedLots(selectedValuesArray);
  };
  useEffect(() => {
    getSelectedLots(selectedOptions);
  }, [selectedOptions]);
  return (
    <Select
      className="select-lot-box"
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={lots}
      onChange={handleSelectChange}
      value={selectedOptions}
    />
  );
}
