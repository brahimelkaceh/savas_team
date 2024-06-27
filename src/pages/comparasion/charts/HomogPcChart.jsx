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

const HomogPcChart = ({ code, i, show }) => {
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

  const lines = { width: 0 };
  const style = {
    " #chart0_ChartTitle": {
      color: "red !important",
    },
  };

  return (
    <ChartComponent
      id={`chart${i}`}
      style={style}
      primaryxAxis={{
        valueType: "Double",
        title: "Overs",
        labelFormat: "age",
      }}
      load={load.bind(this)}
      primaryYAxis={{
        labelFormat: "{value}%",
        title: "Homogénéité (%)",
        rangePadding: "None",
        minimum: 0,
        maximum: 100,
        interval: 10,
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        titleStyle: {
          textAlignment: "Center",
          size: "10px",
          fontWeight: "400",
          color: "rgba(48, 214, 48)",
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
      // title={`Poids corporel & Homogénéité ${code.lot} `}
      titleStyle={{
        textAlignment: "Center",
        size: "12px",
        fontWeight: "600",
        color: "#00668c",
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
          name="yAxis1"
          opposedPosition={true}
          title="Poids corporel (g)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
            color: "#00668c",
          }}
          majorGridLines={{ width: show ? 3 : 1 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{
            width: 1,
          }}
          minimum={0}
          maximum={2500}
          interval={250}
          labelFormat="{value}g"
        ></AxisDirective>
        <AxisDirective
          visible={show}
          rowIndex={0}
          name="yAxis2"
          opposedPosition={true}
          title=""
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
            color: "#00668c",
          }}
          labelStyle={{
            color: "transparent",
          }}
          majorGridLines={{ width: 1 }}
          minorTickLines={{ width: 0 }}
          majorTickLines={{ width: 0 }}
          lineStyle={{
            width: 0,
          }}
          minimum={0}
          maximum={2500}
          interval={25}
        ></AxisDirective>
      </AxesDirective>
      <SeriesCollectionDirective style={{ background: "red" }}>
        <SeriesDirective
          dataSource={code?.homog}
          xName="age"
          yName="homog"
          name={show ? "Homogénéité" : " "}
          width={1.5}
          border={{ width: show ? 1 : 0.5, color: "rgba(48, 214, 48)" }}
          fill="rgba(48, 214, 48, 0.2)"
          type="SplineArea"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code?.ages}
          xName="age"
          yName="g_pv"
          name={show ? "Guide : Poids corporel" : " "}
          width={show ? 5 : 2.5}
          fill="#7BD3EA"
          opacity={0.5}
          type="Line"
          yAxisName="yAxis1"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code?.pv}
          xName="age"
          yName="pv"
          name={show ? "Poids corporel" : " "}
          width={show ? 3 : 1.5}
          fill="#00668c"
          type="Line"
          yAxisName="yAxis1"
        ></SeriesDirective>

        <SeriesDirective
          dataSource={code?.ages}
          xName="age"
          yName="y"
          name=""
          type="Line"
          yAxisName="yAxis2"
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
export default HomogPcChart;
