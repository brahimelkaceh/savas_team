import * as React from "react";
import Production from "./modals/Production";
import "../../../style.css";
import Consommation from "./modals/Consommation";
import Mortalite from "./modals/Mortalite";
import HomogPc from "./modals/HomogPc";
import MasseOeuf from "./modals/MasseOeuf";
export default function ModalsContainer({ setOpen, open, data, courbeId }) {
  const handleClose = () => {
    setOpen(false);
  };

  let section;
  switch (courbeId) {
    case 0:
      section = <Production data={data} onClose={handleClose} open={open} />;
      break;
    case 1:
      section = <Mortalite data={data} onClose={handleClose} open={open} />;
      break;
    case 2:
      section = <Consommation data={data} onClose={handleClose} open={open} />;
      break;
    case 3:
      section = <HomogPc data={data} onClose={handleClose} open={open} />;
      break;
    case 4:
      section = <MasseOeuf data={data} onClose={handleClose} open={open} />;
    default:
      break;
  }

  return <>{section}</>;
}
