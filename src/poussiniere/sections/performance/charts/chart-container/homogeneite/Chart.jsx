/**
 * Sample for Line Series
 */
import * as React from "react";
import { useEffect } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  Legend,
  DateTime,
  Tooltip,
  Highlight,
  Double,
  DataLabel,
  AxesDirective,
  AxisDirective,
  SplineAreaSeries,
  AreaSeries,
  SplineRangeAreaSeries,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
import { useTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import { green } from "@ant-design/colors";

const HomogPvChart = ({ data, show }) => {
  const theme = useTheme();
  const legendSettings = {
    visible: true,
    textStyle: { color: theme.palette.text.primary },
  };

  return (
    <ChartComponent
      id={`chart_homog`}
      theme={theme.palette.mode === "dark" ? "MaterialDark3" : "Material"}
      primaryXAxis={{
        labelIntersectAction: Browser.isDevice ? "None" : "Trim",
        labelRotation: Browser.isDevice ? -45 : 0,
        title: "",
        interval: 1,
        minimum: 1,
        maximum: 17,
        majorTickLines: { width: 1, color: theme.palette.divider },
        rangePadding: "None",
        valueType: "Double",
        majorGridLines: {
          color: theme.palette.divider,
          width: 1,
        },
        labelStyle: {
          color: theme.palette.text.secondary,
        },
      }}
      primaryxAxis={{
        valueType: "Double",
        title: "Overs",
        labelFormat: "G_age",
      }}
      // load={load.bind(this)}
      primaryYAxis={{
        title: "Homogénéité (%)",
        labelFormat: "{value}%",
        rangePadding: "None",
        minimum: 0,
        maximum: 100,
        interval: 10,
        lineStyle: { width: 0 },
        majorTickLines: { width: 1, color: theme.palette.divider },

        majorGridLines: {
          width: 0,
        },
        minorTickLines: { width: 0, color: theme.palette.divider },
        titleStyle: {
          textAlignment: "Center",
          size: "12px",
          fontWeight: "bold",
          color: theme.palette.text.primary,
        },
        labelStyle: {
          color: theme.palette.text.secondary,
          size: show ? "12px" : "10px",
        },
      }}
      chartArea={{ border: { width: 0 } }}
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
      width={Browser.isDevice ? "100%" : "100%"}
      height={"100%"}
    >
      <Inject
        services={[
          LineSeries,
          DateTime,
          Legend,
          Tooltip,
          Highlight,
          DataLabel,
          SplineAreaSeries,
          AreaSeries,
          SplineRangeAreaSeries,
        ]}
      />
      <AxesDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisC"
          opposedPosition={true}
          title="Poids corporel(g)"
          labelFormat="{value}g"
          titleStyle={{
            textAlignment: "Center",
            size: "12px",
            fontWeight: "bold",
            color: theme.palette.text.primary,
          }}
          labelStyle={{
            color: theme.palette.text.secondary,
            size: show ? "12px" : "10px",
          }}
          majorGridLines={{ width: 1.5, color: theme.palette.divider }}
          majorTickLines={{ width: 1, color: theme.palette.divider }}
          minorTickLines={{ width: 1, color: theme.palette.divider }}
          lineStyle={{ width: 1, color: theme.palette.divider }}
          minimum={0}
          maximum={2500}
          interval={250}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisA"
          opposedPosition={true}
          labelStyle={{
            color: "transparent",
          }}
          majorGridLines={{ width: 1, color: theme.palette.divider }}
          majorTickLines={{ width: 0 }}
          minorTickLines={{ width: 0 }}
          lineStyle={{ width: 0 }}
          minimum={0}
          maximum={100}
          interval={2.5}
          visible={show}
        ></AxisDirective>
      </AxesDirective>
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data.guide}
          xName="G_age"
          yName="G_homog"
          name={show ? "Guide: Homogénéité (%)" : " "}
          opacity={0.05}
          type="SplineArea"
          fill={theme.palette.mode == "light" ? "#7cb342" : "#aeea00"}
          width={2}
          border={{ width: 2 }}
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"homog"}
          name={show ? "Homogénéité" : " "}
          width={1}
          fill={theme.palette.mode == "light" ? "#7cb342" : "#aeea00"}
          type="Area"
          border={{
            width: 2,
          }}
          opacity={0.3}
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data.guide}
          xName="G_age"
          high="G_poidVifMax"
          low="G_poidVifMin"
          name={show ? "Guide : Poids corporel (g)" : " "}
          opacity={0.3}
          type="SplineRangeArea"
          yAxisName="yAxisC"
          fill={theme.palette.mode == "light" ? blue[800] : blue[200]}
          border={{ width: 1 }}
          tooltipFormat={
            show
              ? "Guide : Poids corporel: <b>${point.high}~~${point.low}</b>"
              : ": <b>${point.high}~~${point.low}</b> "
          }
        ></SeriesDirective>

        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"pv"}
          name={show ? "Poids corporel" : " "}
          width={2.5}
          fill={theme.palette.mode == "light" ? blue[800] : blue[200]}
          type="Line"
          yAxisName="yAxisC"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.guide}
          xName="G_age"
          yName="y"
          name=""
          width={1.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          type="Line"
          yAxisName="yAxisA"
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
export default HomogPvChart;
