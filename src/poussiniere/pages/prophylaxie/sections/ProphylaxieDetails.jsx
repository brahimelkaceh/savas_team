import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Alert,
  IconButton,
  LinearProgress,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { Close, Delete, Edit } from "@mui/icons-material";
import EditProphExcution from "../prophylaxie-executions/EditProhpExecution";
import DeleteProphExecution from "../prophylaxie-executions/DeleteProphExcution";
import api from "../../../../api/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProphylaxieDetails({ id }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [successDeleteMessage, setSuccessDeleteMessage] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    fetchData(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fetchData = async (id) => {
    try {
      setLoading(true);
      const response = await api.getExecPrphProg(id);
      if (response.response.ok) {
        setData(response.data);
        setError("");
      } else {
        setError(
          "Veuillez réessayer, une erreur est survenue lors de la récupération des données pour ce programme."
        );
        setData([]);
      }
    } catch (error) {
      setError(
        "Veuillez réessayer, une erreur est survenue lors de la récupération des données pour ce programme."
      );
      setData([]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <IconButton size="small" color="info" onClick={handleClickOpen}>
        <SvgIcon>
          <AiFillEye />
        </SvgIcon>
      </IconButton>
      <Dialog
        fullWidth={true}
        maxWidth={"xl"}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent={successDeleteMessage ? "space-between" : "end"}
          // width="100%"
          m={1}
        >
          {successDeleteMessage && (
            <Alert severity="success" variant="filled">
              {successDeleteMessage}
            </Alert>
          )}
          {error && (
            <Alert
              variant="filled"
              severity="error"
              sx={{
                p: 2,
                py: 0,
              }}
            >
              {error}
            </Alert>
          )}
          <IconButton size="small" color="error" onClick={handleClose}>
            <SvgIcon>
              <Close />
            </SvgIcon>
          </IconButton>
        </Stack>
        {loading && <LinearProgress />}
        <Table sx={{ minWidth: 1150 }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#ef9a9a",
              }}
            >
              <TableCell>Date</TableCell>
              <TableCell>Interventions</TableCell>
              <TableCell>Mode d'administration</TableCell>
              <TableCell>Dose</TableCell>
              <TableCell>Moyen / flacon</TableCell>
              <TableCell>Effectif vacciné</TableCell>
              <TableCell>Nombre flacons</TableCell>
              <TableCell>Équipe</TableCell>
              <TableCell width="10%">Actions </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length > 0 &&
              data?.map((proph, i) => {
                const team = proph?.proph_equipe?.split("|");
                return (
                  <TableRow hover key={i}>
                    <TableCell>{proph?.date}</TableCell>
                    <TableCell>{proph?.proph_intervention}</TableCell>
                    <TableCell>{proph?.proph_mode_admin}</TableCell>
                    <TableCell>{proph?.proph_dose}</TableCell>
                    <TableCell>{proph?.proph_moy_flacon}</TableCell>
                    <TableCell>{proph?.proph_eff_vaccine}</TableCell>
                    <TableCell>{proph?.proph_nbr_flacons}</TableCell>
                    <TableCell>
                      {team?.map((member) => {
                        return (
                          <Typography color="text.main" variant="body2">
                            {member}
                          </Typography>
                        );
                      })}
                    </TableCell>
                    <TableCell width="10%">
                      <EditProphExcution proph={proph} />
                      <DeleteProphExecution
                        id={proph?.id}
                        onClick={handleClose}
                        executId={id}
                        fetchData={fetchData}
                        setSuccess={setSuccessDeleteMessage}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <DialogTitle color="primary">{}</DialogTitle>
      </Dialog>
    </>
  );
}
