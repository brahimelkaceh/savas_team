import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DownloadBtn from "../components/DownloadBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import MortChart from "../charts/MortChart";
import HomogPvChart from "../charts/HomogPvChart";
import { forwardRef, useMemo } from "react";
import { useSelector } from "react-redux";
import UseFetchData from "../../../hooks/UseFetchData";
import Loader from "../../../components/loader/Loader";
let base_url = "https://farmdriver.savas.ma/api/";

import { Navigation } from "swiper/modules";
import {
  AppBar,
  Button,
  Dialog,
  DialogContent,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function SwiperModal({ setOpen, open }) {
  const lotTableId = useSelector((state) => state.toggleLeftBar.lotTableId);
  const mortChartApi = useMemo(
    () => `${base_url}table-mort-chart-new/?lotId=${lotTableId}`,
    [base_url, lotTableId]
  );
  const ApiUrl = useMemo(
    () => `${base_url}homog-pv-chart-new/?lotId=${lotTableId}`,
    [base_url, lotTableId]
  );
  const { data: mortData, loading: mortLoading } = UseFetchData(
    mortChartApi,
    "GET",
    lotTableId
  );
  const { data, loading, error } = UseFetchData(ApiUrl, "GET", lotTableId);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        color="transparent"
        sx={{ position: "relative", marginBottom: 1 }}
      >
        <Toolbar>
          <DownloadBtn pdfname={"Courbe"} />
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
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>
            {error ? (
              <p style={{ zIndex: 1000 }}>error</p>
            ) : (
              <HomogPvChart data={data} show={true} />
            )}
            {loading && <Loader />}
          </SwiperSlide>
          <SwiperSlide>
            {!mortData ? (
              <p>No Mort Chart data</p>
            ) : (
              <MortChart data={mortData} show={true} />
            )}
            {mortLoading && <Loader />}
          </SwiperSlide>
        </Swiper>
      </DialogContent>
    </Dialog>
  );
}
