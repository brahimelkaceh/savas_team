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
  SplineSeries,
  SplineAreaSeries,
  AreaSeries,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";

const HomogPvChart = ({ data, show }) => {
  console.log("conso data", data);
  const onChartLoad = (args) => {
    let chart = document.getElementById(`chart_homog`);
    chart.setAttribute("title", "");
  };
  const load = (args) => {
    let selectedTheme = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.chart.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    )
      .replace(/-dark/i, "Dark")
      .replace(/contrast/i, "Contrast");
  };

  const lines = { width: 1 };
  const style = {
    " #chart_ChartTitle": {
      color: "red !important",
    },
  };

  return (
    <ChartComponent
      id={`chart_homog`}
      // style={{ textAlign: "center" }}
      style={style}
      primaryxAxis={{
        valueType: "Double",
        title: "Overs",
        labelFormat: "age",
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
        majorTickLines: { width: 1, color: "#65B741" },

        majorGridLines: {
          width: 0,
        },
        minorTickLines: { width: 0, color: "#65B741" },
        titleStyle: {
          textAlignment: "Center",
          size: "12px",
          fontWeight: "bold",
          color: "#65B741",
        },
        labelStyle: {
          color: "#65B741",
          size: "11px",
        },
      }}
      chartArea={{ border: { width: 0 } }}
      tooltip={{
        enable: true,
        shared: true,
        fill: "#fff",
        color: "#000",
        textStyle: {
          color: "#000",
        },
        border: {
          width: 1,
          color: "black",
        },
        opacity: 0.5,
      }}
      legendSettings={{ enableHighlight: true }}
      width={Browser.isDevice ? "100%" : "100%"}
      height={"100%"}
      // title={`Poids corporel & Homogénéité`}
      titleStyle={{
        textAlignment: "Center",
        size: "15px",
        fontWeight: "600",
        color: "#0E49B5",
      }}

      // loaded={onChartLoad.bind(this)}
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
            fontWeight: "500",
            color: "#0E49B5",
          }}
          labelStyle={{
            color: "#0E49B5",
            size: "12px",
          }}
          majorGridLines={{ width: 1 }}
          majorTickLines={{ width: 1, color: "#0E49B5" }}
          minorTickLines={{ width: 1, color: "#0E49B5" }}
          lineStyle={{ width: 1, color: "#0E49B5" }}
          minimum={0}
          maximum={2500}
          interval={250}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisA"
          opposedPosition={true}
          title=""
          titleStyle={{
            textAlignment: "Center",
            size: "12px",
            fontWeight: "400",
          }}
          labelStyle={{
            color: "transparent",
          }}
          majorGridLines={lines}
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
          dataSource={data?.reel}
          xName="age"
          yName={"homog"}
          name={show ? "Homogénéité" : " "}
          width={1}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#9ADE7B"
          type="Area"
          border={{
            width: 2,
          }}
          opacity={0.3}
          // yAxisName="yAxisA"
        ></SeriesDirective>

        <SeriesDirective
          dataSource={data?.guide}
          xName="age"
          yName={"gPv"}
          name={show ? "Guide: Poids corporel" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#B4D4FF"
          opacity={0.5}
          type="Line"
          yAxisName="yAxisC"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"pv"}
          name={show ? "Poids corporel" : " "}
          width={2.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#0E49B5"
          type="Line"
          yAxisName="yAxisC"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.guide}
          xName="age"
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
