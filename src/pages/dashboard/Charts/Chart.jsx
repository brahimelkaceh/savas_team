/**
 * Sample for Synchronized Chart
 */
import * as React from "react";
import { useEffect } from "react";
import {
  AreaSeries,
  LineSeries,
  DateTime,
  DataLabel,
  Tooltip,
  Highlight,
  Crosshair,
  Zoom,
  Legend,
  Selection,
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  ColumnSeries,
  StepAreaSeries,
} from "@syncfusion/ej2-react-charts";
// import { data } from "./financial-data";
import { Browser } from "@syncfusion/ej2-base";
// import { data } from "./data/financial-data";

let SAMPLE_CSS = `
#control-container {
    padding: 1px !important;
}

.row {
    display: flex;
    margin: 0px;
}

.col {
    width: 50%;
    margin: 10px;
    height: 270px;
}`;
/**
 * Synchronized Chart Sample
 */
let Chart = ({ data }) => {
  console.log(data);
  let chart1;
  let chart2;
  let chart3;
  let chart4;
  let charts = [];
  useEffect(() => {
    charts = [chart1, chart2, chart3, chart4];
  }, [data]);
  let zoomFactor = 0;
  let zoomPosition = 0;
  let isZoom = false;
  let selectedData = [];
  let count = 0;
  let legendCount = 0;
  let load = (args) => {
    args.chart.primaryXAxis.labelRotation = Browser.isDevice ? -45 : 0;
    let selectedTheme = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.chart.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    )
      .replace(/-dark/i, "Dark")
      .replace(/contrast/i, "Contrast");
  };
  const onChartLoad = (args) => {
    let chart = document.getElementById("container1");
    chart.setAttribute("title", "");
  };
  const onChartLoad2 = (args) => {
    let chart = document.getElementById("container2");
    chart.setAttribute("title", "");
  };
  const onChartLoad3 = (args) => {
    let chart = document.getElementById("container3");
    chart.setAttribute("title", "");
  };
  const onChartLoad4 = (args) => {
    let chart = document.getElementById("container4");
    chart.setAttribute("title", "");
  };
  let zoomComplete = (args) => {
    if (args.axis.name === "primaryXAxis") {
      zoomFactor = args.currentZoomFactor;
      zoomPosition = args.currentZoomPosition;
      zoomCompleteFunction(args);
    }
  };
  let zoomCompleteFunction = (args) => {
    for (let i = 0; i < charts.length; i++) {
      if (args.axis.series[0].chart.element.id !== charts[i].element.id) {
        charts[i].primaryXAxis.zoomFactor = zoomFactor;
        charts[i].primaryXAxis.zoomPosition = zoomPosition;
        charts[i].zoomModule.isZoomed =
          args.axis.series[0].chart.zoomModule.isZoomed;
        charts[i].zoomModule.isPanning =
          args.axis.series[0].chart.zoomModule.isPanning;
      }
    }
  };
  let chartMouseLeave = (args) => {
    chart2.hideCrosshair();
    chart3.hideCrosshair();
    chart4.hideCrosshair();
    chart2.hideTooltip();
    chart3.hideTooltip();
    chart4.hideTooltip();
  };
  let chartMouseMove = (args) => {
    if (
      (!Browser.isDevice && !chart1.isTouch && !chart1.isChartDrag) ||
      chart1.startMove
    ) {
      chart2.startMove = chart3.startMove = chart4.startMove = chart1.startMove;
      chart2.showTooltip(args.x, args.y);
      chart3.showTooltip(args.x, args.y);
      chart4.showTooltip(args.x, args.y);
      chart2.showCrosshair(args.x, args.y);
      chart3.showCrosshair(args.x, args.y);
      chart4.showCrosshair(args.x, args.y);
    }
  };
  let chartobjMouseLeave = (args) => {
    chart1.hideCrosshair();
    chart3.hideCrosshair();
    chart4.hideCrosshair();
    chart1.hideTooltip();
    chart3.hideTooltip();
    chart4.hideTooltip();
  };
  let chartobjMouseMove = (args) => {
    if (
      (!Browser.isDevice && !chart2?.isTouch && !chart2.isChartDrag) ||
      chart2.startMove
    ) {
      chart1.startMove = chart3.startMove = chart4.startMove = chart2.startMove;
      chart1.showTooltip(args.x, args.y);
      chart3.showTooltip(args.x, args.y);
      chart4.showTooltip(args.x, args.y);
      chart1.showCrosshair(args.x, args.y);
      chart3.showCrosshair(args.x, args.y);
      chart4.showCrosshair(args.x, args.y);
    }
  };
  let chart3MouseLeave = (args) => {
    chart2.hideCrosshair();
    chart1.hideCrosshair();
    chart4.hideCrosshair();
    chart2.hideTooltip();
    chart1.hideTooltip();
    chart4.hideTooltip();
  };
  let chart3MouseMove = (args) => {
    if (
      (!Browser.isDevice && !chart3.isTouch && !chart3.isChartDrag) ||
      chart3.startMove
    ) {
      chart1.startMove = chart2.startMove = chart4.startMove = chart3.startMove;
      chart1.showTooltip(args.x, args.y);
      chart2.showTooltip(args.x, args.y);
      chart4.showTooltip(args.x, args.y);
      chart1.showCrosshair(args.x, args.y);
      chart2.showCrosshair(args.x, args.y);
      chart4.showCrosshair(args.x, args.y);
    }
  };
  let chart4MouseLeave = (args) => {
    chart2.hideCrosshair();
    chart3.hideCrosshair();
    chart1.hideCrosshair();
    chart2.hideTooltip();
    chart3.hideTooltip();
    chart1.hideTooltip();
  };
  let chart4MouseMove = (args) => {
    if (
      (!Browser.isDevice && !chart4.isTouch && !chart4.isChartDrag) ||
      chart4.startMove
    ) {
      chart1.startMove = chart2.startMove = chart3.startMove = chart4.startMove;
      chart1.showTooltip(args.x, args.y);
      chart2.showTooltip(args.x, args.y);
      chart3.showTooltip(args.x, args.y);
      chart1.showCrosshair(args.x, args.y);
      chart2.showCrosshair(args.x, args.y);
      chart3.showCrosshair(args.x, args.y);
    }
  };
  let chartMouseUp = (args) => {
    if (Browser.isDevice && chart1.startMove) {
      chart2.hideCrosshair();
      chart3.hideCrosshair();
      chart4.hideCrosshair();
      chart2.hideTooltip();
      chart3.hideTooltip();
      chart4.hideTooltip();
    }
  };
  let chart2MouseUp = (args) => {
    if (Browser.isDevice && chart2.startMove) {
      chart1.hideCrosshair();
      chart3.hideCrosshair();
      chart4.hideCrosshair();
      chart1.hideTooltip();
      chart3.hideTooltip();
      chart4.hideTooltip();
    }
  };
  let chart3MouseUp = (args) => {
    if (Browser.isDevice && chart3.startMove) {
      chart2.hideCrosshair();
      chart1.hideCrosshair();
      chart4.hideCrosshair();
      chart2.hideTooltip();
      chart1.hideTooltip();
      chart4.hideTooltip();
    }
  };
  let chart4MouseUp = (args) => {
    if (Browser.isDevice && chart4.startMove) {
      chart2.hideCrosshair();
      chart3.hideCrosshair();
      chart1.hideCrosshair();
      chart2.hideTooltip();
      chart3.hideTooltip();
      chart1.hideTooltip();
    }
  };
  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section">
        <div className="row" style={{ margin: 0 }}>
          <div className="col">
            <ChartComponent
              id="container1"
              ref={(chart) => (chart1 = chart)}
              style={{ textAlign: "center" }}
              primaryXAxis={{
                valueType: "DateTime",
                labelFormat: "dd/MM/yy",
                lineStyle: { width: 0 },
                majorGridLines: { width: 0 },
              }}
              primaryYAxis={{
                labelFormat: "n2",
                majorTickLines: { width: 0 },
                lineStyle: { width: 0 },
              }}
              chartArea={{ border: { width: 0 } }}
              zoomSettings={{
                enableMouseWheelZooming: true,
                enablePinchZooming: true,
                enableScrollbar: false,
                enableDeferredZooming: false,
                enablePan: true,
                mode: "X",
                toolbarItems: ["Pan", "Reset"],
              }}
              zoomComplete={zoomComplete.bind(this)}
              chartMouseLeave={chartMouseLeave.bind(this)}
              chartMouseMove={chartMouseMove.bind(this)}
              chartMouseUp={chartMouseUp.bind(this)}
              load={load.bind(this)}
              loaded={onChartLoad.bind(this)}
              titleStyle={{ textAlignment: "Near" }}
              tooltip={{
                enable: true,
                fadeOutDuration: Browser.isDevice ? 2500 : 1000,
                shared: true,
                header: "",
                format: "<b>${point.y}</b><br>${point.x} ",
                enableMarker: false,
              }}
              crosshair={{
                enable: true,
                lineType: "Vertical",
                dashArray: "2,2",
              }}
              title="Production"
            >
              <Inject
                services={[
                  AreaSeries,
                  LineSeries,
                  DataLabel,
                  DateTime,
                  Tooltip,
                  Zoom,
                  Highlight,
                  Legend,
                  Selection,
                  Crosshair,
                ]}
              />
              <SeriesCollectionDirective>
                <SeriesDirective
                  type="Area"
                  dataSource={data}
                  xName="date"
                  yName="production"
                  fill="#BA704F"
                  opacity={0.5}
                  width={2}
                  border={{ width: 2, color: "#BA704F" }}
                ></SeriesDirective>
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
          <div className="col">
            <ChartComponent
              id="container2"
              ref={(chart) => (chart2 = chart)}
              style={{ textAlign: "center" }}
              primaryXAxis={{
                valueType: "DateTime",
                labelFormat: "dd/MM/yy",
                lineStyle: { width: 0 },
                majorGridLines: { width: 0 },
              }}
              primaryYAxis={{
                labelFormat: "{value}",
                majorTickLines: { width: 0 },
                lineStyle: { width: 0 },
                labelPadding: 8,
              }}
              chartArea={{ border: { width: 0 } }}
              zoomSettings={{
                enableMouseWheelZooming: true,
                enablePinchZooming: true,
                enableScrollbar: false,
                enableDeferredZooming: false,
                enablePan: true,
                mode: "X",
                toolbarItems: ["Pan", "Reset"],
              }}
              zoomComplete={zoomComplete.bind(this)}
              chartMouseLeave={chartobjMouseLeave.bind(this)}
              chartMouseMove={chartobjMouseMove.bind(this)}
              chartMouseUp={chart2MouseUp.bind(this)}
              load={load.bind(this)}
              loaded={onChartLoad2.bind(this)}
              titleStyle={{ textAlignment: "Near" }}
              tooltip={{
                enable: true,
                fadeOutDuration: Browser.isDevice ? 2500 : 1000,
                shared: true,
                header: "",
                format: "<b>${point.y}</b><br>${point.x} ",
                enableMarker: false,
              }}
              crosshair={{
                enable: true,
                lineType: "Vertical",
                dashArray: "2,2",
              }}
              title="Mortalité"
            >
              <Inject
                services={[
                  AreaSeries,
                  LineSeries,
                  DataLabel,
                  DateTime,
                  Tooltip,
                  Zoom,
                  Highlight,
                  Legend,
                  Selection,
                  Crosshair,
                ]}
              />
              <SeriesCollectionDirective>
                <SeriesDirective
                  type="Area"
                  dataSource={data}
                  xName="date"
                  yName="mort"
                  fill="#F48FB1"
                  opacity={0.6}
                  width={2}
                  border={{ width: 2, color: "#C70039" }}
                ></SeriesDirective>
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        </div>
        <div className="row" style={{ margin: 0 }}>
          <div className="col">
            <ChartComponent
              id="container3"
              ref={(chart) => (chart3 = chart)}
              style={{ textAlign: "center" }}
              primaryXAxis={{
                valueType: "DateTime",
                labelFormat: "dd/MM/yy",
                lineStyle: { width: 0 },
                majorGridLines: { width: 0 },
              }}
              primaryYAxis={{
                labelFormat: "n3",
                majorTickLines: { width: 0 },
                lineStyle: { width: 0 },
                maximum: 0.25,
              }}
              chartArea={{ border: { width: 0 } }}
              zoomSettings={{
                enableMouseWheelZooming: true,
                enablePinchZooming: true,
                enableScrollbar: false,
                enableDeferredZooming: false,
                enablePan: true,
                mode: "X",
                toolbarItems: ["Pan", "Reset"],
              }}
              zoomComplete={zoomComplete.bind(this)}
              chartMouseLeave={chart3MouseLeave.bind(this)}
              chartMouseMove={chart3MouseMove.bind(this)}
              chartMouseUp={chart3MouseUp.bind(this)}
              load={load.bind(this)}
              loaded={onChartLoad3.bind(this)}
              titleStyle={{ textAlignment: "Near" }}
              tooltip={{
                enable: true,
                fadeOutDuration: Browser.isDevice ? 2500 : 1000,
                shared: true,
                header: "",
                format: "<b>${point.y}</b><br>${point.x} ",
                enableMarker: false,
              }}
              crosshair={{
                enable: true,
                lineType: "Vertical",
                dashArray: "2,2",
              }}
              title="Aliment par Oeuf"
            >
              <Inject
                services={[
                  AreaSeries,
                  LineSeries,
                  DataLabel,
                  DateTime,
                  Tooltip,
                  Zoom,
                  Highlight,
                  Legend,
                  Selection,
                  Crosshair,
                ]}
              />
              <SeriesCollectionDirective>
                <SeriesDirective
                  type="Area"
                  dataSource={data}
                  xName="date"
                  yName="apo"
                  fill="#557C55"
                  opacity={0.6}
                  width={2}
                  border={{ width: 2 }}
                ></SeriesDirective>
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
          <div className="col">
            <ChartComponent
              id="container4"
              ref={(chart) => (chart4 = chart)}
              style={{ textAlign: "center" }}
              primaryXAxis={{
                valueType: "DateTime",
                labelFormat: "dd/MM/yy",
                lineStyle: { width: 0 },
                majorGridLines: { width: 0 },
              }}
              primaryYAxis={{
                labelFormat: "n1",
                majorTickLines: { width: 0 },
                lineStyle: { width: 0 },
              }}
              chartArea={{ border: { width: 0 } }}
              zoomSettings={{
                enableMouseWheelZooming: true,
                enablePinchZooming: true,
                enableScrollbar: false,
                enableDeferredZooming: false,
                enablePan: true,
                mode: "X",
                toolbarItems: ["Pan", "Reset"],
              }}
              zoomComplete={zoomComplete.bind(this)}
              chartMouseLeave={chart4MouseLeave.bind(this)}
              chartMouseMove={chart4MouseMove.bind(this)}
              chartMouseUp={chart4MouseUp.bind(this)}
              load={load.bind(this)}
              loaded={onChartLoad4.bind(this)}
              titleStyle={{ textAlignment: "Near" }}
              tooltip={{
                enable: true,
                fadeOutDuration: Browser.isDevice ? 2500 : 1000,
                shared: true,
                header: "",
                format: "<b>${point.y} </b><br>${point.x} ",
                enableMarker: false,
              }}
              crosshair={{
                enable: true,
                lineType: "Vertical",
                dashArray: "2,2",
              }}
              title="Consommation"
            >
              <Inject
                services={[
                  AreaSeries,
                  StepAreaSeries,
                  ColumnSeries,
                  LineSeries,
                  DataLabel,
                  DateTime,
                  Tooltip,
                  Zoom,
                  Highlight,
                  Legend,
                  Selection,
                  Crosshair,
                ]}
              />
              <SeriesCollectionDirective>
                <SeriesDirective
                  type="StepArea"
                  dataSource={data}
                  xName="date"
                  yName="alt"
                  opacity={0.6}
                  width={2}
                  fill="#61bc84"
                  border={{ width: 1 }}
                ></SeriesDirective>
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chart;
function componentDidMount() {
  throw new Error("Function not implemented.");
}
