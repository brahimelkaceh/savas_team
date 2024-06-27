import * as React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { LoadingButton } from "@mui/lab";

export default function ConfirmationModal({
  setOpen,
  open,
  message,
  onSubmit,
  data,
  loading,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(false)}
          >
            Annuler
          </Button>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            onClick={() => {
              onSubmit(data);
            }}
            variant="outlined"
          >
            Accepter
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
