import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LotIdentification from "./lot-identification";
import LastWeek from "./last-week";
import BilanGlobal from "./bilan-global";
import { BsEye } from "react-icons/bs";
import toast from "react-hot-toast";
import api from "../../../../api/api";

const BilanPArtiel = ({ lotId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();

  const fetchBilanPartial = async (id) => {
    try {
      setLoading(true);
      const result = await api.getProdBilanPartial(id);
      if (result) {
        setData(result);
        setExpanded(true);
      }
    } catch (error) {
      toast.error("Échec de récupération les données; Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBilanPartial(lotId);
  }, [lotId]);
  return (
    <Box
      sx={{
        "& .MuiAccordion-root": {
          borderColor: theme.palette.divider,

          "& .MuiAccordionSummary-root": {
            color: "#fff",
            bgcolor: theme.palette.info.dark,
            flexDirection: "row",
            borderRadius: 1,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            "&:focus-visible": {
              bgcolor: "primary.lighter",
            },
          },
          "& .MuiAccordionDetails-root": {
            borderColor: theme.palette.divider,
          },
          "& .Mui-expanded": {
            color: "#fff",
            bgcolor: theme.palette.info.dark,
          },
        },
      }}
    >
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary
          expandIcon={<BsEye color="#fff" />}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography fontWeight={"bolder"} mr={1}>
            Bilan Partiel{" "}
          </Typography>
          {loading && <CircularProgress color="inherit" size={18} />}
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          {data && (
            <Grid container spacing={2} justifyContent={"end"}>
              <Grid item md={6} xs={12}>
                <LotIdentification data={data} />
              </Grid>
              <Grid item md={6} xs={12}>
                <LastWeek data={data} />
              </Grid>
              <Grid item xs={12}>
                <BilanGlobal data={data} />
              </Grid>{" "}
            </Grid>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default BilanPArtiel;
