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

const HomogPcChart = ({ data, param }) => {
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
      title = "Homogénéité (%)";
      max = null;
      step = null;
      break;
    case 1:
      title = "Poids corporel (g)";
      max = null;
      step = null;
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
        title: title,
        rangePadding: "None",
        lineStyle: { width: 0 },
        majorTickLines: { width: 2 },
        minorTickLines: { width: 0 },
        majorGridLines: { width: 0 },
        maximum: max,
        interval: step,
        minimum: null,
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
      title={title}
      titleStyle={{
        textAlignment: "Center",
        size: "17px",
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
          let display;
          switch (param) {
            case 0:
              display = (
                <SeriesDirective
                  dataSource={d?.homog}
                  xName="age"
                  yName={"homog"}
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
                  dataSource={d?.pv}
                  xName="age"
                  yName={"pv"}
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
export default HomogPcChart;
