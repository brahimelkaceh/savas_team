import { forwardRef, useMemo } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ConsoChart from "../charts/ConsoChart";
import DownloadBtn from "../components/DownloadBtn";
import UseFetchData from "../../../hooks/UseFetchData";
import Loader from "../../../components/loader/Loader";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ConsoChartModel({
  setOpenConsoChartModel,
  openConsoChartModel,
}) {
  const lotTableId = useSelector((state) => state.toggleLeftBar.lotTableId);

  const ApiUrl = useMemo(
    () => `${base_url}table-conso-chart-new/?lotId=${lotTableId}`,
    [base_url, lotTableId]
  );

  const { data, loading, error } = UseFetchData(ApiUrl, "GET", lotTableId);

  const handleClose = () => {
    setOpenConsoChartModel(false);
  };
  return (
    <Dialog
      fullScreen
      open={openConsoChartModel}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        color="transparent"
        sx={{ position: "relative", marginBottom: 1 }}
      >
        <Toolbar>
          <DownloadBtn pdfname={"courbe-de-consommation"} />
          <Typography
            sx={{ ml: 2, flex: 1 }}
            variant="h6"
            component="div"
          ></Typography>
          <Button
            autoFocus
            color="error"
            variant="outlined"
            onClick={handleClose}
          >
            Fermer
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent className="modal " id="chartDiv">
        {error ? <p>error</p> : <ConsoChart data={data} show={true} />}
        {loading && <Loader />}
      </DialogContent>
    </Dialog>
  );
}
