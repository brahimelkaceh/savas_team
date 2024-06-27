import { useState } from "react";
import Form from "../components/Form";
import { useSelector } from "react-redux";
import Modal from "./modals/Modal";
import { useEffect } from "react";
const Batiment = ({ batiment, prodcutionData, CreateReports, nextDate }) => {
  console.log();
  const [toggle, setToggle] = useState(false);
  const [fromContainer, setFormContainer] = useState(false);
  const [lotCode, setLotCode] = useState(prodcutionData.lot[0]?.code);

  const toggleClick = () => {
    setToggle(!toggle);
    setFormContainer(!fromContainer);
  };

  return (
    <div>
      <div
        className={`${
          !fromContainer
            ? `${prodcutionData.typeOf}-btn`
            : "second-batiment-btn"
        }`}
        onClick={toggleClick}
      >
        {prodcutionData.name}
        {lotCode && (
          <span className="lot-code" style={{ textDecoration: "underline  " }}>
            {lotCode}
          </span>
        )}
      </div>
      <div className={`${fromContainer ? "form-container" : " "}`}>
        {toggle && (
          <Form
            CreateReports={CreateReports}
            batiment={batiment}
            fromContainer={fromContainer}
            prodcutionData={prodcutionData}
            nextDate={nextDate}
          />
        )}
      </div>
    </div>
  );
};

export default Batiment;
