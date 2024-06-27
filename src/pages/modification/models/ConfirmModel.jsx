import * as React from "react";

import { getRefreshData, getRenderData } from "../../../slices/SiteData";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ setOpen, open, message, onSubmit }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              onSubmit();
              setTimeout(() => {
                dispatch(getRefreshData(new Date().toString()));
              }, 500);
            }}
            autoFocus
            variant="contained"
          >
            Accepter
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
