/**
 * Sample for Line Series
 */
import * as React from 'react';
import { useEffect } from 'react';
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
  SplineAreaSeries
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { params } from './components/ParamSelected';
import { useTheme } from '@mui/material';

const Chart = ({ data, paramId }) => {
  const theme = useTheme();
  const legendSettings = {
    visible: true,
    textStyle: { color: theme.palette.text.primary }
  };
  let display;
  return (
    <ChartComponent
      theme={theme.palette.mode == 'dark' ? 'MaterialDark' : 'Material'}
      primaryXAxis={{
        majorGridLines: {
          color: theme.palette.divider,
          width: 1
        }
      }}
      id={`chart`}
      primaryxAxis={{
        valueType: 'Double',
        title: 'Overs',
        labelFormat: 'age'
      }}
      primaryYAxis={{
        maximum: 500,
        title: 'title',
        interval: 50,
        rangePadding: 'None',
        lineStyle: { width: 1 },
        majorTickLines: { width: 1 },
        minorTickLines: { width: 1 },
        titleStyle: {
          textAlignment: 'Center',
          size: '12px',
          fontWeight: 'bold',
          color: theme.palette.text.primary
        },
        visible: false // Set the visible property to false to disable the primaryYAxis
      }}
      chartArea={{ border: { width: 0 } }}
      tooltip={{
        enable: true,
        shared: true,
        fill: theme.palette.background.paper,
        color: '#000',
        textStyle: {
          color: theme.palette.text.primary
        },
        border: {
          width: 1,
          color: 'black'
        },
        opacity: 0.7
      }}
      legendSettings={legendSettings}
      width={Browser.isDevice ? '100%' : '100%'}
      height={'100%'}
      title={'Courbe de comparaison'}
      titleStyle={{
        textAlignment: 'Center',
        size: '18px',
        fontWeight: '600',
        color: theme.palette.text.primary
      }}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip, Highlight, DataLabel, SplineAreaSeries, SplineSeries]} />
      <AxesDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisA"
          opposedPosition={false}
          title=""
          titleStyle={{
            textAlignment: 'Center',
            size: '12px',
            fontWeight: '400'
          }}
          labelStyle={{
            color: 'transparent',
            size: '0px',
            display: 'none'
          }}
          majorGridLines={{ width: 2, color: theme.palette.divider }}
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
            color: 'transparent',
            size: '0px'
          }}
          title=""
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400'
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
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary,
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 0 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={100}
          interval={5}
          visible={paramId.includes(0) ? true : false}
        ></AxisDirective>
        <AxisDirective
          rowIndex={1}
          name="yAxis1"
          opposedPosition={true}
          title="∑ NOPPD"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary

            // color: "white",
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 0 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={500}
          visible={paramId.includes(1) ? true : false}
          interval={50}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis2"
          opposedPosition={false}
          title="PMO (g)"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 1 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={100}
          interval={10}
          visible={paramId.includes(2) ? true : false}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis3"
          opposedPosition={true}
          title="Blancs"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={15}
          interval={3}
          visible={paramId.includes(3) ? true : false}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis4"
          opposedPosition={true}
          title="Declassés"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={15}
          interval={3}
          visible={paramId.includes(4) ? true : false}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis5"
          opposedPosition={false}
          title="Mortalité / Semaine (%)"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={1}
          interval={0.1}
          visible={paramId.includes(5) ? true : false}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis6"
          opposedPosition={true}
          title="∑ Mortalité / PD (%)"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={15}
          interval={3}
          visible={paramId.includes(6) ? true : false}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis7"
          opposedPosition={false}
          title="Eau consommée (ml/j)"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={300}
          interval={50}
          visible={paramId.includes(7) ? true : false}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis8"
          opposedPosition={false}
          title="Aliment consommé (g/j)"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={150}
          interval={30}
          visible={paramId.includes(8) ? true : false}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis9"
          opposedPosition={true}
          title="∑ Aliment consommé (kg)"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={150}
          interval={30}
          visible={paramId.includes(9) ? true : false}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis10"
          opposedPosition={false}
          title="Ratio (Eau/Alt)"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={5}
          interval={0.5}
          visible={paramId.includes(10) ? true : false}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis11"
          opposedPosition={false}
          title="Homogénéité (%)"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={100}
          dashArray="5,5"
          interval={10}
          visible={paramId.includes(11) ? true : false}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis12"
          opposedPosition={true}
          title="Poids corporel (g)"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={2500}
          interval={500}
          visible={paramId.includes(12) ? true : false}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis13"
          opposedPosition={false}
          title="Masse d'oeuf hebdomadaire (g)"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={500}
          interval={50}
          visible={paramId.includes(13) ? true : false}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis14"
          opposedPosition={true}
          title="∑ Masse Oeuf (kg)"
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1 }}
          lineStyle={{ width: 1 }}
          minimum={0}
          maximum={35}
          interval={5}
          visible={paramId.includes(14) ? true : false}
        ></AxisDirective>
      </AxesDirective>

      <SeriesCollectionDirective>
        {data?.map((d) => {
          display = d?.data?.map((data, i) => {
            const paramName = params.find((param) => param.id === d.param)?.label || 'Unknown';
            return (
              <SeriesDirective
                key={data?.bat}
                dataSource={data?.data}
                xName="age"
                yName={'value'}
                name={`${paramName}-( ${data.bat}-${data.site})`}
                width={paramName == 'Homogénéité (%)' ? 0 : 2}
                marker={{
                  visible: paramName == 'Homogénéité (%)' ? true : false,
                  width: 5,
                  height: 5,
                  shape: 'Circle',
                  isFilled: true
                }}
                type="Spline"
                yAxisName={`yAxis${d?.param}`}
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
              shape: 'Circle',
              isFilled: true
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
