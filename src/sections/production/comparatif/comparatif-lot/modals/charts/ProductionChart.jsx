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
import { useTheme } from '@mui/material';

const ProductionChart = ({ data, i = 1, param }) => {
  const theme = useTheme();
  const legendSettings = {
    visible: true,
    textStyle: { color: theme.palette.text.primary }
  };

  let title;
  let max;
  let step;

  switch (param) {
    case 0:
      title = 'Ponte %';
      max = null;
      step = null;
      break;
    case 1:
      title = '∑ NOPPD';
      max = null;
      step = 25;
      break;
    case 2:
      title = 'PMO (g)';
      max = null;
      step = 10;
      break;
    case 3:
      title = 'Blancs';
      max = 10;
      step = 1;
      break;
    case 4:
      title = 'Declassés';
      max = 20;
      step = 2;
      break;
    default:
      break;
  }

  return (
    <ChartComponent
      id={`chart`}
      primaryXAxis={{
        majorGridLines: {
          color: theme.palette.divider,
          width: 1
        }
      }}
      primaryxAxis={{
        valueType: 'Double',
        title: 'Overs',
        labelFormat: 'age'
      }}
      primaryYAxis={{
        maximum: null,
        minimum: null,
        title: title,
        interval: null,
        rangePadding: 'None',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: {
          width: 0
        },
        minorTickLines: { width: 0 },
        titleStyle: {
          textAlignment: 'Center',
          size: '15px',
          fontWeight: '400',
          color: theme.palette.text.secondary
        }
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
      title={title}
      titleStyle={{
        textAlignment: 'Center',
        size: '17px',
        fontWeight: '600',
        color: theme.palette.text.primary
      }}
      theme={theme.palette.mode === 'dark' ? 'MaterialDark' : 'Material'}
    >
      <Inject services={[LineSeries, DateTime, Legend, Tooltip, Highlight, DataLabel, SplineAreaSeries, SplineSeries]} />
      <AxesDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisA"
          opposedPosition={true}
          title=""
          titleStyle={{
            textAlignment: 'Center',
            size: '10px',
            fontWeight: '400'
          }}
          labelStyle={{
            color: 'transparent'
          }}
          majorGridLines={{ width: 1, color: theme.palette.divider }}
          minorTickLines={{ width: 1, color: theme.palette.divider }}
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
                  dataSource={d?.ponte}
                  xName="age"
                  yName={'ponte'}
                  name={d.lot}
                  width={3}
                  border={{
                    width: 2
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
                  yName={'noppd_cuml'}
                  name={d.lot}
                  width={3}
                  type="Line"
                ></SeriesDirective>
              );
              break;
            case 2:
              display = (
                <SeriesDirective dataSource={d?.pmo} xName="age" yName={'pmo'} name={d.lot} width={3} type="Line"></SeriesDirective>
              );
              break;
            case 3:
              display = (
                <SeriesDirective dataSource={d?.blancs} xName="age" yName={'blanc'} name={d.lot} width={3} type="Line"></SeriesDirective>
              );
              break;
            case 4:
              display = (
                <SeriesDirective
                  dataSource={d?.declass}
                  xName="age"
                  yName={'declasse'}
                  name={d.lot}
                  width={3}
                  type="Line"
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
            type="Line"
            yAxisName="yAxisA"
          ></SeriesDirective>
        )}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
export default ProductionChart;
