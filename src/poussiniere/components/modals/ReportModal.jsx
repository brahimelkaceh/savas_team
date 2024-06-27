import * as React from "react";
import Box from "@mui/material/Box";
import { Button, DialogActions, Typography } from "@mui/material";
import { AiOutlineSend } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import ReportTable from "../tables/ReportTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "80%",
  boxShadow: 24,
  p: 3,
  textAlign: "left",
};

export default function ReportModal({
  setOpen,
  open,
  onSubmit,
  data,
  batimentName,
}) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=""
        onClose={handleClose}
      >
        <Box sx={style} className="confirm-modal ">
          {data && <ReportTable data={data} />}
          <Typography
            id="modal-modal-title"
            variant="p"
            component="h4"
            paddingTop={1.5}
          >
            Êtes-vous sûr de vouloir envoyer ces données ?
          </Typography>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Annuler
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleClose();
                onSubmit();
              }}
              autoFocus
              variant="contained"
            >
              Accepter
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}
