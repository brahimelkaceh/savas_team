import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Add, Close, Edit } from "@mui/icons-material";
import {
  Alert,
  Box,
  CardHeader,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  SvgIcon,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Fragment, useEffect, useMemo, useState } from "react";
import UseFetchData from "../../../../hooks/UseFetchData";
import { useFormik } from "formik";
import api from "../api";
let base_url = "https://farmdriver.savas.ma/api/";

export default function EditArrLot({ setRefetchData, lot }) {
  const [open, setOpen] = useState(false);
  const [bats, setBats] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [lotData, setLotData] = useState([]);
  const [activeGuid, setActiveGuide] = useState([]);
  const [sites, setSites] = useState([]);
  const [errorLot, setErrorLot] = useState("");

  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth, setMaxWidth] = useState("sm");
  useEffect(() => {
    const fetchActiveGuide = async () => {
      try {
        setLoading(true);
        const result = await api.getActiveGuides();
        setActiveGuide(result);
      } catch (error) {
        setErrorLot(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchSites = async () => {
      try {
        setLoading(true);
        const result = await api.getSites();
        setSites(result);
      } catch (error) {
        setErrorLot(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSites();
    fetchActiveGuide();
  }, []);
  const fetchLotData = async (id) => {
    try {
      setLoading(true);
      const result = await api.getLotPrefiled(id);
      console.log(result);
      setLotData(result);
    } catch (error) {
      setError("failed to fetch");
    } finally {
      setLoading(false);
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
    fetchLotData(lot?.linked_to.id);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSuccessModal(false);
    setError("");
    setLoading(false);
  };
  const formik = useFormik({
    initialValues: {
      batiment: lot.batiment_id,
      guideParent: lot.guide,
      code: "",
      effectifDP: 0,
      birthdate: "",
      isPrincipal: false,
    },
    onSubmit: (values) => {
      UpdateLot(values);
    },
  });
  const UpdateLot = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      setError("");

      const response = await api.UpdateLot(data);
      console.log("updated", response);
      if (response === 200) {
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
  useEffect(() => {
    formik.initialValues;
    // ! Get batiment Id
    formik.setValues({
      ...formik.values,
      id: lot?.id,
      site: lot?.site_id,
      batiment: lot?.batiment_id,
      guideParent: lotData?.guide_id,
      code: lotData?.code,
      effectifDP: lotData?.effectifDP,
      birthdate: lotData?.birthDate,
    });
  }, [lotData]);
  return (
    <Fragment>
      <IconButton color="warning" onClick={handleClickOpen}>
        <SvgIcon>
          <Edit />
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
          title="Modifier"
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
          <form onSubmit={(e) => e.preventDefault()}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {loading ? "loading..." : "Sélectionner site"}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="site"
                    name="site"
                    value={formik?.values?.site || ""}
                    onChange={(e) => {
                      fetchBatsData(e.target.value);
                      formik?.handleChange(e);
                    }}
                    label=""
                  >
                    <MenuItem value="">
                      <em>--</em>
                    </MenuItem>

                    {sites &&
                      sites?.map((site) => (
                        <MenuItem
                          key={site.id}
                          value={site.id}
                          className="input"
                        >
                          {site.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {loading ? "loading..." : "Sélectionner bâtiment"}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="batiment"
                    name="batiment"
                    value={formik?.values?.batiment ?? ""}
                    onChange={formik?.handleChange}
                    label=""
                  >
                    <MenuItem value="">
                      <em>--</em>
                    </MenuItem>
                    <MenuItem
                      sx={{
                        backgroundColor: "#ffe0b2",
                      }}
                      selected={true}
                      value={formik.values.batiment}
                    >
                      <em> {lot.batiment}</em>
                    </MenuItem>
                    {bats &&
                      bats?.map((bat) => (
                        <MenuItem key={bat.id} value={bat.id} className="input">
                          {bat.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {loading ? "loading..." : "Sélectionner guide"}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="guideParent"
                    name="guideParent"
                    value={formik?.values?.guideParent || ""}
                    onChange={formik?.handleChange}
                    label=""
                  >
                    <MenuItem value="">
                      <em>--</em>
                    </MenuItem>

                    {activeGuid &&
                      activeGuid?.map((guide) => (
                        <MenuItem
                          key={guide.id}
                          value={guide.id}
                          className="input"
                        >
                          {guide.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="code"
                  name="code"
                  label="Code lot"
                  type="text"
                  variant="standard"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="effectifDP"
                  name="effectifDP"
                  label="Effectif logée"
                  type="number"
                  variant="standard"
                  value={formik.values.effectifDP}
                  onChange={formik.handleChange}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="birthdate"
                  name="birthdate"
                  label="Date de naissance"
                  type="date"
                  variant="standard"
                  value={formik.values.birthdate}
                  onChange={formik.handleChange}
                  size="small"
                  disabled={!lotData?.modifiable}
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
                    !formik.values.birthdate ||
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
