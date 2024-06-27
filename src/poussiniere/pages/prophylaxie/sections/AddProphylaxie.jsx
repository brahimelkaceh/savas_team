import React, { useState } from "react";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import ConfirmModal from "../../../../pages/settings/modals/ConfirmModal";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import Loader from "../../../../components/loader/Loader";
let base_url = "https://farmdriver.savas.ma/api/";

const AddProphylaxie = ({ onClose, reftching, lotId, setData }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const validationSchema = Yup.object({
    intervention: Yup.string().required("ce champ est obligatoire"),
    mode_administration: Yup.string().required("ce champ est obligatoire"),
    date: Yup.date().required("ce champ est obligatoire"),
  });
  const formik = useFormik({
    initialValues: {
      date: "",
      intervention: "",
      mode_administration: "",
      // controles: "",
      note: "",
    },

    validationSchema: validationSchema, // pass the Yup schema here
    onSubmit: (values) => {
      const formData = { lot: lotId, ...values };
      createProphylaxi(formData);
    },
  });
  const createProphylaxi = async (data) => {
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      setLoading(true);
      const response = await fetch(`${base_url}add-prophylaxis-program/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        setLoading(false);
        console.log("Le site a été ajouté au système");
        setError(false);
        setOpen(false);
        setSuccess(true);
        formik.handleReset();
        setTimeout(() => {
          onClose();
        }, 3000);
        setData([]);
        // await reftching(lotId);
      } else {
        data = {};
        const errorMessage = "Something went wrong";
        setLoading(false);
        setError(
          "Veuillez réessayer, une erreur est survenue lors de la création ce programme."
        );
        throw new Error(errorMessage);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      setError(
        "Veuillez réessayer, une erreur est survenue lors de la création ce programme."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="create-bats create-prophylaxi">
      <form
        className={
          currentPath.includes("poussinier")
            ? "settings-form-pouss settings-form"
            : "settings-form"
        }
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p className="title">Prophylaxie </p>

        <label>
          <input
            required
            name="date"
            className="input"
            type="Date"
            placeholder=" "
            value={formik.values.date}
            onChange={formik.handleChange}
          />
          <span>Date*</span>
          {formik.touched.date && formik.errors.date && (
            <Typography
              className="error-message"
              variant="caption"
              display="block"
              gutterBottom
            >
              {formik.errors.date}
            </Typography>
          )}
        </label>
        <label>
          <input
            required
            name="intervention"
            value={formik.values.intervention}
            onChange={formik.handleChange}
            className="input"
            type="text"
            placeholder=" "
          />
          <span>Interventions*</span>
          {formik.touched.intervention && formik.errors.intervention && (
            <Typography
              className="error-message"
              variant="caption"
              display="block"
              gutterBottom
            >
              {formik.errors.intervention}
            </Typography>
          )}
        </label>
        <label>
          <select
            required
            id="mode_administration"
            name="mode_administration"
            value={formik.values.mode_administration}
            onChange={formik.handleChange}
            className="input"
          >
            <option value="">--</option>
            <option value="Nébulisation">Nébulisation</option>
            <option value="Injection">Injection</option>
            <option value="Eau de Boisson">Eau de Boisson</option>
            <option value="Goutte à l’oeil">Goutte à l’oeil</option>
          </select>
          <span> Mode d'administration*</span>
          {formik.touched.mode_administration &&
            formik.errors.mode_administration && (
              <Typography
                className="error-message"
                variant="caption"
                display="block"
                gutterBottom
              >
                {formik.errors.mode_administration}
              </Typography>
            )}
        </label>
        {/* <label>
          <input
            required
            name="controles"
            value={formik.values.controles}
            onChange={formik.handleChange}
            className="input"
            type="text"
            placeholder=" "
          />
          <span>Contrôle</span>
        </label> */}

        <label>
          <textarea
            required
            value={formik.values.note}
            onChange={formik.handleChange}
            name="note"
            className="input"
            type="text"
            placeholder=" "
            rows={4}
          />
          <span> {formik.values.note ? "" : "Note"} </span>
        </label>
        <div className="btns">
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Enregistrer
          </Button>
          <Button
            sx={{
              marginLeft: 2,
              paddingY: 0,
            }}
            size="small"
            color="error"
            variant="outlined"
            onClick={onClose}
          >
            Fermer
          </Button>
        </div>
      </form>
      {success && (
        <Alert
          variant="filled"
          sx={{
            mt: 1,
            py: 1,
          }}
        >
          La prophylaxie a été ajouter avec succès.
        </Alert>
      )}
      {error && (
        <Alert
          severity="error"
          variant="filled"
          sx={{
            mt: 1,
            py: 1,
          }}
          onClose={() => setError(false)}
        >
          {error}
        </Alert>
      )}
      {loading && <CircularProgress size={22} />}
      {open && (
        <Alert
          severity="info"
          sx={{
            mt: 1,
            py: 1,
          }}
          action={
            <Stack flexDirection="row" columnGap={1}>
              <Button
                color="success"
                variant="contained"
                onClick={formik.handleSubmit}
              >
                Confirmer
              </Button>
              <Button
                size="small"
                color="error"
                variant="outlined"
                onClick={() => {
                  setOpen(false);
                  setError(false);
                }}
              >
                Annuller
              </Button>
            </Stack>
          }
        >
          Êtes-vous sûr de vouloir envoyer ces données ?
        </Alert>
      )}
    </div>
  );
};

export default AddProphylaxie;
