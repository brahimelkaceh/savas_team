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

const MortaliteChart = ({ code, i, show }) => {
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
      primaryYAxis={{
        title: "∑ % Mortalité PD",
        labelFormat: `{value}%`,
        // rangePadding: "None",
        opposedPosition: true,
        minimum: null,
        maximum: null,
        interval: null,
        lineStyle: { width: 1 },
        majorTickLines: { width: 1 },
        majorGridLines: {
          width: 1,
        },
        minorTickLines: { width: 0, color: "#79AC78" },
        titleStyle: {
          textAlignment: "Center",
          size: "12px",
          fontWeight: "bold",
          color: "#79AC78",
        },
        labelStyle: {
          color: "#79AC78",
          size: "11px",
        },
      }}
      load={load.bind(this)}
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
      // title={`Mortalité ${code.lot} `}
      titleStyle={{
        textAlignment: "Center",
        size: "12px",
        fontWeight: "600",
        color: "rgba(255, 99, 132)",
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
          name="yAxisB"
          opposedPosition={false}
          title="Mortalité / Semaine (%)"
          titleStyle={{
            textAlignment: "Center",
            size: "12px",
            fontWeight: "500",
            color: "#F48FB1",
          }}
          majorGridLines={{
            width: 0,
          }}
          minorTickLines={{
            width: 1,
          }}
          lineStyle={{
            width: 1,
          }}
          majorTickLines={{
            width: 1,
          }}
          minimum={null}
          maximum={null}
          interval={null}
          // visible={show}
          labelFormat="n2"
        ></AxisDirective>
      </AxesDirective>
      <SeriesCollectionDirective style={{ background: "red" }}>
        <SeriesDirective
          dataSource={code?.mort_sem}
          xName="age"
          yName="mort_sem"
          name={show ? "% Mortalité / Semaine" : " "}
          width={show ? 3 : 1.5}
          fill="rgba(255, 99, 132)"
          type="Line"
          yAxisName="yAxisB"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code?.mort_cuml}
          xName="age"
          yName="mort_sem"
          name={show ? "∑ % moratilité PD" : " "}
          width={show ? 3 : 1.5}
          fill="#005B41"
          type="Line"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code?.ages}
          xName="age"
          yName="g_mortCuml"
          name={show ? "Guide : ∑ % moratilité PD" : " "}
          width={show ? 5 : 2.5}
          fill="#005B41"
          opacity={0.3}
          type="Line"
          // yAxisName="yAxisB"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={code?.ages}
          xName="age"
          yName="y"
          name=""
          width={1.5}
          type="Line"
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
export default MortaliteChart;
