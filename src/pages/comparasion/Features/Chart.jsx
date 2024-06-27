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
import { params } from "../components/ParamsSelected";
import { useTheme } from "@mui/material";

const Chart = ({ data, paramId }) => {
  const theme = useTheme();
  let display;
  return (
    <ChartComponent
      id={`chart`}
      primaryxAxis={{
        valueType: "Double",
        title: "Overs",
        labelFormat: "age",
      }}
      primaryYAxis={{
        maximum: 500,
        title: "title",
        interval: 50,
        rangePadding: "None",
        lineStyle: { width: 1 },
        majorTickLines: { width: 1 },
        minorTickLines: { width: 1 },
        titleStyle: {
          textAlignment: "Center",
          size: "10px",
          fontWeight: "400",
        },
        visible: false, // Set the visible property to false to disable the primaryYAxis
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
      title={"Courbe de comparaison"}
      titleStyle={{
        textAlignment: "Center",
        size: "18px",
        fontWeight: "600",
        color: "rgb(131, 53, 0)",
      }}
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
          opposedPosition={false}
          title=""
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          labelStyle={{
            color: "transparent",
          }}
          majorGridLines={{ width: 2 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={100}
          interval={10}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisA"
          opposedPosition={true}
          labelStyle={{
            color: "transparent",
          }}
          title=""
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0.5 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={100}
          interval={2.5}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis0"
          opposedPosition={false}
          title="Ponte (%)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 0 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={100}
          interval={5}
        ></AxisDirective>
        <AxisDirective
          rowIndex={1}
          name="yAxis1"
          opposedPosition={true}
          title="∑ NOPPD"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
            // color: "white",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 0 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={500}
          // visible={false}
          interval={50}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis2"
          opposedPosition={false}
          title="PMO (g)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 1 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={100}
          interval={10}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis3"
          opposedPosition={true}
          title="Blancs"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={15}
          interval={3}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis4"
          opposedPosition={true}
          title="Declassés"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={15}
          interval={3}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis5"
          opposedPosition={false}
          title="Mortalité / Semaine (%)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={1}
          interval={0.1}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis6"
          opposedPosition={true}
          title="∑ Mortalité / PD (%)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={15}
          interval={3}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis7"
          opposedPosition={false}
          title="Eau consommée (ml/j)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={300}
          interval={50}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis8"
          opposedPosition={false}
          title="Aliment consommé (g/j)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={150}
          interval={30}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis9"
          opposedPosition={true}
          title="∑ Aliment consommé (kg)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={150}
          interval={30}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis10"
          opposedPosition={false}
          title="Ratio (Eau/Alt)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={5}
          interval={0.5}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis11"
          opposedPosition={false}
          title="Homogénéité (%)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={100}
          dashArray="5,5"
          interval={10}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis12"
          opposedPosition={true}
          title="Poids corporel (g)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={2500}
          interval={500}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis13"
          opposedPosition={false}
          title="Masse d'oeuf hebdomadaire (g)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={500}
          interval={50}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis14"
          opposedPosition={true}
          title="∑ Masse Oeuf (kg)"
          titleStyle={{
            textAlignment: "Center",
            size: "10px",
            fontWeight: "400",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={35}
          interval={5}
        ></AxisDirective>
      </AxesDirective>

      <SeriesCollectionDirective>
        {data?.map((d) => {
          display = d?.data?.map((data, i) => {
            const paramName =
              params.find((param) => param.id === d.param)?.label || "Unknown";
            console.log(paramName);
            return (
              <SeriesDirective
                key={data?.bat}
                dataSource={data?.data}
                xName="age"
                yName={"value"}
                name={`${paramName}-( ${data.bat}-${data.site})`}
                width={0}
                marker={{
                  visible: true,
                  width: 7,
                  height: 7,
                  shape: "Circle",
                  isFilled: true,
                }}
                type="Spline"
                yAxisName={`yAxis${d?.param}`}
                // dashArray="5,5"
              ></SeriesDirective>
            );
          });
          return display;
        })}
        {data && (
          <SeriesDirective
            dataSource={data[0]}
            xName="age"
            yName="y"
            name=""
            width={3}
            marker={{
              visible: true,
              width: 7,
              height: 7,
              shape: "Circle",
              isFilled: true,
            }}
            type="Line"
            yAxisName={`yAxisA`}
          ></SeriesDirective>
        )}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
export default Chart;
