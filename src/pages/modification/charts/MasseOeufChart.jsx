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
  ColumnSeries,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";

const MassOeufChart = ({ data, show }) => {
  const onChartLoad = (args) => {
    let chart = document.getElementById(`chart_masse`);
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
      id={`chart_masse`}
      // style={{ textAlign: "center" }}
      style={style}
      primaryxAxis={{
        valueType: "Double",
        title: "Overs",
        labelFormat: "age",
      }}
      // load={load.bind(this)}
      primaryYAxis={{
        title: "∑ Massse d'œuf (kg)",
        rangePadding: "None",
        minimum: 0,
        maximum: 40,
        interval: 5,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: {
          width: 2,
        },
        minorTickLines: { width: 0, color: "#E5890A" },
        titleStyle: {
          textAlignment: "Center",
          size: "12px",
          fontWeight: "bold",
          color: "#E5890A",
        },
        labelStyle: {
          color: "#E5890A",
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
      // height={"100%"}
      // title={`Masse d'œufs`}
      titleStyle={{
        textAlignment: "Center",
        size: "15px",
        fontWeight: "bold",
        color: "#994D1C",
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
          ColumnSeries,
        ]}
      />
      <AxesDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisC"
          opposedPosition={true}
          title="Massse d'œuf hebdomadaire(g)"
          titleStyle={{
            textAlignment: "Center",
            size: "12px",
            fontWeight: "bold",
            color: "#994D1C",
          }}
          labelStyle={{
            color: "#994D1C",
            size: "12px",
          }}
          majorGridLines={{ width: 0, color: "#000" }}
          minorTickLines={{ width: 0, color: "#994D1C" }}
          lineStyle={{ width: 1, color: "#994D1C" }}
          minimum={0}
          maximum={500}
          interval={50}
          // visible={show}
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
          minorTickLines={lines}
          lineStyle={{
            width: 0,
          }}
          majorTickLines={{
            width: 0,
          }}
          minimum={0}
          maximum={10}
          interval={0.25}
          visible={show}
        ></AxisDirective>
      </AxesDirective>
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data?.guide}
          xName="age"
          yName={"gMassSem"}
          name={show ? "Guide: Massse d'œuf" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#C7B7A3"
          opacity={0.5}
          type="Line"
          yAxisName="yAxisC"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"massSem"}
          name={show ? "Massse d'œuf" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#994D1C"
          type="Line"
          yAxisName="yAxisC"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.guide}
          xName="age"
          yName={"gMassCuml"}
          name={show ? "Guide: ∑ Massse d'œuf" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#F5CCA0"
          opacity={0.5}
          type="Line"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"massCuml"}
          name={show ? "∑ Massse d'œuf" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#E5890A"
          type="Line"
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
export default MassOeufChart;
