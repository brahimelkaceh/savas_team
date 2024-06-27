import "./batimentCat.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
// import "./styles.css";

import { Navigation } from "swiper";

import { useDispatch, useSelector } from "react-redux";
import Form from "../Form";

const BatimentCat = ({ data, CreateReports }) => {
  // console.log(data);
  const batimentCatState = useSelector(
    (state) => state.ShowBatimentCat.batimentCatState
  );
  let windowWidth = window.innerWidth;
  // console.log(data?.production.length);

  return (
    <div className={batimentCatState && "batiment-category"}>
      {windowWidth <= 900 ? (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          className="mySwiper"
          navigation={true}
          modules={[Navigation]}
        >
          <SwiperSlide>
            <div
              className={
                data?.production?.length == 0
                  ? "production  disabled"
                  : "production "
              }
            >
              <div className="overlay"></div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <span>Production</span>
              </div>

              <Form data={data.production} CreateReports={CreateReports} />
            </div>
          </SwiperSlide>
          {data?.poussiniere.length > 0 && (
            <SwiperSlide>
              <div
                className={
                  data?.poussiniere.length == 0
                    ? "poussinier  disabled"
                    : "poussinier"
                }
              >
                <div className="overlay"></div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <span className="poussiniere-title">Poussiniere</span>
                </div>

                <Form data={data.poussiniere} CreateReports={CreateReports} />
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      ) : (
        <>
          <div
            className={
              data?.production?.length == 0
                ? "production disabled"
                : "production  "
            }
          >
            <div className="overlay"></div>

            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <span>Production</span>
            </div>

            <Form data={data.production} CreateReports={CreateReports} />
          </div>

          {/* {data?.poussiniere?.length >= 1 && ( */}
          <div
            className={
              data?.poussiniere?.length == 0
                ? "poussinier disabled"
                : "poussinier  "
            }
          >
            <div className="overlay"></div>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              <span className="poussiniere-title">Poussiniere</span>
            </div>

            <Form data={data.poussiniere} CreateReports={CreateReports} />
          </div>

          {/* )} */}
        </>
      )}
    </div>
  );
};

export default BatimentCat;
