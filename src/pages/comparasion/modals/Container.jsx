import * as React from "react";
import Modal from "@mui/material/Modal";
import ProdContainer from "./ProdContainer";
import ConsommationContainer from "./ConsommationContainer";
import MortContainer from "./MortContainer";
import HomogPcContainer from "./HomogPcContainer";
import MasseContainer from "./MasseContainer";
import { Box, LinearProgress } from "@mui/material";

export default function Container({ setOpen, open, data, courbeId }) {
  const handleClose = () => {
    setOpen(false);
  };

  let section;
  switch (courbeId) {
    case 0:
      section = <ProdContainer data={data} onClose={handleClose} open={open} />;
      break;
    case 1:
      section = <MortContainer data={data} onClose={handleClose} open={open} />;
      break;
    case 2:
      section = (
        <ConsommationContainer data={data} onClose={handleClose} open={open} />
      );
      break;
    case 3:
      section = (
        <HomogPcContainer data={data} onClose={handleClose} open={open} />
      );
      break;
    case 4:
      section = (
        <MasseContainer data={data} onClose={handleClose} open={open} />
      );
    default:
      break;
  }

  return <>{section}</>;
}
