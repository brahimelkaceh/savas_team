import React from "react";
import Topbar from "../../components/Topbar";
import Navbar from "../../components/navbar/Navbar";
import "./style.css";
import { Box, Grid, Paper } from "@mui/material";
import SliderCards from "./cards/SliderCards";
import Card from "./cards/Card";
import MyMarquee from "../../components/marquees/MyMarquee";
import ChartCard from "./cards/ChartCard";
import ObservationCard from "./cards/ObservationCard";
import { DataProvider } from "../reports/context/DataProvider";
import Chart from "./Charts/Chart";
import ChartContainer from "./Charts/ChartContainer";
import WeatherCard from "./cards/WeatherCard";
import SuplementCard from "./cards/SuplementCard";

const Container = () => {
  return (
    <main className="page">
      {/* <Topbar></Topbar> */}
      <Navbar></Navbar>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="12px"
        margin="15px"
      >
        <Card></Card>
        <SliderCards></SliderCards>
        <Box gridColumn="span 3" gridRow="span 5">
          <WeatherCard></WeatherCard>
          <DataProvider>
            <ObservationCard />
          </DataProvider>
        </Box>

        {/* <WeatherCard /> */}
        <Box gridColumn="span 9" gridRow="span 1" className="marquee-card">
          <MyMarquee />
        </Box>

        <ChartContainer />
        <SuplementCard />
      </Box>
    </main>
  );
};

export default Container;
