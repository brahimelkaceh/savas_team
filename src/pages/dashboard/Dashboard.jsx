import { memo, useMemo } from "react";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import { closeDrop } from "../../slices/UserDrop";
import { useSelector, useDispatch } from "react-redux";
import FirstCard from "./cards/FirstCard";
import FirstChart from "./Charts/FirstChart";
import SecondChart from "./Charts/SecondChart";
import ThirdChart from "./Charts/ThirdChart";
import FourthChart from "./Charts/FourthChart";
import Profylax from "./widgets/Profylax";
import Observation from "./widgets/Observation";
import CardsSwiper from "./swiper/CardsSwiper";
import MyMarquee from "../../components/marquees/MyMarquee";
import UseFetchData from "../../hooks/UseFetchData";
import Loader from "../../components/loader/Loader";
import "./dashboard.css";
import Navbar from "../../components/navbar/Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

let base_url = "https://farmdriver.savas.ma/api/";

function Dashboard() {
  const apiUrl = useMemo(() => `${base_url}get-site-or-bats/`, []);

  const { data, loading, error } = UseFetchData(apiUrl);

  if (error) {
    return <div className="card-1">Error occurred: {error.message}</div>;
  }

  if (!data || loading) {
    return (
      <main className="page">
        <Loader />
      </main>
    );
  }

  return (
    <>
      <main className="page">
        <Topbar />
        <Navbar />
        <div className="container">
          <FirstCard />
          <div className="cards-swiper">
            <CardsSwiper />
          </div>

          <div className="marquee-card">
            <MyMarquee />
          </div>

          <div className="card-4">
            <Observation />
            {/* <Profylax /> */}
          </div>
          <div className="card-5">
            {/* <div className="chart-box1">
              <div className="chart-1">
                <FirstChart batSite={data} Sitesloading={loading} />
              </div>
              <div className="chart-2">
                <SecondChart batSite={data} Sitesloading={loading} />
              </div>
            </div>
            <div className="chart-box2">
              <div className="chart-3">
                <ThirdChart batSite={data} Sitesloading={loading} />
              </div>
              <div className="chart-4">
                <FourthChart batSite={data} Sitesloading={loading} />
              </div>
            </div> */}
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              // pagination={{
              //   clickable: true,
              // }}
              navigation={{ clickable: true }}
              modules={[Navigation]}
              className="charts-swiper"
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
          </div>
        </div>
      </main>
    </>
  );
}

export default memo(Dashboard);
