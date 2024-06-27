import { Box, Button, Divider, IconButton, Skeleton } from "@mui/material";
import React, { useMemo, useState } from "react";
import UseFetchData from "../../../hooks/UseFetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import { WiHumidity } from "react-icons/wi";

import AirIcon from "@mui/icons-material/Air";
import ObservationCard from "./ObservationCard";
let base_url = "https://farmdriver.savas.ma/api/";

const WeatherCard = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const apiUrl = useMemo(() => `${base_url}get-weather/`, []);

  const { data, loading, error } = UseFetchData(apiUrl);
  if (error) {
    return <div className="card-item">Error occurred: {error.message}</div>;
  }
  if (loading) {
    return (
      <Box
        gridColumn="span 3"
        gridRow="span 4"
        height="100vh"
        borderRadius="var(--border-radius)"
      >
        <div className="card-item">
          <div className="card-content">
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
            <Skeleton width="100%" height={100} />
          </div>
        </div>
      </Box>
    );
  }

  return (
    <Box
      className="observations weather"
      style={{
        background: data[0]?.isDay
          ? "linear-gradient(18deg, #4bb5f1 -0.75%, #2f2cbc 100%) "
          : "linear-gradient(18deg, #223076 -0.75%, #06050e 100%)",
        gridRow: "span 1",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100%",
          padding: "0 5px",
        }}
      ></Box>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        navigation={{
          enabled: true,
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {data &&
          data?.map((weather) => {
            return (
              <SwiperSlide className="swiper">
                <div className="weather-header">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                    }}
                  >
                    <h3 className="weather-site_name">{weather?.site}</h3>
                    <span className="current-date">
                      {weather?.currentWeather?.dateTime?.date} -{" "}
                      {weather?.currentWeather?.dateTime?.time}
                    </span>
                  </div>
                </div>
                <div className="weathe-site-info">
                  <h1 className="current-temp">
                    {weather?.currentWeather?.currentTemp}°
                  </h1>
                  <div className="min-max-temp">
                    <ThermostatIcon />
                    <div>
                      <span className="min-temp">
                        {weather?.currentWeather?.tempMin}°
                      </span>
                      /
                      <span className="max-temp">
                        {weather?.currentWeather?.tempMax}°
                      </span>
                    </div>
                  </div>

                  <div className="weather-speed">
                    <AirIcon />
                    <span>{weather?.currentWeather?.windSpeed} Km/h</span>
                  </div>
                  <div className="weather-humidity">
                    <WiHumidity
                      style={{
                        fontSize: "25px",
                      }}
                    />
                    <span> {weather?.currentWeather?.humidity}%</span>
                  </div>
                </div>
                <Box className="weather-body">
                  {weather?.forcast?.map((day) => {
                    return (
                      <div className="weather-body-item">
                        <p className="wather-day">
                          {day?.date?.day} <span>{day?.date?.date}</span>
                        </p>
                        <div className="min-max-temp">
                          <span className="min-temp">{day?.tempMin}°</span>/
                          <span className="max-temp">{day?.tempMax}°</span>
                        </div>
                        <div className="min-max-temp">
                          <span className="min-temp">{day?.windSpeed} </span>
                          <span
                            className="min-temp"
                            style={{
                              textTransform: "lowercase",
                            }}
                          >
                            Km/h
                          </span>
                        </div>
                        <div className="weather-humidity">
                          <p className="wather-day-humidity">
                            {day?.humidity?.day} /{" "}
                          </p>
                          <p className="wather-day-humidity">
                            {day?.humidity?.night}%
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </Box>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </Box>
  );
};

export default WeatherCard;
