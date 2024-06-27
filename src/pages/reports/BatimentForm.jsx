import Viabilite from "../../components/report-form/Viabilite";
import Production from "../../components/report-form/Production";
import Consommation from "../../components/report-form/Consommation";
import Ambiance from "../../components/report-form/Ambiance";
import Constats from "../../components/report-form/Constats";
import { AiOutlineSend } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import validationSchema from "./ValidationSchema";
import { useData } from "./context/DataProvider";
import ReportModal from "./Components/modals/ReportModal";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import { getRenderData, getBatimentName } from "../../slices/SiteData";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Alert, Button, Card, CircularProgress, Grid } from "@mui/material";
import Reforme from "../../components/report-form/Reforme";

let base_url = "https://farmdriver.savas.ma/api/";
const BatimentForm = ({ siteId, BatimentIdent, batimentId, isReform }) => {
  const checkObjectsByType = (objects, targetType) => {
    return objects?.filter((obj) => obj.type === targetType);
  };

  // Example usage
  const typeToCheck = "production";
  const objectsOfType = checkObjectsByType(BatimentIdent, typeToCheck);
  const dispatch = useDispatch();
  const { data } = useData();
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      batiment: "",
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
      prod_liquide: "",
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
      isKg: false,
      price: "",
      observation: "",
    },

    validationSchema: validationSchema, // pass the Yup schema here
    onSubmit: (values) => {
      CreateReports(values);
      // return;
    },
  });

  const CreateReports = async (data) => {
    try {
      setLoading(true);
      const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

      const response = await fetch(`${base_url}add-report-prod/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        console.log(response.status);
        dispatch(getRenderData(new Date().toISOString()));
        formik.handleReset();
        setLoading(false);
        setShowAlert(true);
      } else {
        setError(
          "Veuillez réessayer, une erreur est survenue lors de la création le rapport."
        );
      }
    } catch (error) {
      console.error(error);
      setError(
        "Veuillez réessayer, une erreur est survenue lors de la création le rapport."
      );
    } finally {
      setLoading(false);
      setTimeout(() => {
        setShowAlert(false);
        setError(false);
      }, 5500);
    }
  };

  useEffect(() => {
    formik.initialValues;
    // ! Get batiment Id
    formik.values.batiment = batimentId;
    formik.setValues({
      ...formik.values,
      batiment: batimentId,
      formule: data?.last_rep?.formule || "",
      lightOn: data?.last_rep?.lumiere_alum || "",
      lightOff: data?.last_rep?.lumiere_extin || "",
      lightDuration: data?.last_rep?.lumiere_durr || "",
      flashOn: data?.last_rep?.flash_alum || "",
      flashOff: data?.last_rep?.flash_extin || "",
      flashDuration: data?.last_rep?.flash_durr || "",
      qty_shell: data?.last_rep?.qty_coquille || "",
      coloration: data?.last_rep?.coloration || "",
      intensIsLux: data?.last_rep?.intensIsLux || false,
      intensite: data?.last_rep?.intensite || "",
      pmo: data?.last_rep?.pmo || "",
    });
    dispatch(getBatimentName(data?.last_rep?.batiment));
  }, [data]);
  useEffect(() => {
    formik.handleReset();
  }, [siteId]);
  return (
    <Card
      sx={{
        padding: 1,
        margin: 1,
      }}
    >
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
        <Grid container spacing={1}>
          <Grid item lg={6} xs={12}>
            <Viabilite formik={formik} />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Ambiance
              formik={formik}
              last_rep={data?.last_rep}
              isProduction={objectsOfType?.length > 0}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            {objectsOfType?.length > 0 && <Production formik={formik} />}
          </Grid>
          <Grid item lg={6} xs={12}>
            <Constats
              formik={formik}
              isProduction={objectsOfType?.length > 0}
              last_rep={data?.last_rep}
            />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Consommation formik={formik} />
          </Grid>
          <Grid item lg={6} xs={12}>
            {isReform && <Reforme formik={formik} />}
          </Grid>

          <Grid item lg={6} xs={12}>
            <Button
              color="success"
              variant="contained"
              type="submit"
              disabled={data?.lotId ? false : true}
              onClick={(e) => {
                setOpen(true);
              }}
            >
              {loading ? "Creation en cours..." : "Enregistrer"}
              {loading && (
                <CircularProgress
                  sx={{
                    color: "#fff",
                  }}
                  size={22}
                />
              )}
            </Button>
            {error && (
              <Alert
                sx={{
                  mt: 1,
                  p: 0,
                  px: 1,
                  width: "100%",
                }}
                severity="error"
                variant="filled"
              >
                {error}
              </Alert>
            )}
            {showAlert && (
              <Alert
                sx={{
                  mt: 1,
                  p: 0,
                  px: 1,
                  width: "100%",
                }}
                variant="filled"
                severity="success"
              >
                Les données ont été enregistrées avec succès !
              </Alert>
            )}
          </Grid>
        </Grid>
      </form>
    </Card>
  );
};

export default BatimentForm;
