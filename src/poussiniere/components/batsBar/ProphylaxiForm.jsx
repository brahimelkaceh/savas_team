import {
  Accordion,
  AccordionSummary,
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ConfirmModal from "../../../pages/settings/modals/ConfirmModal";
import Loader from "../../../components/loader/Loader";
import ConfirmationModal from "../ui/ConfirmModal";
import { useDispatch } from "react-redux";
import { getRenderData } from "../../../slices/SiteData";
import SuccessAlert from "../../../components/alerts/SuccessAlert";
import { ExpandMore } from "@mui/icons-material";
import api from "../../../api/api";
import NewProphylaxis from "../forms/NewProphylaxis";
import toast, { Toaster } from "react-hot-toast";

const ProphylaxiForm = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState(null);
  const dispatch = useDispatch();

  const ChangeProphylaxiStatus = async (data) => {
    try {
      setLoading(true);
      const response = await api.changeProphylaxiStatus(data);
      if (response) {
        setNewStatus(response.status.status);
        setLoading(false);
        dispatch(getRenderData(new Date().toString()));
        toast.success("Changement de statut de la prophylaxie réussi !");
        setOpenModal(false);
      } else {
        toast.error("Échec de modification du statut de la prophylaxie.");
        console.error(
          `Failed to change prophylaxi status. Status: ${response.status}`
        );
        setLoading(false);
      }
    } catch (error) {
      // Handle any other errors that may occur during the request
      console.error("An error occurred:", error);
      toast.error("Échec de modification du statut de la prophylaxie.");
      setLoading(false);
    }
  };
  useEffect(() => {
    setNewStatus(data.status);
  }, [data.status]);
  return (
    <Card
      className="batiment-form"
      sx={{
        // border: "none",
        boxShadow: "none",
        paddingBottom: 0.5,
      }}
    >
      <Toaster gutter={8} position="bottom-right" reverseOrder={false} />
      {openModal && (
        <ConfirmationModal
          open={openModal}
          setOpen={setOpenModal}
          onSubmit={ChangeProphylaxiStatus}
          loading={loading}
          data={{ id: data?.id, status: newStatus }}
          message={"Êtes-vous sûr de vouloir envoyer ces données ?"}
        />
      )}
      <Stack
        flexDirection="row"
        width="100%"
        justifyContent={"end"}
        alignItems={"center"}
        gap={5}
        mr={0}
        my={1}
      >
        <Chip
          size="small"
          color={
            newStatus == 1 ? "success" : newStatus == 0 ? "info" : "warning"
          }
          sx={{
            color: "#fff !important",
          }}
          label={
            newStatus == 1
              ? "Exécuté"
              : newStatus == 0
              ? "En Programme"
              : "En cours"
          }
        />
        <Button
          size="small"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            setOpenModal(true);
          }}
        >
          {newStatus == 2 ? "Terminer" : "Commencer"}
        </Button>
      </Stack>
      <Accordion
        sx={{
          boxShadow: "none",
        }}
        disabled={newStatus === 0}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            background: "#ffd180",
          }}
        >
          <Typography sx={{ width: "33%", flexShrink: 0, fontWeight: "Bold" }}>
            Intervention : {data?.intervention}
          </Typography>
        </AccordionSummary>
        <Divider />
        <Box
          sx={{
            p: 1.5,
          }}
        >
          <Grid container spacing={1.5} mb={1}>
            <Grid item xs={12} md={6}>
              <Alert
                icon={false}
                severity="info"
                sx={{
                  py: 0,
                  px: 0.5,
                }}
              >
                Mode d'administration :
                <AlertTitle
                  sx={{
                    py: 0,
                    px: 0.5,
                    m: 0,
                  }}
                >
                  {" "}
                  {data?.mode_administration}
                </AlertTitle>
              </Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Alert
                icon={false}
                severity="info"
                sx={{
                  py: 0,
                  px: 0.5,
                }}
              >
                Date :
                <AlertTitle
                  sx={{
                    py: 0,
                    px: 0.5,
                    m: 0,
                  }}
                >
                  {data?.date}
                </AlertTitle>
              </Alert>
            </Grid>
            {/* <Grid item xs={6}>
              <Alert
                icon={false}
                severity="info"
                sx={{
                  py: 0,
                  px: 0.5,
                }}
              >
                Contrôles :
                <AlertTitle
                  sx={{
                    py: 0,
                    px: 0.5,
                    m: 0,
                  }}
                >
                  {data?.controles}
                </AlertTitle>
              </Alert>
            </Grid> */}
            <Grid item xs={12}>
              <Alert
                icon={false}
                severity="info"
                sx={{
                  py: 0,
                  px: 0.5,
                }}
              >
                Note :
                <AlertTitle
                  sx={{
                    py: 0,
                    px: 0.5,
                    m: 0,
                  }}
                >
                  {data?.note}
                </AlertTitle>
              </Alert>
            </Grid>
          </Grid>
          {newStatus == 2 && <NewProphylaxis data={data} />}
        </Box>
      </Accordion>
    </Card>
  );
};

export default ProphylaxiForm;
