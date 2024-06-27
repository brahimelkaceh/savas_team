import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Observation from "./Observation";
import Container from "../../../components/selectedComponents/Container";
import { useState } from "react";
import SelectedComponents from "./SelectedComponents";
import { useMemo } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import SelectedDate from "../../../components/selectedComponents/SelectedDate";
import * as Yup from "yup";
import { useFormik } from "formik";
import api from "../../../api/api";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  Stack,
} from "@mui/material";
import { forwardRef } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  width: "60%",
  // height: "50%",
};
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function ObservationModal({ open, handleClose }) {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    date: Yup.date().required("La date est obligatoire."),
    lotId: Yup.number().required("Lot est obligatoire."),
  });
  const formik = useFormik({
    initialValues: {
      date: "",
      lotId: "",
      observs: [],
    },

    validationSchema: validationSchema, // pass the Yup schema here
    onSubmit: (values) => {
      createNewObservation(values);
      // return;
    },
  });
  const createNewObservation = async (data) => {
    try {
      setLoading(true);
      const result = await api.createObservation(data);
      if (!result) {
        setError("Échec de la création de l'observation. Veuillez réessayer.");
        setMessage("");
      } else {
        setMessage("L'observation a été créée avec succès!");
        setError("");
        formik.handleReset();
        setTimeout(() => {
          handleClose();
        }, 4500);
      }
    } catch (error) {
      setError("Échec de la création de l'observation. Veuillez réessayer.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 3500);
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth={true}
      maxWidth={"md"}
    >
      <Stack alignItems={"start"}>
        <DialogTitle
          sx={{
            color: "#1976d2",
          }}
        >
          {"Ajouter une observation"}
        </DialogTitle>
      </Stack>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={7}>
            <SelectedComponents formik={formik} />
          </Grid>
          <Grid item xs={4} marginLeft={0}>
            <SelectedDate formik={formik} />
          </Grid>
          <Grid item xs={12}>
            <Observation formik={formik} loading={loading} />
          </Grid>
        </Grid>
      </DialogContent>
      <Stack mx={2}>
        {error && (
          <Alert
            sx={{
              py: 0,
              mt: 1,
            }}
            variant="filled"
            severity="error"
          >
            {error}
          </Alert>
        )}
        {message && (
          <Alert
            sx={{
              py: 0,
              mt: 1,
            }}
            variant="filled"
            severity="success"
          >
            {message}
          </Alert>
        )}
      </Stack>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
