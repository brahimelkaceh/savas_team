import { Add } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  SvgIcon,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ConfirmModal from "../../../pages/settings/modals/ConfirmModal";
import * as Yup from "yup";
import api from "../../../api/api";

const NewProphylaxis = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [financialBackersInput, setFinancialBackersInput] = useState("");
  const [financialBackersList, setFinancialBackersList] = useState([]);
  const handleAddFinancialBacker = () => {
    if (financialBackersInput.trim() !== "") {
      setFinancialBackersList([
        ...financialBackersList,
        financialBackersInput.trim(),
      ]);
      setFinancialBackersInput("");
    }
  };
  const handleFinancialBackersInputChange = (event) => {
    setFinancialBackersInput(event.target.value);
  };
  const handleDeleteFinancialBacker = (index) => {
    const updatedList = [...financialBackersList];
    updatedList.splice(index, 1);
    setFinancialBackersList(updatedList);
  };
  const validationSchema = Yup.object().shape({
    date: Yup.date().typeError("La date est requis."),
    nbr_flacons: Yup.number()
      .typeError("Le nombre flacons doit être un nombre.")
      .min(0, "Le nombre flacons doit être un nombre."),
    eff_vaccine: Yup.number()
      .required("L'effectif vacciné est requis.")
      .typeError("L'effectif vacciné doit être un nombre positive.")
      .min(0, "L'effectif vacciné doit être un nombre positive."),
    dose: Yup.number()
      .required("La dose est requis.")
      .typeError("La dose doit être un nombre positive.")
      .min(0, "La dose doit être un nombre positive."),
    moy_flacon: Yup.number()
      .typeError("Le moyen / flacon doit être un nombre.")
      .min(0, "Le moyen / flacon est requis"),
  });
  const formik = useFormik({
    initialValues: {
      prophylaxis: data?.id,
      date: Date.now(),
      nbr_flacons: "",
      eff_vaccine: "",
      dose: "",
      moy_flacon: "",
      equipe_names: [],
    },
    validationSchema: validationSchema, // pass the Yup schema here
    onSubmit: (values) => {
      values.equipe_names = financialBackersList;
      CreateProphylaxi(values);
    },
  });
  const CreateProphylaxi = async (data) => {
    setLoading(true);
    try {
      const response = await api.createProphylaxi(data);
      // Check if the request was successful (status code 2xx)
      if (response) {
        setError(false);
        console.log("Prophylaxi created successfully");
        setMessage("Prophylaxi a été créé avec succès.");
        formik.handleReset();
        setFinancialBackersList([]);
        setLoading(false);
      } else {
        // Handle non-successful responses (status code other than 2xx)
        console.error(
          `Failed to create prophylaxi. Status: ${response.status}`
        );
        setLoading(false);
        setError(true);
      }
    } catch (error) {
      // Handle any other errors that may occur during the request
      console.error("An error occurred:", error);
      setError(true);

      setLoading(false);
    } finally {
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <>
      {open && (
        <ConfirmModal
          open={open}
          setOpen={setOpen}
          onSubmit={formik.handleSubmit}
          message={"Êtes-vous sûr de vouloir envoyer ces données ?"}
        />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            {/* Date */}
            <TextField
              fullWidth
              label="Date"
              name="date"
              size="small"
              type="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Date */}
            <TextField
              fullWidth
              label="Dose"
              name="dose"
              size="small"
              type="text"
              value={formik.values.dose}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.dose && Boolean(formik.errors.dose)}
              helperText={formik.touched.dose && formik.errors.dose}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Date */}
            <TextField
              fullWidth
              label="Moyen / flacon"
              name="moy_flacon"
              size="small"
              type="text"
              value={formik.values.moy_flacon}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.moy_flacon && Boolean(formik.errors.moy_flacon)
              }
              helperText={formik.touched.moy_flacon && formik.errors.moy_flacon}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Date */}
            <TextField
              fullWidth
              label="Effectif vacciné"
              name="eff_vaccine"
              size="small"
              type="text"
              value={formik.values.eff_vaccine}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.eff_vaccine && Boolean(formik.errors.eff_vaccine)
              }
              helperText={
                formik.touched.eff_vaccine && formik.errors.eff_vaccine
              }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Date */}
            <TextField
              fullWidth
              label="Nombre flacons"
              name="nbr_flacons"
              size="small"
              type="text"
              value={formik.values.nbr_flacons}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.nbr_flacons && Boolean(formik.errors.nbr_flacons)
              }
              helperText={
                formik.touched.nbr_flacons && formik.errors.nbr_flacons
              }
            />
          </Grid>

          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Équipe vaccination"
              name="equipe_names"
              size="small"
              value={financialBackersInput}
              onChange={handleFinancialBackersInputChange}
              placeholder=" "
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton
              onClick={handleAddFinancialBacker}
              color="success"
              sx={{
                backgroundColor: "#E1F0DA",
              }}
            >
              <SvgIcon>
                <Add />
              </SvgIcon>
            </IconButton>
          </Grid>
        </Grid>

        <Box className="flex">
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            gap={1}
            sx={{
              flexGrow: 1,
              pt: financialBackersList?.length > 0 ? 1 : 0,
            }}
          >
            {financialBackersList.map((backer, index) => (
              <Chip
                key={index}
                label={backer}
                onDelete={() => handleDeleteFinancialBacker(index)}
                variant="filled"
                color="info"
              />
            ))}
          </Stack>
        </Box>

        <div
          className="btns"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              color="success"
              variant="contained"
              type="submit"
              onClick={() => {
                setOpen(true);
              }}
            >
              Envoyer
            </Button>
            {loading && (
              <Box sx={{ display: "flex" }}>
                <CircularProgress size={20} />
              </Box>
            )}
          </div>
          {error && (
            <Alert
              variant="filled"
              sx={{
                padding: "0px 10px",
              }}
              severity="error"
            >
              Une erreur s'est produite. Veuillez réessayer ultérieurement.
            </Alert>
          )}
          {message && (
            <Alert
              variant="filled"
              sx={{
                padding: "0px 10px",
              }}
              color="success"
            >
              {message}
            </Alert>
          )}
        </div>
      </form>
    </>
  );
};

export default NewProphylaxis;
