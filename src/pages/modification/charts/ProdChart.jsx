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

const ProductionChart = ({ data, show }) => {
  const onChartLoad = (args) => {
    let chart = document.getElementById(`chart`);
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
      id={`chart`}
      // style={{ textAlign: "center" }}
      style={style}
      primaryxAxis={{
        valueType: "Double",
        title: "Overs",
        labelFormat: "age",
      }}
      // load={load.bind(this)}
      primaryYAxis={{
        title: "Ponte %",
        labelFormat: "{value}%",
        rangePadding: "None",
        minimum: 0,
        maximum: 110,
        interval: 10,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: {
          width: show ? 0 : 2,
        },
        minorTickLines: { width: 0, color: "#834218" },
        titleStyle: {
          textAlignment: "Center",
          size: "12px",
          fontWeight: "bold",
          color: "#834218",
        },
        labelStyle: {
          color: "#834218",
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
      title={``}
      titleStyle={{
        textAlignment: "Center",
        size: "15px",
        fontWeight: "bold",
        color: "rgb(131, 53, 0)",
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
          name="yAxisB"
          opposedPosition={true}
          title="∑ NOPPD"
          titleStyle={{
            textAlignment: "Center",
            size: "12px",
            fontWeight: "bold",
            color: "#E48F45",
          }}
          labelStyle={{
            color: "#E48F45",
            size: "12px",
          }}
          majorGridLines={{ width: 0, color: "#E48F45" }}
          minorTickLines={{ width: 1, color: "#E48F45" }}
          lineStyle={{ width: 1, color: "#E48F45" }}
          minimum={null}
          maximum={null}
          interval={null}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisC"
          opposedPosition={true}
          title="Déclassées"
          titleStyle={{
            textAlignment: "Center",
            size: "12px",
            fontWeight: "bold",
            color: "#F39F5A",
          }}
          labelStyle={{
            color: "#F39F5A",
            size: "12px",
          }}
          majorGridLines={{ width: 0, color: "#F39F5A" }}
          minorTickLines={{ width: 1, color: "#F39F5A" }}
          lineStyle={{ width: 1, color: "#F39F5A" }}
          minimum={0}
          maximum={15}
          interval={1.5}
          visible={show}
          labelFormat="{value}%"
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisA"
          opposedPosition={true}
          title=""
          titleStyle={{
            textAlignment: "Center",
            size: "12px",
            fontWeight: "bold",
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
          maximum={100}
          interval={2.5}
          labelFormat="{value}g"
          visible={show}
        ></AxisDirective>
      </AxesDirective>
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data?.guide}
          xName="age"
          yName={"G_ponte"}
          name={show ? "Guide: Ponte (%)" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#FFA447"
          opacity={0.5}
          type="Line"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"ponte"}
          name={show ? "Ponte (%)" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#834218"
          type="Line"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.guide}
          xName="age"
          yName={"G_pmo"}
          name={show ? "Guide: PMO (g)" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#C7B7A3"
          opacity={0.8}
          type="Line"
          yAxisName="yAxisA"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"pmo"}
          name={show ? "PMO (g)" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#D3A41C"
          type="Line"
          yAxisName="yAxisA"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.guide}
          xName="age"
          yName={"G_noppdCuml"}
          name={show ? "Guide: ∑ NOPPD" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#F0DBAF"
          opacity={0.8}
          type="Line"
          yAxisName="yAxisB"
        ></SeriesDirective>

        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"noppdCuml"}
          name={show ? "∑ NOPPD" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#E48F45"
          type="Line"
          yAxisName="yAxisB"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"declasse"}
          name={show ? "Déclassées (%)" : " "}
          width={1}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#F39F5A"
          border={{
            width: 2,
            color: "#F39F5A",
          }}
          opacity={0.3}
          type="Area"
          yAxisName="yAxisC"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"blancs"}
          name={show ? "Blancs (%)" : " "}
          width={1}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#F39F5A"
          type="Area"
          yAxisName={"yAxisC"}
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
export default ProductionChart;
