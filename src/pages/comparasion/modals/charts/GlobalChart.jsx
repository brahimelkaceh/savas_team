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

const findSmallestValue = (arr) => {
  if (!arr.length) {
    return null; // Return null for an empty array
  }

  let smallest = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < smallest) {
      smallest = arr[i];
    }
  }

  return smallest;
};
const GlobalChart = ({ data, i = 1, param }) => {
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

  const style = {
    " #chart0_ChartTitle": {
      color: "red !important",
      height: "100% !important",
    },
  };

  let title;
  let max;
  let step;

  switch (param) {
    case 0:
      title = "Ponte %";
      max = null;
      step = null;
      break;
    case 1:
      title = "∑ NOPPD";
      max = null;
      step = 25;
      break;
    case 2:
      title = "PMO (g)";
      max = null;
      step = 10;
      break;
    case 3:
      title = "Blancs";
      max = 10;
      step = 1;
      break;
    case 4:
      title = "Declassés";
      max = 20;
      step = 2;
      break;
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
        maximum: null,
        minimum: null,
        title: title,
        interval: null,
        rangePadding: "None",
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 0 },
        minorTickLines: { width: 0 },
        titleStyle: {
          textAlignment: "Center",
          size: "15px",
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
      title={title}
      titleStyle={{
        textAlignment: "Center",
        size: "17px",
        fontWeight: "600",
        color: "rgb(131, 53, 0)",
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
            size: "10px",
            fontWeight: "400",
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
          console.log(d?.pmo);
          let display;
          switch (param) {
            case 0:
              display = (
                <SeriesDirective
                  dataSource={d?.ponte}
                  xName="age"
                  yName={"ponte"}
                  name={d.lot}
                  width={3}
                  marker={{
                    visible: false,
                    width: 7,
                    height: 7,
                    shape: "Circle",
                    isFilled: true,
                  }}
                  border={{
                    width: 2,
                  }}
                  type="Line"
                ></SeriesDirective>
              );
              break;
            case 1:
              display = (
                <SeriesDirective
                  dataSource={d?.noppd_cuml}
                  xName="age"
                  yName={"noppd_cuml"}
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
                  dataSource={d?.pmo}
                  xName="age"
                  yName={"pmo"}
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
                  dataSource={d?.blancs}
                  xName="age"
                  yName={"blanc"}
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
export default GlobalChart;
