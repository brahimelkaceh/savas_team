import React, { useMemo } from "react";
import FirstChart from "../Charts/FirstChart";
import ThirdChart from "../Charts/ThirdChart";
import FourthChart from "../Charts/FourthChart";
import SecondChart from "../Charts/SecondChart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
// import { Navigation } from "swiper";
import "swiper/css/navigation";

import UseFetchData from "../../../hooks/UseFetchData";
import Loader from "../../../components/loader/Loader";
import { Box } from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

const ChartCard = () => {
  const apiUrl = useMemo(() => `${base_url}get-site-or-bats/`, []);

  const { data, loading, error } = UseFetchData(apiUrl);

  if (error) {
    return <Box className="chart-swiper">Error occurred: {error.message}</Box>;
  }

  if (!data || loading) {
    return (
      <Box gridRow="span 4" className="chart-swiper">
        <Loader />
      </Box>
    );
  }
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: false,
      }}
      navigation={true}
      modules={[Navigation]}
      className="chart-swiper"
    >
      <SwiperSlide>
        <FirstChart batSite={data} Sitesloading={loading} />
      </SwiperSlide>
      <SwiperSlide>
        <SecondChart batSite={data} Sitesl oading={loading} />
      </SwiperSlide>
      <SwiperSlide>
        <ThirdChart batSite={data} Sitesloading={loading} />
      </SwiperSlide>
      <SwiperSlide>
        <FourthChart batSite={data} Sitesloading={loading} />
      </SwiperSlide>
    </Swiper>
  );
};

export default ChartCard;
