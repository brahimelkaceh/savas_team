/**
 * Sample for DateTime axis
 */
import * as React from "react";
import { useEffect } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  DateTime,
  Legend,
  DataLabel,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import { useTheme } from "@mui/material";

const TemperatureChart = ({ data, show }) => {
  const theme = useTheme();
  const legendSettings = {
    visible: true,
    textStyle: { color: theme.palette.text.primary },
  };
  return (
    <ChartComponent
      id="charts"
      style={{ textAlign: "center" }}
      theme={theme.palette.mode === "dark" ? "MaterialDark3" : "Material"}
      primaryXAxis={{
        valueType: "Double",
        edgeLabelPlacement: "Shift",
        majorGridLines: { width: 0 },
        minimum: 1,
        maximum: 18,
        interval: show ? 1 : 2,
      }}
      primaryYAxis={{
        minimum: -40,
        maximum: 100,
        interval: show ? 5 : 10,
        edgeLabelPlacement: "Shift",
        labelFormat: "{value}°C",
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        labelStyle: {
          color: theme.palette.text.secondary,
        },
      }}
      chartArea={{ border: { width: 0 } }}
      width={"100%"}
      tooltip={{
        enable: true,
        shared: true,
        fill: theme.palette.background.paper,
        color: "#000",
        textStyle: {
          color: theme.palette.text.primary,
        },
        border: {
          width: 1,
          color: "black",
        },
        opacity: 0.7,
      }}
      legendSettings={legendSettings}
    >
      <Inject services={[LineSeries, DateTime, Legend, DataLabel, Tooltip]} />
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data.tempMin}
          fill={theme.palette.info.dark}
          xName="age"
          yName="temp"
          name="Température minimale"
          type="Line"
          marker={{
            visible: true,
            height: 8,
            width: 8,
            shape: "VerticalLine",
            isFilled: true,
            dataLabel: {
              visible: true,
              position: "Bottom",
            },
          }}
          width={2}
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data.tempMax}
          fill={theme.palette.error.dark}
          xName="age"
          yName="temp"
          name="Température maximale"
          type="Line"
          marker={{
            visible: true,
            height: 8,
            width: 8,
            shape: "VerticalLine",
            isFilled: true,
            dataLabel: {
              visible: true,
              position: "Top",
            },
          }}
          width={2}
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
export default TemperatureChart;
