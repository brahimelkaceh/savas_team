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

const ConsoChart = ({ data, show }) => {
  console.log("conso data", data);
  const onChartLoad = (args) => {
    let chart = document.getElementById(`chart_conso`);
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
      id={`chart_conso`}
      // style={{ textAlign: "center" }}
      style={style}
      primaryxAxis={{
        valueType: "Double",
        title: "Overs",
        labelFormat: "age",
      }}
      // load={load.bind(this)}
      primaryYAxis={{
        title: "Eau Consommée (ml/j)",
        rangePadding: "None",
        minimum: 0,
        maximum: 280,
        interval: 25,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: {
          width: 2,
        },
        minorTickLines: { width: 0, color: "#86A7FC" },
        titleStyle: {
          textAlignment: "Center",
          size: "12px",
          fontWeight: "bold",
          color: "#86A7FC",
        },
        labelStyle: {
          color: "#86A7FC",
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
      // title={`Consommation (Aliment & Eau)`}
      titleStyle={{
        textAlignment: "Center",
        size: "15px",
        fontWeight: "600",
        color: "#50623A",
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
          opposedPosition={false}
          title="Aliment / sujet"
          titleStyle={{
            textAlignment: "Center",
            size: "12px",
            fontWeight: "500",
            color: "#557C55",
          }}
          labelStyle={{
            color: "#557C55",
            size: "12px",
          }}
          majorGridLines={{ width: 0, color: "#557C55" }}
          minorTickLines={{ width: 1, color: "#557C55" }}
          lineStyle={{ width: 1, color: "#557C55" }}
          minimum={0}
          maximum={180}
          interval={20}
          visible={show}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisC"
          opposedPosition={true}
          title="∑ Aliment consommée (kg)"
          titleStyle={{
            textAlignment: "Center",
            size: "12px",
            fontWeight: "500",
            color: "#557C55",
          }}
          labelStyle={{
            color: "#557C55",
            size: "12px",
          }}
          majorGridLines={{ width: 0, color: "#557C55" }}
          minorTickLines={{ width: 1, color: "#557C55" }}
          lineStyle={{ width: 1, color: "#557C55" }}
          minimum={0}
          maximum={70}
          interval={10}
          // visible={show}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisD"
          opposedPosition={true}
          title="Ratio (Eau/alt)"
          titleStyle={{
            textAlignment: "Center",
            size: "12px",
            fontWeight: "500",
            color: "#525CEB",
          }}
          labelStyle={{
            color: "#525CEB",
            size: "12px",
          }}
          majorGridLines={{ width: 0, color: "#525CEB" }}
          minorTickLines={{ width: 1, color: "#525CEB" }}
          lineStyle={{ width: 1, color: "#525CEB" }}
          minimum={0}
          maximum={10}
          interval={1}
          visible={show}
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
          majorGridLines={{ width: 1 }}
          minorTickLines={{ width: 0 }}
          lineStyle={{
            width: 0,
          }}
          majorTickLines={{ width: 0 }}
          minimum={0}
          maximum={280}
          interval={5}
          visible={show}
        ></AxisDirective>
      </AxesDirective>
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"ratio"}
          name={show ? "Ratio" : " "}
          width={3.5}
          dashArray="5,5"
          border={{ width: 1, color: "#B4D4FF" }}
          fill="#B4D4FF"
          opacity={0.5}
          type="Area"
          yAxisName="yAxisD"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"eps"}
          name={show ? "Eau" : " "}
          width={show ? 3.5 : 2.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          dashArray={show ? "8,5" : "4,4"}
          fill="#86A7FC"
          type="Line"
          yAxisName="yAxisA"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"aps"}
          name={show ? "Aliment / sujet" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#557C55"
          type="Line"
          yAxisName="yAxisB"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.guide}
          xName="G_age"
          yName={"G_aps"}
          name={show ? "Guide: Aliment / sujet" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#557C55"
          opacity={0.5}
          type="Line"
          yAxisName="yAxisB"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={data?.reel}
          xName="age"
          yName={"apsCuml"}
          name={show ? "∑ Aliment / sujet" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#7A9D54"
          type="Line"
          yAxisName="yAxisC"
        ></SeriesDirective>

        <SeriesDirective
          dataSource={data?.guide}
          xName="G_age"
          yName={"G_altCumlPD"}
          name={show ? "Guide: ∑ Aliment / sujet" : " "}
          width={3.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#7A9D54"
          opacity={0.5}
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
export default ConsoChart;
