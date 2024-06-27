import { useMemo } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "./style.css";
import ThirdCard from "../cards/ThirdCard";
import SkeletonBlock from "../skeletons/SkeletonBlock";
import { Skeleton } from "@mui/material";
let base_url = "https://farmdriver.savas.ma/api/";

export default function App() {
  const ApiUrl = useMemo(() => `${base_url}dash-slider/`, [base_url]);

  const { data, loading, error } = UseFetchData(ApiUrl, "GET");
  if (loading) {
    return (
      <div className="card-1">
        <SkeletonBlock />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="card-3">
        <Skeleton height={100} />
        <Skeleton height={30} />
      </div>
    );
  }

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      {data &&
        data?.map((d, i) => {
          return (
            <SwiperSlide key={i}>
              <ThirdCard data={d} />
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
