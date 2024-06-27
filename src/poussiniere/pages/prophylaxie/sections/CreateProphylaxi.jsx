import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddProphylaxie from "./AddProphylaxie";
import { Box, Modal, Stack } from "@mui/material";
import { Add, Create } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  boxShadow: 24,
};

export default function CreateProphylaxi({ reftching, lotId, setData }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Stack alignItems="end">
        <Button
          color="success"
          variant="contained"
          size="small"
          startIcon={<Create />}
          onClick={handleClickOpen}
        >
          Saisir
        </Button>
      </Stack>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <Box sx={style}>
          <AddProphylaxie
            onClose={handleClose}
            reftching={reftching}
            lotId={lotId}
            setData={setData}
          />
        </Box>
      </Modal>
    </div>
  );
}
