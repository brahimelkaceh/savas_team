import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Add, Close } from "@mui/icons-material";
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
import UseFetchData from "../../../../hooks/UseFetchData";
import { useFormik } from "formik";
import api from "../api";
let base_url = "https://farmdriver.savas.ma/api/";

export default function NewLot({ setRefetchData, lotId, isPrincipal }) {
  const [open, setOpen] = useState(false);
  const [siteId, setSiteId] = useState("");
  const [bats, setBats] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const apiUrl = useMemo(
    () => `${base_url}get-active-guides/?type=1`,
    [base_url]
  );
  const { data, loading: guideLoading } = UseFetchData(apiUrl);

  const SiteApiurl = useMemo(() => `${base_url}get-pouss-sites/`, [base_url]);
  const { data: siteData, loading: siteLoading } = UseFetchData(SiteApiurl);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSuccessModal(false);
    setError("");
    setLoading(false);
  };
  useEffect(() => {
    const fetchBatsData = async () => {
      try {
        if (!siteId) {
          return;
        }
        setLoading(true);
        const result = await api.getBatsData(siteId);
        const filteredData = result?.filter(
          (data) => data.type === "poussiniere" && data.isEmpty
        );
        setBats(filteredData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBatsData();
  }, [siteId]);

  const formik = useFormik({
    initialValues: {
      site: "",
      batiment: "",
      guide: "",
      code: "",
      effectifDP: 0,
      birthDate: "",
      hebdoFill: false,
      reformStarted: false,
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
        <Card>
          <CardHeader
            title="Déclarer nouveau lot"
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
                      {guideLoading ? "loading..." : "Sélectionner site"}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="site"
                      name="site"
                      disabled={siteLoading}
                      value={formik?.values.site || ""}
                      onChange={(e) => {
                        setSiteId(e.target.value);
                        formik?.handleChange(e);
                      }}
                      label=""
                    >
                      <MenuItem value="">
                        <em>--</em>
                      </MenuItem>

                      {siteData &&
                        siteData?.map((site) => (
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
                      {guideLoading ? "loading..." : "Sélectionner bâtiment"}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="batiment"
                      name="batiment"
                      disabled={siteLoading}
                      value={formik?.values.batiment || ""}
                      onChange={formik?.handleChange}
                      label=""
                    >
                      <MenuItem value="">
                        <em>--</em>
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
                    <InputLabel id="demo-simple-select-standard-label">
                      {guideLoading ? "loading..." : "Sélectionner guide"}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="guide"
                      name="guide"
                      value={formik?.values?.guide || ""}
                      onChange={formik.handleChange}
                      label=""
                    >
                      <MenuItem value="">
                        <em>--</em>
                      </MenuItem>
                      {data &&
                        data?.map((guide) => (
                          <MenuItem
                            key={guide?.id}
                            value={guide?.id}
                            className="input"
                          >
                            {guide?.name}
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
                    helperText="Date Mise en place"
                    type="date"
                    variant="standard"
                    value={formik.values.birthDate}
                    onChange={formik.handleChange}
                    size="small"
                  />
                </Grid>
              </Grid>

              <div className="bnts">
                <Stack flexDirection={"row"} my={2} gap={2}>
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
                      !formik.values.site ||
                      !formik.values.guide ||
                      !formik.values.batiment ||
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
        </Card>
      </Dialog>
    </Fragment>
  );
}
