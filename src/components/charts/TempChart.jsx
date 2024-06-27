/**
 * Sample for RangeColumn series
 */
import * as React from "react";
import { useEffect } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  RangeColumnSeries,
  Category,
  Tooltip,
  DataLabel,
  Highlight,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";
export let data = [
  { x: "Sun", low: 3.1, high: 10.8 },
  { x: "Mon", low: 5.7, high: 14.4 },
  { x: "Tue", low: 8.4, high: 16.9 },
  { x: "Wed", low: 9.6, high: 18.2 },
  { x: "Thu", low: 8.5, high: 16.1 },
  { x: "Fri", low: 6.0, high: 12.5 },
  { x: "Sat", low: 1.5, high: 6.9 },
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const TempChart = () => {
  const onChartLoad = (args) => {
    let chart = document.getElementById("charts");
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
  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section">
        <ChartComponent
          id="charts"
          style={{ textAlign: "center" }}
          primaryXAxis={{
            valueType: "Category",
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
          }}
          primaryYAxis={{
            labelFormat: "{value}˚C",
            maximum: 20,
            title: "Temperature (In Celsius)",
            edgeLabelPlacement: "Shift",
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
          }}
          title="Temperature Variation by Week"
          loaded={onChartLoad.bind(this)}
          load={load.bind(this)}
          chartArea={{ border: { width: 0 } }}
          width={Browser.isDevice ? "100%" : "75%"}
          tooltip={{
            enable: true,
            header: "<b>${point.x}</b>",
            format: "Temperature : <b>${point.low} - ${point.high}</b>",
          }}
        >
          <Inject
            services={[
              RangeColumnSeries,
              Tooltip,
              Category,
              DataLabel,
              Highlight,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={data}
              high="high"
              low="low"
              xName="x"
              columnSpacing={0.1}
              type="RangeColumn"
              marker={{ dataLabel: { visible: true, position: "Outer" } }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};
export default TempChart;
