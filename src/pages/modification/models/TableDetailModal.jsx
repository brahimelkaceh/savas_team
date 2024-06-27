import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useMemo, useEffect, useState, forwardRef } from "react";
import Rating from "@mui/material/Rating";

import UseFetchData from "../../../hooks/UseFetchData";
import Loader from "../../../components/loader/Loader";
import egg70 from "../../../assets/70.png";
import egg80 from "../../../assets/80.png";
import egg90 from "../../../assets/90.png";
import egg100 from "../../../assets/100.png";
import egg110 from "../../../assets/110.png";
import noimg from "../../../assets/no-img.png";
import { useSelector } from "react-redux";
import {
  AppBar,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  LinearProgress,
  Paper,
  Slide,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors";
let base_url = "https://farmdriver.savas.ma/api/";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "50%",
  boxShadow: 24,
  p: 3,
  borderTopColor: "#004e86",
};
const TableDetailModal = ({ open, setOpen, age, lotId }) => {
  const batimentName = useSelector((state) => state.getSiteData.batimentName);
  const theme = useTheme();
  const tableApiUrl = useMemo(
    () => `${base_url}get-table-row-details/?lotId=${lotId}&age=${age}`,
    [base_url, lotId, age]
  );

  const { data, loading } = UseFetchData(tableApiUrl, "GET", lotId);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullScreen
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth={"xxl"}
      p={1}
    >
      <AppBar
        sx={{
          position: "relative",
          marginBottom: 1,
          bgcolor: theme.palette.info.dark,
        }}
      >
        <Toolbar variant="dense">
          <Stack
            width={"100%"}
            alignItems={"end"}
            justifyContent={"space-between"}
          >
            <Button
              autoFocus
              color="inherit"
              variant="outlined"
              onClick={handleClose}
            >
              Fermer
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <TableContainer
        sx={{
          "& .css-1ndpvdd-MuiTableCell-root": {
            padding: 0,
          },
        }}
        component={Paper}
      >
        <Table>
          <TableHead className="sticky-header">
            <TableRow>
              <TableCell align="center" colSpan={4}></TableCell>

              {/* Regrouper */}
              <TableCell
                sx={{
                  padding: "0",
                  background: blue[300],
                }}
                align="center"
                colSpan={6}
              >
                Déclassé
              </TableCell>

              {/* Regrouper */}
              <TableCell align="center"></TableCell>
            </TableRow>
            <TableRow
              sx={{
                background: blue[100],
              }}
            >
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Coloration</TableCell>
              <TableCell align="center">Coquille</TableCell>
              <TableCell align="center">Double jaune</TableCell>
              {/* Regrouper */}
              <TableCell align="center">Sale</TableCell>
              <TableCell align="center">Triage</TableCell>
              <TableCell align="center">blancs</TableCell>
              <TableCell align="center">Cassé</TableCell>
              <TableCell align="center">
                <Typography color="text.primary" variant="subtitle2">
                  Liquide kg
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  Nombre
                </Typography>
              </TableCell>
              <TableCell align="center">Somme de déclassé</TableCell>
              {/* Regrouper */}
              <TableCell align="center">Observation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((d, i) => {
              console.log(d);
              return (
                <TableRow hover key={i}>
                  <TableCell align="center">
                    <Typography color="text.primary" variant="subtitle2">
                      {d.date}
                    </Typography>
                    <Typography color="text.secondary" variant="caption">
                      {d.day}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={0} alignItems={"center"}>
                      <Box
                        component="span"
                        sx={{
                          "& img": {
                            height: 50,
                          },
                        }}
                      >
                        <img
                          alt="egge"
                          src={
                            d.coloration == 70
                              ? egg70
                              : d.coloration == 80
                              ? egg80
                              : d.coloration == 90
                              ? egg90
                              : d.coloration == 100
                              ? egg100
                              : d.coloration == 110
                              ? egg110
                              : noimg
                          }
                        />
                      </Box>
                      <Typography variant="subtitle1">
                        {d.coloration}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Rating name="read-only" value={d.coquille} readOnly />
                  </TableCell>
                  <TableCell align="center">{d.dj}</TableCell>

                  <TableCell align="center">{d.sale}</TableCell>
                  <TableCell align="center">{d.triage}</TableCell>
                  <TableCell align="center">{d.blancs}</TableCell>
                  <TableCell align="center">{d.casse}</TableCell>
                  <TableCell align="center">
                    <Typography color="text.primary" variant="subtitle2">
                      {d.liquide_kg}
                    </Typography>
                    <Typography color="text.secondary" variant="caption">
                      {d.liquide_egg}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{d.sum_declassed}</TableCell>
                  <TableCell align="center">
                    {d.observation != "NULL" ? d.observation : "--"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#eee",
            }}
          >
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Coloration</TableCell>
            <TableCell align="center">Coquille</TableCell>
            <TableCell align="center">Double jaune</TableCell>
            <TableCell align="center">
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Déclassés
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">blancs</TableCell>
                <TableCell align="center">Cassé</TableCell>
                <TableCell align="center">
                  <Typography color="text.primary" variant="subtitle2">
                    Liquide kg
                  </Typography>
                  <Typography color="text.secondary" variant="caption">
                    Nombre
                  </Typography>
                </TableCell>
              </TableRow>
            </TableCell>

            <TableCell align="center">Observation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
        </TableBody>
      </Table> */}
    </Dialog>
  );
};

export default TableDetailModal;
