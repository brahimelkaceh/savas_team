import * as React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Box, Skeleton } from "@mui/material";
import UseFetchData from "../../../hooks/UseFetchData";
import SkeletonBlock from "../skeletons/SkeletonBlock";
import ThirdCard from "./ThirdCard";
let base_url = "https://farmdriver.savas.ma/api/";

function SliderCards() {
  const ApiUrl = React.useMemo(() => `${base_url}dash-slider/`, [base_url]);

  const { data, loading, error } = UseFetchData(ApiUrl, "GET");
  if (loading) {
    return (
      <div
        gridColumn="span 9"
        display="flex"
        alignItems="center"
        justifyContent="center"
        className="card-slider"
        backgroundColor="#fff"
      >
        <SkeletonBlock />
      </div>
    );
  }

  // if (error || !data) {
  //   return (
  //     <div className="card-3">
  //       <Skeleton height={100} />
  //       <Skeleton height={30} />
  //     </div>
  //   );
  // }
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper card-slider"
    >
      {data &&
        data?.map((d, i) => {
          return (
            <SwiperSlide key={i} className="swiper">
              <ThirdCard data={d} />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}

export default SliderCards;
