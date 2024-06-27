import { AiOutlineSend } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Viabilite from "../../../components/report-pouss-form/Viabilite";
import Consommation from "../../../components/report-pouss-form/Consommation";
import Ambiance from "../../../components/report-pouss-form/Ambiance";
import ReportModal from "../modals/ReportModal";
import SuccessAlert from "../../../components/alerts/SuccessAlert";
import { getBatimentName, getRenderData } from "../../../slices/SiteData";
import * as Yup from "yup";

import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
} from "@mui/material";
import { useData } from "../../context/DataProvider";
import Constats from "../../../components/report-pouss-form/Constats";
import api from "../../../api/api";
import toast, { Toaster } from "react-hot-toast";
const BatimentForm = ({ siteId, batimentId, nextSend }) => {
  const dispatch = useDispatch();
  const { data } = useData();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
    humidity: Yup.number()
      .typeError("Humidité doit être un nombre.")
      .max(100, "Humidité doit être inférieure ou égale à 100.")
      .min(0, "Humidité doit être supérieure ou égale à 0."),
  });
  const formik = useFormik({
    initialValues: {
      batiment: batimentId,
      mort: "",
      hensEliminated: "",
      poidVif: "",
      homog: "",
      alimentDist: "",
      eauDist: "",
      formule: "",
      temperatureMin: "",
      temperatureMax: "",
      lightOn: "",
      lightOff: "",
      flashOn: "",
      flashOff: "",
      flashDuration: "",
      lightDuration: "",
      intensite: "",
      intensIsLux: "",
      observation: "",
      humidity: "",
    },
    validationSchema: validationSchema, // pass the Yup schema here
    onSubmit: (values) => {
      values.batiment = batimentId;
      CreateReports(formik.values);
    },
  });

  const CreateReports = async (data) => {
    try {
      setLoading(true);

      const response = await api.createPoussReport(data);
      if (response.response) {
        formik.handleReset();
        setLoading(false);
        dispatch(getRenderData(new Date().toISOString()));
        toast.success("Les données ont été enregistrées avec succès !");
      } else {
        toast.error(
          "Veuillez réessayer, une erreur est survenue lors de la création le rapport."
        );
        console.log("something went wrong");
      }
      // You can add additional logic here based on the response if needed
    } catch (error) {
      console.error(error);
      toast.error(
        "Veuillez réessayer, une erreur est survenue lors de la création le rapport."
      );
    } finally {
      setLoading(false);
      // Code that will run whether there was an error or not
    }
  };

  useEffect(() => {
    formik.initialValues;
    // ! Get batiment Id
    formik.setValues({
      ...formik.values,
      formule: data?.last_rep?.formule || "",
      lightOn: data?.last_rep?.lumiere_alum || "",
      lightOff: data?.last_rep?.lumiere_extin || "",
      lightDuration: data?.last_rep?.lumiere_durr || "",
      flashOn: data?.last_rep?.flash_alum || "",
      flashOff: data?.last_rep?.flash_extin || "",
      flashDuration: data?.last_rep?.flash_durr || "",
      intensIsLux: data?.last_rep?.intensIsLux || false,
      intensite: data?.last_rep?.intensite || "",
    });
    dispatch(getBatimentName(data?.last_rep?.batiment));
  }, [data]);
  useEffect(() => {
    formik.handleReset();
  }, [siteId]);
  return (
    <div className="batiment-form">
      <Toaster gutter={8} position="bottom-right" reverseOrder={false} />
      {open && (
        <ReportModal
          open={open}
          setOpen={setOpen}
          onSubmit={formik.handleSubmit}
          data={formik.values}
        />
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form-box"></div>
        <Grid container spacing={1}>
          <Grid item sm={12}>
            <Viabilite formik={formik} />
          </Grid>
          {!nextSend?.closeAlt && (
            <Grid item sm={12}>
              <Consommation formik={formik} />
            </Grid>
          )}
          <Grid item sm={12}>
            <Ambiance formik={formik} last_rep={data?.last_rep} />
          </Grid>
          <Grid item sm={12}>
            <Constats formik={formik} last_rep={data?.last_rep} />
          </Grid>
        </Grid>{" "}
        <Button
          sx={{
            mt: 1,
          }}
          type="submit"
          disabled={batimentId ? false : true}
          onClick={(e) => {
            setOpen(true);
          }}
          variant="contained"
          color="success"
        >
          {loading ? "En cours..." : "Enregistrer"}
        </Button>
      </form>
      {loading && <LinearProgress size={20} />}
    </div>
  );
};

export default BatimentForm;
