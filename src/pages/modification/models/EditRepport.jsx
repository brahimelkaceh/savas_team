import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import ConfirmModel from "./ConfirmModel";
import * as Yup from "yup";

import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { AiOutlineSend } from "react-icons/ai";

import "./style.css";
// import Viabilite from "../components/Viabilite";
import Viabilite from "../../../components/report-form/Viabilite";
import Production from "../../../components/report-form/Production";
import Consommation from "../../../components/report-form/Consommation";
import Ambiance from "../../../components/report-form/Ambiance";
import Reforme from "../../../components/report-form/Reforme";
import EditConstats from "../../../components/report-form/Edit-Constats";
import { forwardRef } from "react";
import toast from "react-hot-toast";
let base_url = "https://farmdriver.savas.ma/api/";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function EditRepport({ openEditModal, setOpenEditModal }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const theme = useTheme();
  const id = useSelector((state) => state.editReport.id);

  // ! OBSERVATIONS HANDLING ///////////////////////////
  const handleClose = () => setOpenEditModal(false);
  // ! Validation Edit Form
  const validationSchema = Yup.object().shape({
    mort: Yup.number()
      .typeError("Le nombre de mortalités doit être une valeur positive.")
      .min(0, "Le nombre de mortalités doit être une valeur positive."),
    hensEliminated: Yup.number()
      .typeError("Le nombre des sujets éliminés doit être une valeur positive.")
      .min(0, "Le nombre des sujets éliminés doit être une valeur positive."),
    poidVif: Yup.number()
      .typeError("Le Poids corporel doit être une valeur positive.")
      .min(0, "Le Poids corporel doit être une valeur positive."),
    homog: Yup.number()
      .typeError("L'homogeneité doit être une valeur positive.")
      .min(0, "L'homogeneité doit être une valeur positive.")
      .max(100, "L'homogeneité  doit être inférieure ou égale à 100"),
    alimentDist: Yup.number()
      .typeError("Aliment consommé doit être une valeur positive.")
      .min(0, "Aliment consommé doit être une valeur positive."),
    eauDist: Yup.number()
      .typeError("Eau consommée doit être une valeur positive.")
      .min(0, "Eau consommée doit être une valeur positive."),
    prod_normal: Yup.number()
      .typeError("Œufs normaux doit être une valeur positive.")
      .min(0, "Œufs normaux doit être une valeur positive."),
    prod_dj: Yup.number()
      .typeError("Œufs double jaune doit être une valeur positive.")
      .min(0, "Œufs double jaune doit être une valeur positive."),
    prod_feles: Yup.number()
      .typeError("Sale doit être une valeur positive.")
      .min(0, "Sale doit être une valeur positive."),
    prod_casse: Yup.number()
      .typeError("Cassé doit être une valeur positive.")
      .min(0, "Cassé doit être une valeur positive."),
    prod_blanc: Yup.number()
      .typeError("Œufs blancs doit être une valeur positive.")
      .min(0, "Œufs blancs doit être une valeur positive."),
    prod_liquide: Yup.number()
      .typeError("Liquide doit être une valeur positive.")
      .min(0, "Liquide doit être une valeur positive."),
    prod_elimne: Yup.number()
      .typeError("Triage doit être une valeur positive.")
      .min(0, "Triage doit être une valeur positive."),
    pmo: Yup.number()
      .typeError("PMO doit être une valeur positive.")
      .min(0, "PMO doit être une valeur positive."),
    hensReformed: Yup.number()
      .typeError("Sujets normaux doit être une valeur positive.")
      .min(0, "Sujets normaux doit être une valeur positive."),
    hensReformedFree: Yup.number()
      .typeError("Sujets gratuits doit être une valeur positive.")
      .min(0, "Sujets gratuits doit être une valeur positive."),
    hensReformedTriage: Yup.number()
      .typeError("Sujets triage doit être une valeur positive.")
      .min(0, "Sujets triage doit être une valeur positive."),
    price: Yup.number()
      .typeError("Prix unitaire doit être une valeur positive.")
      .min(0, "Prix unitaire doit être une valeur positive."),
    temperatureMin: Yup.number()
      .typeError("Température intérieure minimale doit être un nombre.")
      .max(
        100,
        "La température intérieure minimale doit être inférieure ou égale à 100."
      )
      .min(
        -100,
        "La température intérieure minimale doit être supérieure ou égale à -100."
      ),
    temperatureMax: Yup.number()
      .typeError("Température intérieure maximale doit être un nombre.")
      .max(
        100,
        "La température intérieure maximale doit être inférieure ou égale à 100."
      )
      .min(
        -100,
        "La température intérieure maximale doit être supérieure ou égale à -100."
      ),
    temperatureMinExt: Yup.number()
      .typeError("Température extérieure minimale doit être un nombre.")
      .max(
        100,
        "La température extérieure minimale doit être inférieure ou égale à 100."
      )
      .min(
        -100,
        "La température extérieure minimale doit être supérieure ou égale à -100."
      ),
    temperatureMaxExt: Yup.number()
      .typeError("Température extérieure maximale doit être un nombre.")
      .max(
        100,
        "La température extérieure maximale doit être inférieure ou égale à 100."
      )
      .min(
        -100,
        "La température extérieure maximale doit être supérieure ou égale à -100."
      ),
  });
  const formik = useFormik({
    initialValues: {
      id: "",
      mort: "",
      hensEliminated: "",
      poidVif: "",
      homog: "",
      prod_normal: "",
      prod_dj: "",
      prod_blanc: "",
      prod_casse: "",
      prod_feles: "",
      prod_elimne: "",
      alimentDist: "",
      eauDist: "",
      pmo: "",
      formule: "",
      temperatureMin: "",
      temperatureMax: "",
      temperatureMinExt: "",
      temperatureMaxExt: "",
      lightOn: "",
      lightOff: "",
      flashOn: "",
      flashOff: "",
      flashDuration: "",
      lightDuration: "",
      intensite: "",
      intensIsLux: "",
      coloration: "",
      qty_shell: "",
      hensReformed: "",
      hensReformedFree: "",
      hensReformedTriage: "",
      isKg: "",
      price: "",
      observation: "",
    },
    validationSchema: validationSchema, // pass the Yup schema here
    onSubmit: (values) => {
      console.log("from on submit event");
      // console.log(JSON.stringify(values, null, 2));
      UpdateReports(values);
      formik.handleReset();
      // CreateReports(values);
    },
  });

  const apiUrl = useMemo(() => `${base_url}get-prefilled-data/?id=${id}`, []);

  const { data, loading, error } = UseFetchData(apiUrl);

  const UpdateReports = (data) => {
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    fetch(`${base_url}update-report-prod/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response)
      .then((data) => {
        if (data.status === 200) {
          setOpenEditModal(false);
          toast.success("Les données ont été enregistrées avec succès !");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Échec de modification le rapport.");
      });

    // .catch((error) => console.log("somthing xwrong"));
  };

  useEffect(() => {
    formik.initialValues;
    // ! Get batiment Id
    formik.setValues({
      ...formik.values,
      id: id,
      mort: data?.mort,
      hensEliminated: data?.sujet_elimines,
      poidVif: data?.poidVif,
      homog: data?.homog,
      prod_normal: data?.prod_normal,
      prod_dj: data?.prod_dj,
      prod_blanc: data?.prod_blanc,
      prod_casse: data?.prod_casse,
      prod_feles: data?.prod_feles,
      prod_elimne: data?.prod_elimne,
      prod_liquide: data?.prod_liquide,
      alimentDist: data?.alimentDist,
      eauDist: data?.eauDist,
      pmo: data?.pmo,
      formule: data?.formule,
      temperatureMin: data?.temperatureMin,
      temperatureMax: data?.temperatureMax,
      temperatureMinExt: data?.temperatureMinExt,
      temperatureMaxExt: data?.temperatureMaxExt,
      lightOn: data?.lightOn,
      lightOff: data?.lightOff,
      flashOn: data?.flashOn,
      flashOff: data?.flashOff,
      flashDuration: data?.flashDuration,
      lightDuration: data?.lightDuration,
      intensite: data?.intensite,
      intensIsLux: data?.intensIsLux,
      coloration: data?.coloration,
      qty_shell: data?.coquille,
      hensReformed: data?.hensReformed,
      hensReformedFree: data?.hensReformedFree,
      hensReformedTriage: data?.hensReformedTriage,
      isKg: data?.isKg,
      price: data?.price,
    });
  }, [data]);
  return (
    <Dialog
      fullScreen
      open={openEditModal}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        sx={{
          position: "relative",
          marginBottom: 1,
          bgcolor: theme.palette.warning.dark,
        }}
      >
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Modifier rapport
          </Typography>
          <Button
            autoFocus
            color="inherit"
            variant="outlined"
            onClick={handleClose}
          >
            Fermer
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent
        sx={{
          "& .Mui-expanded": {
            minHeight: 10,
          },
        }}
      >
        <Grid item xs={12}>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Grid container spacing={1} mb={1}>
              <Grid item xs={6} container spacing={1}>
                <Grid item xs={12} md={12}>
                  <Viabilite formik={formik} open={openEditModal} />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Production formik={formik} open={openEditModal} />{" "}
                </Grid>{" "}
                <Grid item xs={12} md={12}>
                  <Consommation formik={formik} open={openEditModal} />
                </Grid>
              </Grid>
              <Grid item xs={6} container spacing={1}>
                <Grid item xs={12}>
                  <Ambiance formik={formik} open={openEditModal} />
                </Grid>

                <Grid item xs={12}>
                  <EditConstats formik={formik} open={openEditModal} />
                </Grid>

                <Grid item xs={12}>
                  <Reforme formik={formik} open={openEditModal} />{" "}
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid
          item
          xs={12}
          container
          justifyContent={"start"}
          alignItems={"end"}
        >
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              setOpenConfirm(true);
            }}
          >
            Enregistrer
          </Button>
        </Grid>
      </DialogContent>
      {openConfirm && (
        <ConfirmModel
          open={openConfirm}
          setOpen={setOpenConfirm}
          onSubmit={formik.handleSubmit}
          message={"Êtes-vous sûr de vouloir envoyer ces données ?"}
        />
      )}
    </Dialog>
  );
}
