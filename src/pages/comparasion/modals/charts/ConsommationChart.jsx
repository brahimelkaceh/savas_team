/**
 * Sample for Line Series
 */
import * as React from "react";
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
  DataLabel,
  SplineSeries,
  SplineAreaSeries,
  AxisDirective,
  AxesDirective,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";

const ConsommationChart = ({ data, param }) => {
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
    " #chart0_ChartTitle": {
      color: "red !important",
      height: "100% !important",
    },
  };
  let title;
  let max;
  let min;
  let step;
  switch (param) {
    case 0:
      title = "Eau consommée (ml/j)";
      max = 300;
      min = 0;
      step = 20;
      break;
    case 1:
      title = "Aliment consommé (g/j)";
      max = 150;
      min = 0;
      step = 10;

      break;
    case 2:
      title = "∑ Aliment consommé (kg)";
      max = 1;
      min = 0;
      break;
    case 3:
      title = "Ratio (Eau/Alt)";
      max = 3;
      step = 0.2;
      min = 0;
    default:
      break;
  }

  return (
    <ChartComponent
      id={`chart`}
      style={style}
      primaryxAxis={{
        valueType: "Double",
        title: "Overs",
        labelFormat: "age",
      }}
      load={load.bind(this)}
      primaryYAxis={{
        title: title,
        rangePadding: "None",
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        majorGridLines: { width: 0 },
        maximum: null,
        minimum: null,
        interval: null,
        titleStyle: {
          textAlignment: "Center",
          size: "12px",
          fontWeight: "bold",
          color: "#008000",
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
      title={title}
      titleStyle={{
        textAlignment: "Center",
        size: "17px",
        fontWeight: "bold",
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
          SplineSeries,
        ]}
      />
      <AxesDirective>
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
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={100}
          interval={2.5}
        ></AxisDirective>
      </AxesDirective>
      <SeriesCollectionDirective>
        {data?.map((d) => {
          let display;
          switch (param) {
            case 0:
              display = (
                <SeriesDirective
                  dataSource={d?.eps}
                  xName="age"
                  yName={"eps"}
                  name={d.lot}
                  width={3}
                  marker={{
                    visible: false,
                    width: 7,
                    height: 7,
                    shape: "Circle",
                    isFilled: true,
                  }}
                  type="Spline"
                ></SeriesDirective>
              );
              break;
            case 1:
              display = (
                <SeriesDirective
                  dataSource={d?.aps}
                  xName="age"
                  yName={"aps"}
                  name={d.lot}
                  width={3}
                  marker={{
                    visible: false,
                    width: 7,
                    height: 7,
                    shape: "Circle",
                    isFilled: true,
                  }}
                  type="Spline"
                ></SeriesDirective>
              );
              break;
            case 2:
              display = (
                <SeriesDirective
                  dataSource={d?.aps_cuml}
                  xName="age"
                  yName={"aps_cuml"}
                  name={d.lot}
                  width={3}
                  marker={{
                    visible: false,
                    width: 7,
                    height: 7,
                    shape: "Circle",
                    isFilled: true,
                  }}
                  type="Spline"
                ></SeriesDirective>
              );
              break;
            case 3:
              display = (
                <SeriesDirective
                  dataSource={d?.ratio}
                  xName="age"
                  yName={"ratio"}
                  name={d.lot}
                  width={3}
                  marker={{
                    visible: false,
                    width: 7,
                    height: 7,
                    shape: "Circle",
                    isFilled: true,
                  }}
                  type="Spline"
                ></SeriesDirective>
              );
              break;
            case 4:
              display = (
                <SeriesDirective
                  dataSource={d?.declass}
                  xName="age"
                  yName={"declasse"}
                  name={d.lot}
                  width={3}
                  marker={{
                    visible: false,
                    width: 7,
                    height: 7,
                    shape: "Circle",
                    isFilled: true,
                  }}
                  type="Spline"
                ></SeriesDirective>
              );

            default:
              break;
          }

          return display;
        })}
        {data && (
          <SeriesDirective
            dataSource={data[0]?.ages}
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
        )}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
export default ConsommationChart;
