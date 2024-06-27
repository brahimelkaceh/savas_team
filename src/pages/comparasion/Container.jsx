// material-ui
import {
  Button,
  Card,
  CardHeader,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

// project import
import { useEffect, useState } from "react";
import { openSnackbar } from "../../api/snackbar";
import api from "../../api/api";
import ModalsContainer from "../../sections/production/comparatif/comparatif-lot/ModalsContainer";
import Body from "../../sections/production/comparatif/comparatif-lot/Body";
import Header from "../../sections/production/comparatif/comparatif-lot/Header";
import Navbar from "../../components/navbar/Navbar";

// ==============================|| SAMPLE PAGE ||============================== //

const Comparatif = () => {
  const [open, setOpen] = useState(false);
  const [courbeId, setCourbeId] = useState("");
  const [lotName, setLotName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const fetchComparChartData = async (lotName, courbeId) => {
    if (!lotName || (courbeId !== 0 && !courbeId)) {
      return;
    }
    try {
      setLoading(true);
      const result = await api.getMultiCharts(lotName, courbeId);
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
    fetchComparChartData(lotName, courbeId);
  }, [lotName, courbeId]);
  return (
    <main className="page">
      <Navbar />
      <div
        className="
      charts-container"
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Card>
              <Header
                lotName={lotName}
                setLotName={setLotName}
                courbeId={courbeId}
                setCourbeId={setCourbeId}
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            {open && (
              <ModalsContainer
                open={open}
                setOpen={setOpen}
                data={data}
                courbeId={courbeId}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Stack p={1} flexDirection={"row"} justifyContent={"end"} gap={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setCourbeId("");
                  }}
                >
                  réinitialiser
                </Button>
                <Button
                  variant="contained"
                  disabled={!lotName || (courbeId !== 0 && !courbeId)}
                  onClick={() => setOpen(true)}
                >
                  Fusionner
                </Button>
              </Stack>
              {loading && (
                <LinearProgress
                  sx={{
                    marginTop: 1,
                  }}
                />
              )}
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Body data={data} courbeId={courbeId} />
          </Grid>
        </Grid>
      </div>
    </main>
  );
};

export default Comparatif;
