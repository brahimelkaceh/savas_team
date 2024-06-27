import React, { useEffect, useState } from "react";
import Production from "../boxes/Production";
import { useMemo } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import Mortalite from "../boxes/Mortalite";
import Container from "../modals/Container";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  LinearProgress,
  Stack,
} from "@mui/material";
import Consommation from "../boxes/Consommation";
import HomogPc from "../boxes/HomogPc";
import Masse from "../boxes/Masse";
import api from "../../../api/api";
let base_url = "https://farmdriver.savas.ma/api/";

const Body = ({ lot, courbeId }) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const getMultiCharts = async (lot, courbeId) => {
    try {
      setLoading(true);
      const result = await api.getMultiCharts(lot, courbeId);
      if (!result.status == 200) {
        setError("Échec de récupération des données; Veuillez réessayer.");
      } else {
        setError("");
        setData(result.data);
      }
    } catch (error) {
      setError("Échec de récupération des données; Veuillez réessayer.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3500);
    }
  };
  useEffect(() => {
    getMultiCharts(lot, courbeId);
  }, [lot, courbeId]);
  return (
    <>
      <div
        className="chart-body-container charts-box"
        style={{
          position: "relative",
          paddingTop: "5px",
        }}
      >
        {open ? (
          <Container
            open={open}
            setOpen={setOpen}
            data={data}
            courbeId={courbeId}
          />
        ) : (
          <>
            {loading && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
            )}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "34px",
                paddingBottom: "5px",
                mb: 1,
              }}
            >
              <Button
                sx={{
                  position: "absolute",
                  left: "99.8%",
                  top: "0%",
                  transform: "translate(-100% , 10%)",
                }}
                variant="outlined"
                disabled={!data}
                onClick={() => setOpen(true)}
              >
                Fusionner
              </Button>
            </Box>
            {data?.length > 0 && courbeId === 0 && <Production data={data} />}
            {data?.length > 0 && courbeId === 1 && <Mortalite data={data} />}
            {data?.length > 0 && courbeId === 2 && <Consommation data={data} />}
            {data?.length > 0 && courbeId === 3 && <HomogPc data={data} />}
            {data?.length > 0 && courbeId === 4 && <Masse data={data} />}
          </>
        )}
      </div>
    </>
  );
};

export default Body;
