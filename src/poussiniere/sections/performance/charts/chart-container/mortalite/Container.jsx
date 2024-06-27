import React, { forwardRef, useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Card,
  Dialog,
  Divider,
  IconButton,
  LinearProgress,
  Modal,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import MortChart from "./Chart";
import api from "../../../../../../api/pouss-charts";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MortaliteContainer = ({ id, title }) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMortaliteChartData = async (id) => {
    try {
      setLoading(true);
      const result = await api.getMortChartData(id);
      if (result.status === 200) {
        setData(result.data);
        setLoading(false);
      }
    } catch (error) {
      openSnackbar({
        open: true,
        message: "Échec de récupération les donnees; Veuillez réessayer.",
        variant: "alert",
        alert: {
          color: "error",
        },
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMortaliteChartData(id);
  }, [id]);
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
            <Typography>Mortalité</Typography>
            <Typography
              sx={{ flex: 1 }}
              textAlign={"center"}
              variant="h5"
              component="div"
            >
              {title}
            </Typography>{" "}
            <Button autoFocus color="inherit" onClick={handleClose}>
              fermer
            </Button>
          </Toolbar>
        </AppBar>

        {data && (
          <MortChart reel={data?.reel} guide={data?.guide} show={fullScreen} />
        )}
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
      {loading && <LinearProgress />}
      <Stack
        flexDirection={"row"}
        justifyContent={"space-between"}
        gap={2}
        alignItems={"center"}
      >
        <Typography
          color="primary"
          variant="caption"
          fontWeight={"bold"}
          px={0.3}
        >
          Mortalité{" "}
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
      <Divider />
      <MortChart reel={data?.reel} guide={data?.guide} show={fullScreen} />
    </Card>
  );
};

export default MortaliteContainer;
