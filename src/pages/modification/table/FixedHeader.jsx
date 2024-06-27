import { useState } from "react";
import DailyTableHeader from "./DailyTableHeader";
import StreamIcon from "@mui/icons-material/Stream";
import EggIcon from "@mui/icons-material/Egg";
import { CiWheat } from "react-icons/ci";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SsidChartIcon from "@mui/icons-material/SsidChart";
import TodayIcon from "@mui/icons-material/Today";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScaleIcon from "@mui/icons-material/Scale";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ConsoChartModel from "../models/ConsoChartModel";
import ProdChartModel from "../models/ProdChartModel";
import SwiperModal from "../models/SwiperModal";
import SwiperIcModal from "../models/SwiperIcModal";
import MasseOeufChartModal from "../models/MasseOeufChartModal";
import { FaChartLine } from "react-icons/fa";
import LightChartModal from "../models/LightChartModal";
import { ShoppingCartCheckout } from "@mui/icons-material";
// 'table-massoeuf-chart/',

function FixedHeader({
  dailyData,
  homogPvData,
  mortData,
  consoData,
  prodData,
  Peroformloading,
  isReform,
}) {
  const [open, setOpen] = useState(false);
  const [openIcModal, setOpenIcModal] = useState(false);
  const [openConsoChartModel, setOpenConsoChartModel] = useState(false);
  const [openProdChartModel, setOpenProdChartModel] = useState(false);
  const [openMassOeufChartModal, setOpenMassOeufChartModal] = useState(false);
  const [openLightsChartModel, setOpenLightsChartModel] = useState(false);
  return (
    <>
      {open && <SwiperModal open={open} setOpen={setOpen} />}
      {openIcModal && (
        <SwiperIcModal open={openIcModal} setOpen={setOpenIcModal} />
      )}
      {openConsoChartModel && (
        <ConsoChartModel
          openConsoChartModel={openConsoChartModel}
          setOpenConsoChartModel={setOpenConsoChartModel}
        />
      )}
      {openProdChartModel && (
        <ProdChartModel
          openProdChartModel={openProdChartModel}
          setOpenProdChartModel={setOpenProdChartModel}
        />
      )}
      {openMassOeufChartModal && (
        <MasseOeufChartModal
          openMassOeufChartModal={openMassOeufChartModal}
          setOpenMassOeufChartModal={setOpenMassOeufChartModal}
        />
      )}
      {openLightsChartModel && (
        <LightChartModal
          openLightsChartModel={openLightsChartModel}
          setOpenLightsChartModel={setOpenLightsChartModel}
        />
      )}
      <tr className="main-header">
        <th></th>
        <th colSpan={3} className="calendrie">
          <span>
            Calendrier <TodayIcon></TodayIcon>
          </span>
        </th>
        <th
          className="ambiance"
          colSpan={4}
          onClick={() => setOpenLightsChartModel(true)}
        >
          <span>
            Ambiance <SentimentSatisfiedIcon></SentimentSatisfiedIcon>
          </span>
        </th>
        <th className="viability" colSpan={6} onClick={() => setOpen(true)}>
          <span>
            Viabilité <StreamIcon></StreamIcon> <FaChartLine></FaChartLine>
          </span>
        </th>
        <th
          className="consommation"
          colSpan={7}
          onClick={() => setOpenConsoChartModel(true)}
        >
          <span>
            Consommation <CiWheat></CiWheat>
            <FaChartLine></FaChartLine>
          </span>
        </th>
        <th
          className="production-header"
          colSpan={8}
          onClick={() => setOpenProdChartModel(true)}
        >
          <span>
            Production <EggIcon></EggIcon>
            <FaChartLine></FaChartLine>
          </span>
        </th>
        <th
          colSpan={4}
          className="masse-oeuf"
          onClick={() => setOpenMassOeufChartModal(true)}
        >
          <span>
            Masse d'Oeuf <ScaleIcon></ScaleIcon>
            <FaChartLine></FaChartLine>
          </span>
        </th>
        <th
          colSpan={3}
          className="ic-header"
          onClick={() => setOpenIcModal(true)}
        >
          <span>
            indices de conversion{" "}
            <PublishedWithChangesIcon></PublishedWithChangesIcon>
            <FaChartLine></FaChartLine>
          </span>
        </th>
        {isReform && (
          <th colSpan={5} className="reforme">
            <span>
              Réforme
              <ShoppingCartCheckout />
            </span>
          </th>
        )}
      </tr>
      {
        <DailyTableHeader
          dailyData={dailyData}
          homogPvData={homogPvData}
          mortData={mortData}
          consoData={consoData}
          prodData={prodData}
          Peroformloading={Peroformloading}
          isReform={isReform}
        />
      }
    </>
  );
}

export default FixedHeader;
