import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Add, Close, Edit } from "@mui/icons-material";
import {
  Alert,
  Box,
  Card,
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
import { useFormik } from "formik";
import UseFetchData from "../../../hooks/UseFetchData";
import api from "../api/Index";
import toast, { Toaster } from "react-hot-toast";
let base_url = "https://farmdriver.savas.ma/api/";

export default function EditLot({ lot, setRefetchData, site }) {
  const [open, setOpen] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [lotId, setLotId] = useState("");
  const [siteId, setSiteId] = useState("");
  const [lotData, setLotData] = useState([]);
  const [activeGuide, setActiveGuide] = useState([]);
  const [sites, setSites] = useState([]);
  const [bats, setBats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorLot, setErrorLot] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
  useEffect(() => {
    const fetchBatsData = async () => {
      try {
        setLoading(true);
        const result = await api.getBatsData(siteId);
        const filteredData = result?.filter(
          (data) => data.type === "production" && !data.isEmpty
        );
        setBats(filteredData);
      } catch (error) {
        setErrorLot(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBatsData();
  }, [siteId]);

  const handleClickOpen = () => {
    setOpen(true);
    fetchLotData(lot.id);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSuccessModal(false);
    setError("");
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: {
      site: site,
      batiment: "",
      guideParent: "",
      code: "",
      effectifDP: 0,
      birthDate: "",
      transferDate: "",
      hebdoFill: false,
      reformStarted: false,
    },
    onSubmit: (values) => {
      formik.values.site = site;
      UpdateLot(values);
    },
  });

  const UpdateLot = async (data) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.UpdateLot(data);
      if (response === 200) {
        setLoading(false);
        setOpenSuccessModal(false);
        formik.handleReset();
        setRefetchData(new Date().getMilliseconds());
        handleClose();
        toast.success("La modification de ce lot a été effectuée avec succès.");
      } else {
        setLoading(false);
        toast.error(
          "Veuillez réessayer, une erreur est survenue lors de la modification ce lot."
        );
      }
    } catch (err) {
      toast.error(
        "Veuillez réessayer, une erreur est survenue lors de la modification ce lot."
      );
    } finally {
      setLoading(false);
      setTimeout(() => {
        setOpenSuccessModal(false);
      }, 3500);
    }
  };
  useEffect(() => {
    formik.initialValues;
    // ! Get batiment Id
    formik.setValues({
      ...formik.values,
      id: lot?.id,
      batiment: lot?.batId,
      site: lotData?.site_id,
      guideParent: lotData?.guide_id,
      code: lotData?.code,
      effectifDP: lotData?.effectifDP,
      birthDate: lotData?.birthDate,
      mep: lotData?.mep,
    });
  }, [lotData]);
  return (
    <Fragment>
      <Toaster gutter={8} position="bottom-right" reverseOrder={false} />

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
        maxWidth={"sm"}
      >
        <Card>
          <CardHeader
            title="Modifier"
            action={
              <IconButton aria-label="fermer" onClick={handleClose}>
                <Close />
              </IconButton>
            }
            className="title"
            sx={{
              color: "#2962ff",
              fontWeight: "bold",
              paddingBottom: 1,
            }}
          />
          <DialogContent>
            <form className="" onSubmit={(e) => e.preventDefault()}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {loading ? "loading..." : "Sélectionner site"}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="site"
                      name="site"
                      disabled={true}
                      value={formik?.values?.site || ""}
                      onChange={(e) => {
                        setSiteId(e.target.value);
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
                      {loading ? "loading..." : "Sélectionner Bâtiment"}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="batiment"
                      name="batiment"
                      disabled={true}
                      value={formik?.values?.batiment || ""}
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
                          <MenuItem
                            key={bat.id}
                            value={bat.id}
                            className="input"
                          >
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
                      disabled={loading}
                      value={formik?.values?.guideParent || ""}
                      onChange={formik?.handleChange}
                      label=""
                    >
                      {activeGuide &&
                        activeGuide?.map((guide) => (
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
                    id="birthDate"
                    name="birthDate"
                    label="Date Mise en place"
                    type="date"
                    variant="filled"
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    size="small"
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="mep"
                    name="mep"
                    // label="Date transfert"
                    type="date"
                    variant="standard"
                    value={formik.values.mep}
                    onChange={formik.handleChange}
                    size="small"
                    helperText="Date transfert"
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
        </Card>
      </Dialog>
    </Fragment>
  );
}
