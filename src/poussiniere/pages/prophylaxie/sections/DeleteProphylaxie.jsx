import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Alert, IconButton, Stack, SvgIcon } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import api from "../../../../api/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteProphylaxie({
  id,
  reftching,
  lotId,
  setData,
  setSuccessDeleteMessage,
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.deleteProhpylaxi(id);
      if (response.ok) {
        setLoading(false);
        setData([]);
        setSuccessDeleteMessage("Le programme a été supprimé avec succès.");
      } else {
        setError(
          "Veuillez réessayer, une erreur est survenue lors de la suppression de ce programme."
        );
      }
    } catch (err) {
      setError(
        "Veuillez réessayer, une erreur est survenue lors de la suppression de ce programme."
      );
      console.error("Error in Delete Lot:", err);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setOpen(false);
        setSuccessDeleteMessage(null);
      }, 3000);
      // await reftching(lotId);
    }
  };

  return (
    <React.Fragment>
      <IconButton size="small" color="error" onClick={handleClickOpen}>
        <SvgIcon>
          <Delete />
        </SvgIcon>
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color="error">
          {
            "La suppression de cet élément le supprimera définitivement du système. Voulez-vous vraiment continuer ?"
          }
        </DialogTitle>
        <Stack spacing={0} justifyContent="space-between">
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(id)}
            >
              {loading ? "suppression..." : "Supprimer"}
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Annuller
            </Button>
          </DialogActions>
          {error && (
            <Alert severity="error" onClose={() => setError(false)}>
              {error}
            </Alert>
          )}
        </Stack>
      </Dialog>
    </React.Fragment>
  );
}
