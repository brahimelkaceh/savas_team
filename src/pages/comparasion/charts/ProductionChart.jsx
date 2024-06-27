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
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";

const ProductionChart = ({ code, i, show }) => {
  console.log(code);
  const style = {
    " #chart0_ChartTitle": {
      color: "red !important",
    },
  };

  return (
    <ChartComponent
      id={`chart${i}`}
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
        majorTickLines: { width: 1 },
        minorTickLines: { width: 0 },
        majorGridLines: {
          width: show ? 0 : 2,
        },
        titleStyle: {
          textAlignment: "Center",
          size: "10px",
          fontWeight: "400",
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
      height={Browser.isDevice ? "100%" : "100%"}
      // title={`Production œufs ${code.lot} `}
      titleStyle={{
        textAlignment: "Center",
        size: "12px",
        fontWeight: "600",
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
        ]}
      />
      <AxesDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis1"
          opposedPosition={true}
          title="Declassés (%)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 1, color: "#F39F5A" }}
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
          name="yAxis2"
          opposedPosition={true}
          title="∑ NOPPD"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
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
          majorGridLines={{ width: 1 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{
            width: 0,
          }}
          majorTickLines={{
            width: 0,
          }}
          minimum={0}
          maximum={100}
          interval={2.5}
          visible={show}
        ></AxisDirective>
      </AxesDirective>
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={code?.ages}
          xName="age"
          yName="g_ponte"
          name={show ? "Guide: Ponte (%)" : " "}
          width={show ? 5 : 2}
          fill="#F7B787"
          opacity={0.6}
          type="Line"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code?.ponte}
          xName="age"
          yName="ponte"
          name={show ? "Ponte (%)" : " "}
          width={show ? 3 : 1.5}
          fill="rgb(131, 53, 0)"
          type="Line"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code?.ages}
          xName="age"
          yName="g_pmo"
          name={show ? "Guide: PMO (g)" : " "}
          width={show ? 5 : 2}
          fill="#D6D46D"
          opacity={0.6}
          type="Line"
          yAxisName="yAxisA"
        ></SeriesDirective>

        <SeriesDirective
          dataSource={code?.pmo}
          xName="age"
          yName="pmo"
          name={show ? "PMO (g)" : " "}
          width={show ? 3 : 1.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#FFD93D"
          type="Line"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code.noppd_cuml}
          xName="age"
          yName="noppd_cuml"
          name={show ? "∑ NOPPD" : " "}
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          marker={{
            visible: false,
            isFilled: true,
            height: 0,
            width: 0,
          }}
          type="Line"
          fill="#FF8400"
          width={show ? 3 : 1.5}
          border={{ width: 1 }}
          yAxisName="yAxis2"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code.ages}
          xName="age"
          yName="g_nopppcuml"
          name={show ? "Guide: ∑ NOPPD" : " "}
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          type="Line"
          opacity={0.5}
          fill="#FF8400"
          width={show ? 6 : 3}
          border={{ width: 1 }}
          yAxisName="yAxis2"
        ></SeriesDirective>

        <SeriesDirective
          dataSource={code.declass}
          xName="age"
          yName="declasse"
          name={show ? "Declassé" : " "}
          marker={{
            visible: false,
            isFilled: true,
            height: 0,
            width: 0,
          }}
          // opacity={0.9}
          type="SplineArea"
          width={show ? 3 : 1}
          border={{ width: show ? 2 : 1, color: "#E08E6D" }}
          fill="#fce3dc"
          yAxisName="yAxis1"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code.blancs}
          xName="age"
          yName="blanc"
          // color="#F58869a4"
          name={show ? "Blanc" : " "}
          fill="#F58869a4"
          opacity={0.5}
          type="SplineArea"
          width={1}
          border={{ width: show ? 2 : 1 }}
          yAxisName="yAxis1"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code?.ages}
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
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
export default ProductionChart;
