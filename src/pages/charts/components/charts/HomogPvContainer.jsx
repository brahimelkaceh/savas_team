import React, { forwardRef, useMemo, useState } from "react";
import HomogPvChart from "../../../modification/charts/HomogPvChart";
import UseFetchData from "../../../../hooks/UseFetchData";
import Loader from "../../../../components/loader/Loader";
import {
  AppBar,
  Box,
  Button,
  Card,
  Dialog,
  IconButton,
  Modal,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
let base_url = "https://farmdriver.savas.ma/api/";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",
  boxShadow: 24,
  p: 3,
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const HomogPvContainer = ({ id, title }) => {
  const [fullScreen, setFullScreen] = useState(false);

  const ApiUrl = useMemo(
    () => `${base_url}homog-pv-chart-new/?lotId=${id}`,
    [base_url, id]
  );
  const { data, loading, error } = UseFetchData(ApiUrl, "GET", id);

  const handleClose = () => {
    setFullScreen(false);
  };
  if (fullScreen) {
    return (
      <Dialog
        fullScreen
        open={fullScreen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar color="primary" sx={{ position: "relative", marginBottom: 2 }}>
          <Toolbar>
            <Typography variant="caption">{title}</Typography>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Poids corporel & Homogénéité{" "}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              fermer
            </Button>
          </Toolbar>
        </AppBar>
        {error ? <p>error</p> : <HomogPvChart data={data} show={fullScreen} />}{" "}
        {loading && <Loader />}
      </Dialog>
    );
  }
  return (
    <Card
      style={{
        height: "35vh",
        paddingBottom: 30,
      }}
    >
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        gap={2}
        alignItems={"center"}
      >
        <Typography color="error" variant="caption">
          {title}
        </Typography>{" "}
        <Typography color="primary" variant="body2">
          Poids corporel & Homogénéité{" "}
        </Typography>
        <IconButton
          color="primary"
          onClick={() => {
            setFullScreen(!fullScreen);
          }}
        >
          <FullscreenIcon></FullscreenIcon>
        </IconButton>
      </Stack>
      <HomogPvChart data={data} show={fullScreen} />
      {loading && <Loader />}
    </Card>
  );
};

export default HomogPvContainer;
