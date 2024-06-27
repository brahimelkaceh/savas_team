import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  DialogContent,
  IconButton,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { Add, Close, Delete, Edit } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { useEffect } from "react";
let base_url = "https://farmdriver.savas.ma/api/";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProphExcution({ proph }) {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const currentPath = location.pathname;
  const [teamMemberInput, setTeamMemberInput] = useState("");
  const [teamMembersList, setTeamMembersList] = useState([]);
  const handleAddTeamMember = () => {
    if (teamMemberInput.trim() !== "") {
      setTeamMembersList([...teamMembersList, teamMemberInput.trim()]);
      setTeamMemberInput("");
    }
  };
  const handleTeamMemberInputChange = (event) => {
    setTeamMemberInput(event.target.value);
  };
  const handleDeleteTeamMember = (index) => {
    const updatedList = [...teamMembersList];
    updatedList.splice(index, 1);
    setTeamMembersList(updatedList);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      id: proph.id,
      date: "",
      nbr_flacons: "",
      eff_vaccine: "",
      dose: "",
      moy_flacon: "",
      equipe_names: [],
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      values.equipe_names = teamMembersList.join("|");
      console.log(values);
      updateProphylaxi(values);
    },
  });
  const updateProphylaxi = async (data) => {
    // console.log(date);
    // return;
    const accessToken = JSON.parse(localStorage.getItem("authTokens")).access;

    try {
      setLoading(true);
      const response = await fetch(
        `${base_url}update-execution-proph-program/`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        setLoading(false);
        console.log("Le site a été ajouté au système");
        setError(false);
        setOpenConfirmation(false);
        setSuccess(true);
        formik.handleReset();
        setTimeout(() => {
          handleClose();
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
  useEffect(() => {
    formik.initialValues;
    // ! Get batiment Id
    formik.setValues({
      ...formik.values,
      date: proph?.date,
      nbr_flacons: proph?.proph_nbr_flacons,
      eff_vaccine: proph?.proph_eff_vaccine,
      dose: proph?.proph_dose,
      moy_flacon: proph?.proph_moy_flacon,
    });
    setTeamMembersList(proph?.proph_equipe.split("|"));
  }, [proph]);
  return (
    <>
      <IconButton size="small" color="warning" onClick={handleClickOpen}>
        <SvgIcon>
          <Edit />
        </SvgIcon>
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent={"space-between"}
          // width="100%"
          m={1}
          mt={0}
        >
          <DialogTitle
            color="error"
            variant="h6"
            sx={{
              paddingBottom: 0,
            }}
          >
            {"Modifier"}
          </DialogTitle>
          <IconButton size="small" color="error" onClick={handleClose}>
            <SvgIcon>
              <Close />
            </SvgIcon>
          </IconButton>
        </Stack>

        <DialogContent>
          <form
            className={
              currentPath.includes("poussinier")
                ? "settings-form-pouss settings-form"
                : "settings-form"
            }
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit(e);
            }}
          >
            <div className="flex">
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
                <span>Date</span>
              </label>
            </div>
            <div className="flex">
              <label>
                <input
                  name="moy_flacon"
                  className="input"
                  type="number"
                  placeholder=" "
                  value={formik.values.moy_flacon}
                  onChange={formik.handleChange}
                />
                <span>Moyen / flacon</span>
              </label>
              <label>
                <input
                  required
                  name="dose"
                  className="input"
                  type="text"
                  placeholder=" "
                  value={formik.values.dose}
                  onChange={formik.handleChange}
                />
                <span>Dose*</span>
              </label>
            </div>
            <div className="flex">
              <label>
                <input
                  name="nbr_flacons"
                  className="input"
                  type="number"
                  placeholder=" "
                  value={formik.values.nbr_flacons}
                  onChange={formik.handleChange}
                />
                <span>Nombre flacons</span>
              </label>

              <label>
                <input
                  type="number"
                  name="eff_vaccine"
                  className="input"
                  placeholder=" "
                  value={formik.values.eff_vaccine}
                  onChange={formik.handleChange}
                />
                <span>Effectif vacciné</span>
              </label>
            </div>

            <Box className="flex">
              <Stack alignItems="center" direction="row" width={"100%"} gap={0}>
                <label>
                  <input
                    className="input"
                    fullWidth
                    label="Équipe vaccination"
                    name="equipe_names"
                    size="small"
                    value={teamMemberInput}
                    onChange={handleTeamMemberInputChange}
                    placeholder=" "
                  />
                  <span>Équipe </span>
                </label>
                <IconButton
                  onClick={handleAddTeamMember}
                  color="success"
                  sx={{
                    backgroundColor: "#E1F0DA",
                  }}
                >
                  <SvgIcon>
                    <Add />
                  </SvgIcon>
                </IconButton>
              </Stack>
            </Box>
            <Box className="flex">
              <Stack
                alignItems="center"
                direction="row"
                flexWrap="wrap"
                spacing={1}
                gap={0.5}
                sx={{
                  flexGrow: 1,
                  pt: teamMembersList?.length > 0 ? 1 : 0,
                }}
              >
                {teamMembersList.map((member, index) => (
                  <Chip
                    key={index}
                    label={member}
                    onDelete={() => handleDeleteTeamMember(index)}
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
                  marginBottom: "10px",
                }}
              >
                <Button color="success" variant="contained" type="submit">
                  Envoyer
                </Button>
              </div>
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
          {openConfirmation && (
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
                      openConfirmation(false);
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
        </DialogContent>
      </Dialog>
    </>
  );
}
