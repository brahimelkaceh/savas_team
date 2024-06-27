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

const ConsommationChart = ({ code, i, show }) => {
  const onChartLoad = (args) => {
    let chart = document.getElementById(`chart${i}`);
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

  const style = {
    " #chart0_ChartTitle": {
      color: "red !important",
    },
  };

  // console.log(code.eps);
  const maxEpsValue = code?.eps?.reduce((max, obj) =>
    obj.eps > max.eps ? obj : max
  );

  return (
    <ChartComponent
      id={`chart${i}`}
      // style={{ textAlign: "center" }}
      style={style}
      load={load.bind(this)}
      primaryYAxis={{
        title: "Eau consommée (ml/j)",
        rangePadding: "None",
        minimum: 0,
        maximum: maxEpsValue?.eps + 50,
        interval: 80,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        majorGridLines: { width: 0 },
        titleStyle: {
          textAlignment: "Center",
          size: "10px",
          fontWeight: "bold",
          color: "#83A2FF",
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
      // title={`Consommation : ${code.lot} `}
      titleStyle={{
        textAlignment: "Center",
        size: "12px",
        fontWeight: "600",
        color: "#008000",
      }}
      loaded={onChartLoad.bind(this)}
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
          name="yAxis2"
          opposedPosition={false}
          title="Aliment consommé (g/j)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "bold",
            color: "#17594A",
          }}
          majorGridLines={{ width: show ? 0 : 1 }}
          minorTickLines={{ width: 0 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={200}
          interval={30}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis3"
          opposedPosition={true}
          title="∑ Aliment consommé (kg)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
            color: "#008000",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 0 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={150}
          interval={30}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis4"
          opposedPosition={true}
          title="Ratio (Eau/Alt)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
            color: "#97e0ff",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 0 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={10}
          interval={2}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          visible={show}
          name="yAxis5"
          opposedPosition={true}
          title=""
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
            color: "#97e0ff",
          }}
          labelStyle={{
            color: "transparent",
          }}
          majorGridLines={{ width: 1 }}
          minorTickLines={{ width: 0 }}
          lineStyle={{ width: 0 }}
          majorTickLines={{ width: 0 }}
          minimum={0}
          maximum={100}
          interval={1.5}
        ></AxisDirective>
      </AxesDirective>
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={code?.ratio}
          xName="age"
          yName="ratio"
          name={show ? "Ratio Eau/Aliment" : " "}
          width={show ? 3 : 1.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          border={{ width: 1, color: "#97e000" }}
          fill="#97e0ff"
          type="SplineArea"
          opacity={0.5}
          yAxisName="yAxis4"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code?.eps}
          xName="age"
          yName="eps"
          name={show ? "Eau" : " "}
          width={show ? 3 : 1.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#83A2FF"
          type="Line"
        ></SeriesDirective>

        <SeriesDirective
          dataSource={code?.aps}
          xName="age"
          yName="aps"
          name={show ? "Aliment/sujet" : " "}
          width={show ? 3 : 1.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#17594A"
          type="Line"
          yAxisName="yAxis2"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code?.ages}
          xName="age"
          yName="g_aps"
          name={show ? "Guide : Aliment/sujet" : " "}
          width={show ? 5 : 2.5}
          fill="#597E52"
          opacity={0.5}
          type="Line"
          yAxisName="yAxis2"
        ></SeriesDirective>

        <SeriesDirective
          dataSource={code?.aps_cuml}
          xName="age"
          yName="aps_cuml"
          name={show ? "∑ Aliment/sujet" : " "}
          width={show ? 3 : 1.5}
          marker={{
            visible: false,
            width: 7,
            height: 7,
            shape: "Circle",
            isFilled: true,
          }}
          fill="#008000"
          type="Line"
          yAxisName="yAxis3"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code?.ages}
          xName="age"
          yName="g_apscuml"
          name={show ? "Guide : ∑ Aliment/sujet" : " "}
          width={show ? 3 : 1.5}
          fill="#88AB8E"
          type="Line"
          yAxisName="yAxis3"
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
          yAxisName="yAxis5"
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
export default ConsommationChart;
