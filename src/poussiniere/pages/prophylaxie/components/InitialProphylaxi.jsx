import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Add } from "@mui/icons-material";
import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Formik, useFormik } from "formik";
import { useEffect } from "react";
let base_url = "https://farmdriver.savas.ma/api/";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InitialProphylaxi({ id, setRefresh }) {
  const [open, setOpen] = useState(false);
  const [lotId, setLotId] = useState(id);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      lot: lotId,
      name: "",
      doctor: "",
      date: "",
    },
    onSubmit: (values) => {
      submitForm(values);
    },
  });
  const submitForm = async (data) => {
    try {
      setLoading(true);
      setError("");
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(`${base_url}add-prophylaxis-parent/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        setLoading(false);
        setSuccess(true);
        setError("");
        formik.handleReset();
        setRefresh(new Date().getMilliseconds());
      } else {
        setLoading(false);
        setError(
          "Veuillez réessayer, une erreur est survenue lors de la création ce Programme."
        );
      }
      if (response.error) {
        throw new Error(
          "Veuillez réessayer, une erreur est survenue lors de la création ce Programme."
        );
      }
    } catch (err) {
      setError(
        "Veuillez réessayer, une erreur est survenue lors de la création ce Programme."
      );
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccess(false);
        setError("");
      }, 3500);
      setTimeout(() => {
        setOpen(false);
      }, 4000);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    formik?.handleReset();
  };
  useEffect(() => {
    setLotId(id);
  }, [id]);

  return (
    <>
      <Button
        color="success"
        variant="contained"
        size="small"
        startIcon={<Add />}
        onClick={handleClickOpen}
      >
        Déclarer
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle color="primary">
          {"Déclarer un Nouveau programme de prophylaxie"}
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Grid container>
              <Stack mt={1} spacing={2} width="100%">
                <TextField
                  size="small"
                  label="Nom"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <TextField
                  size="small"
                  label="Docteur"
                  name="doctor"
                  value={formik.values.doctor}
                  onChange={formik.handleChange}
                />
                <TextField
                  size="small"
                  type="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                />
              </Stack>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color="success"
            variant="contained"
            disabled={!lotId ? true : false}
            onClick={formik.handleSubmit}
          >
            Enregistrer
          </Button>
          <Button color="error" variant="outlined" onClick={handleClose}>
            Fermer
          </Button>
        </DialogActions>
        <Stack mx={1}>
          {loading && <CircularProgress size={18} />}
          {success && (
            <Alert
              severity="success"
              variant="filled"
              sx={{
                p: 0,
                px: 2,
                py: 0.5,
                my: 1,
              }}
            >
              Les données ont été enregistrées avec succès !
            </Alert>
          )}
          {error && (
            <Alert
              severity="error"
              variant="filled"
              onClose={() => setError("")}
              sx={{
                p: 0,
                px: 2,
                py: 0.5,
                my: 1,
              }}
            >
              {error}
            </Alert>
          )}
        </Stack>
      </Dialog>
    </>
  );
}
