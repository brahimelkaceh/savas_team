import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Add, Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Fragment, useMemo, useState } from "react";
import { useFormik } from "formik";
import api from "../api";
let base_url = "https://farmdriver.savas.ma/api/";

export default function NewArrLot({ setRefetchData, lotId, guide, batiment }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSuccessModal(false);
    setError("");
    setLoading(false);
  };
  const formik = useFormik({
    initialValues: {
      batiment: batiment,
      linkedTo: lotId,
      guide: guide,
      code: "",
      effectifDP: 0,
      birthDate: "",
      isPrincipal: false,
    },
    onSubmit: (values) => {
      CreateLot(values);
    },
  });
  const CreateLot = async (data) => {
    try {
      setLoading(true);
      setError("");

      const response = api.createLot(data);

      if (response) {
        setLoading(false);
        setOpenSuccessModal(false);
        setError("");
        formik.handleReset();
        setRefetchData(new Date().getMilliseconds());
        handleClose();
      } else {
        setLoading(false);
        setError(
          "Veuillez réessayer, une erreur est survenue lors de la création ce lot."
        );
      }
    } catch (err) {
      console.log(err);
      setError(
        "Veuillez réessayer, une erreur est survenue lors de la création ce lot."
      );
    } finally {
      setLoading(false);
      setTimeout(() => {
        setOpenSuccessModal(false);
        setError("");
      }, 3500);
    }
  };
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth, setMaxWidth] = useState("sm");

  return (
    <Fragment>
      <IconButton
        sx={{
          backgroundColor: "#c8e6c9",
        }}
        color="success"
        onClick={handleClickOpen}
      >
        <SvgIcon>
          <Add />
        </SvgIcon>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={fullScreen}
        fullWidth={true}
        maxWidth={maxWidth}
      >
        <CardHeader
          title="Déclarer nouveau arrivage"
          action={
            <IconButton aria-label="fermer" onClick={handleClose}>
              <Close />
            </IconButton>
          }
          className="title"
          sx={{
            color: "#ff6c22",
            fontWeight: "bold",
            paddingBottom: 1,
          }}
        />
        <DialogContent>
          <form
            className="lot-form settings-form-pouss"
            onSubmit={(e) => e.preventDefault()}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="code"
                  name="code"
                  type="text"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  variant="standard"
                  size="small"
                  label="Code lot"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="effectifDP"
                  name="effectifDP"
                  type="number"
                  value={formik.values.effectifDP}
                  onChange={formik.handleChange}
                  variant="standard"
                  size="small"
                  label="Effectif logée"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formik.values.birthDate}
                  onChange={formik.handleChange}
                  variant="standard"
                  size="small"
                  helperText="Date Mise en place"
                />
              </Grid>
            </Grid>

            <div className="bnts">
              <Stack flexDirection={"row"} gap={2} my={2}>
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  onClick={() => {
                    setOpenSuccessModal(true);
                    setMessage(
                      "Êtes-vous sûr de vouloir créer ce lot ? Confirmez ou annulez."
                    );
                  }}
                  disabled={
                    !formik.values.birthDate ||
                    !formik.values.code ||
                    !formik.values.effectifDP
                  }
                >
                  Enregistrer{" "}
                  {loading && <CircularProgress color="inherit" size={22} />}
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  onClick={handleClose}
                  autoFocus
                >
                  Fermer
                </Button>
              </Stack>
              {openSuccessModal && (
                <Alert
                  sx={{
                    p: 0,
                    px: 2,
                    py: 0.5,
                    my: 1,
                  }}
                  severity="success"
                  variant="outlined"
                  action={
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <Button
                        onClick={formik.handleSubmit}
                        color="success"
                        variant="contained"
                        size="medium"
                      >
                        {loading ? "Confirmation en cours..." : "Confirmer"}
                      </Button>{" "}
                      <Button
                        onClick={handleClose}
                        color="error"
                        variant="outlined"
                        size="small"
                      >
                        Annuller
                      </Button>
                    </Box>
                  }
                >
                  {message}
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
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
