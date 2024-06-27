import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLotId, getMsgContent } from "../../slices/LeftBar";
let base_url = "https://farmdriver.savas.ma/api/";
import "./style.css";
import UseFetchData from "../../hooks/UseFetchData";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { getRefreshData, getRenderData } from "../../slices/SiteData";
import SelectedComponents from "./components/SelectedComponents";
import BilanPArtiel from "./header/bilan-partiel";
import api from "../../api/api";
import { openSnackbar } from "../../api/snackbar";
function Header({ dataLoading, setIsReform }) {
  const dispatch = useDispatch();
  const [lotId, setLotId] = useState("");
  const [siteId, setSiteId] = useState("");
  // //////////////////////////////////////////////////////////////////
  const [activeLots, setActiveLots] = useState([]);
  const [reformLots, setReformLots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // //////////////////////////////////////////////////////////////////
  const lotIdentificationApiUrl = useMemo(
    () => `${base_url}get-lot-identification/?lotId=${lotId}`,
    [base_url, lotId]
  );
  const {
    data: lotIdentificationData,
    loading: lotIdentificationLoading,
    error: lotIdentificationError,
  } = UseFetchData(lotIdentificationApiUrl, "GET");

  dispatch(getMsgContent(lotIdentificationData?.msg?.content));

  const fetchLotData = async (id) => {
    try {
      setIsLoading(true);
      const result = await api.getLotTitles(id);
      if (result.status === 200) {
        let data = result.data.filter(
          (d) => d.type == "production" && d.isActive
        );
        const reformLots = result.data.filter(
          (d) => d.type == "production" && !d.isActive
        );

        setReformLots(reformLots);
        setActiveLots(data);
      }
    } catch (error) {
      openSnackbar({
        open: true,
        message: "Échec de récupération des lots; Veuillez réessayer.",
        variant: "alert",
        alert: {
          color: "error",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (lotIdentificationError) {
    return (
      <div
        className="modification-table-header"
        style={{ paddingBottom: "5px" }}
      >
        <Skeleton variant="rounded" width="100%" height={70} animation="wave" />
      </div>
    );
  }

  if (!lotIdentificationData) {
    return (
      <div
        className="modification-table-header"
        style={{ paddingBottom: "5px" }}
      >
        <Skeleton variant="rounded" width="100%" height={70} animation="wave" />
      </div>
    );
  }
  return (
    <Stack gap={1} sx={{ my: 1 }}>
      <Card>
        <Grid
          item
          container
          spacing={2}
          p={1}
          mb={2}
          alignItems="flex-end"
          xs={12}
        >
          <Grid item md={6} xs={12}>
            <SelectedComponents
              setLotId={setLotId}
              lotId={lotId}
              setSiteId={setSiteId}
              siteId={siteId}
              dataLoading={dataLoading}
              setIsReform={setIsReform}
              fetchLotData={fetchLotData}
              activeLots={activeLots}
              isLoading={isLoading}
              reformLots={reformLots}
            />
          </Grid>
          <Grid item md={6} xs={12} container justifyContent={"end"}>
            <Button
              variant="contained"
              disabled={!lotId}
              onClick={() => {
                dispatch(getLotId(lotId));
                dispatch(getRefreshData(new Date().toString()));
              }}
            >
              Afficher les donnees
            </Button>
          </Grid>
        </Grid>
      </Card>
      {dataLoading && <LinearProgress />}
      <BilanPArtiel lotId={lotId} />
    </Stack>
  );
}

export default Header;
