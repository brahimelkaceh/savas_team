import React, { forwardRef, useMemo, useState } from "react";
import AltChart from "../../../modification/charts/AltChart";
import UseFetchData from "../../../../hooks/UseFetchData";
import Loader from "../../../../components/loader/Loader";
import {
  AppBar,
  Box,
  Button,
  Card,
  Dialog,
  Grid,
  IconButton,
  Modal,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
let base_url = "https://farmdriver.savas.ma/api/";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AltChartContainer = ({ id, title }) => {
  const [fullScreen, setFullScreen] = useState(false);
  const ApiUrl = useMemo(
    () => `${base_url}table-altoeuf-chart-new/?lotId=${id}`,
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
              Aliment / Oeuf{" "}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              fermer
            </Button>
          </Toolbar>
        </AppBar>
        {error ? <p>error</p> : <AltChart data={data} show={fullScreen} />}
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
          Aliment / œuf
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

      <AltChart data={data} show={fullScreen} />
      {loading && <Loader />}
    </Card>
  );
};

export default AltChartContainer;
