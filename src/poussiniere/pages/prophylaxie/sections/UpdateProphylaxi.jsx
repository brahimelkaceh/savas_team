import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
let base_url = "https://farmdriver.savas.ma/api/";

const UpdateProphylaxi = ({
  onClose,
  id,
  data,
  loading: loadingPrevData,
  reftching,
  lotId,
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const validationSchema = Yup.object({
    intervention: Yup.string().required("ce champ est obligatoire"),
    mode_administration: Yup.string().required("ce champ est obligatoire"),
    date: Yup.date().required("ce champ est obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      date: "",
      intervention: "",
      mode_administration: "",
      // controles: "",
      note: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      updateProphylaxi(values);
    },
  });
  const updateProphylaxi = async (data) => {
    // console.log(data);
    // return;
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      setLoading(true);
      const response = await fetch(`${base_url}update-prophylaxis-program/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        setLoading(false);
        setOpen(true);
        setMessage(false);
        reftching(lotId);
      } else {
        data = {};
        const errorMessage = "Site existe déjà";
        setError(true);
        setLoading(false);
        throw new Error(errorMessage);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
      setError(true);
    } finally {
      setTimeout(() => {
        setOpen(false);
        onClose();
      }, 3500);
    }
  };
  useEffect(() => {
    formik.initialValues;
    // ! Get batiment Id
    formik.setValues({
      ...formik.values,
      id: id,
      date: data?.date,
      intervention: data?.intervention,
      mode_administration: data?.mode_administration,
      // controles: data?.controles,
      doctor: data?.doctor,
      note: data?.note,
    });
  }, [data]);
  return (
    <div className="create-bats create-prophylaxi">
      <Stack
        justifyContent="space-between"
        flexDirection="row"
        alignItems="end"
        mb={1}
      >
        <p className="title">Prophylaxie </p>
        {loadingPrevData && <LinearProgress />}
        <IconButton onClick={onClose}>
          <SvgIcon>
            <Close />
          </SvgIcon>
        </IconButton>
      </Stack>
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
          <span>{formik.values.note ? "" : "Note"} </span>
        </label>
        <div className="btns">
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              setMessage(
                "Êtes-vous sûr de vouloir modifier ce prophylaxie ? Confirmez ou annulez."
              );
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
      {loading && <CircularProgress size={22} />}
      {error && (
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setError(false)}
        ></Alert>
      )}
      {open && (
        <Alert
          variant="filled"
          sx={{
            mt: 1,
            py: 1,
          }}
        >
          La prophylaxie a été mise à jour avec succès.
        </Alert>
      )}
      {message && (
        <Alert
          severity="info"
          variant="standard"
          sx={{
            mt: 1,
            py: 1,
          }}
          action={
            <>
              <Button
                color="success"
                size="small"
                variant="contained"
                sx={{
                  mx: 1,
                }}
                onClick={formik.handleSubmit}
              >
                Confirmer
              </Button>
              <Button
                color="error"
                size="small"
                variant="outlined"
                onClick={() => setMessage(false)}
              >
                Annuller
              </Button>
            </>
          }
        >
          {message}
        </Alert>
      )}
    </div>
  );
};

export default UpdateProphylaxi;
