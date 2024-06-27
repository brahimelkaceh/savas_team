import { forwardRef, useMemo } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ProdChart from "../charts/ProdChart";
import DownloadBtn from "../components/DownloadBtn";
import Loader from "../../../components/loader/Loader";
import UseFetchData from "../../../hooks/UseFetchData";
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
export default function ProdChartModel({
  setOpenProdChartModel,
  openProdChartModel,
}) {
  const lotTableId = useSelector((state) => state.toggleLeftBar.lotTableId);
  const ApiUrl = useMemo(
    () => `${base_url}table-prod-chart-new/?lotId=${lotTableId}`,
    [base_url, lotTableId]
  );
  const { data, loading, error } = UseFetchData(ApiUrl, "GET", lotTableId);
  const handleClose = () => {
    setOpenProdChartModel(false);
  };
  return (
    <Dialog
      fullScreen
      open={openProdChartModel}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        color="transparent"
        sx={{ position: "relative", marginBottom: 1 }}
      >
        <Toolbar>
          <DownloadBtn pdfname={"courbe-de-production"} />
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
        {error ? <p>error</p> : <ProdChart data={data} show={true} />}
        {loading && <Loader />}
      </DialogContent>
    </Dialog>
  );
}
