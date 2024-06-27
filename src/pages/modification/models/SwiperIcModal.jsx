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
import AltChart from "../charts/AltChart";
import IcChart from "../charts/IcChart";
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

export default function SwiperIcModal({ setOpen, open }) {
  const lotTableId = useSelector((state) => state.toggleLeftBar.lotTableId);
  const altoeufApi = useMemo(
    () => `${base_url}table-altoeuf-chart-new/?lotId=${lotTableId}`,
    [base_url, lotTableId]
  );
  const ApiUrl = useMemo(
    () => `${base_url}table-ic-chart/?lotId=${lotTableId}`,
    [base_url, lotTableId]
  );
  const { data: altData, loading: altOeufLoading } = UseFetchData(
    altoeufApi,
    lotTableId
  );
  const { data, loading, error } = UseFetchData(ApiUrl, lotTableId);

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
      <AppBar color="transparent" sx={{ position: "relative" }}>
        <Toolbar>
          <DownloadBtn pdfname={"courbe"} />
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
            {altData && <AltChart data={altData} show={true} />}
            {loading && <Loader />}
          </SwiperSlide>
          <SwiperSlide>
            {data && <IcChart icData={data} show={true} />}

            {loading && <Loader />}
          </SwiperSlide>
        </Swiper>
      </DialogContent>
    </Dialog>
  );
}
