/**
 * Sample for Line Series
 */
import * as React from 'react';
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
  AxesDirective
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { useTheme } from '@mui/material';

const MasseOeufChart = ({ data, param }) => {
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
      title = "Masse d'oeuf hebdomadaire (g)";
      max = 500;
      step = 50;
      break;
    case 1:
      title = '∑ Masse Oeuf (kg)';
      max = 40;
      step = 5;
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
        title: title,
        rangePadding: 'None',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        majorGridLines: { width: 0 },
        maximum: null,
        interval: null,
        minimum: null,
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
                  dataSource={d?.massSem}
                  xName="age"
                  yName={'massSem'}
                  name={d.lot}
                  width={3}
                  marker={{
                    visible: false,
                    width: 7,
                    height: 7,
                    shape: 'Circle',
                    isFilled: true
                  }}
                  type="Spline"
                ></SeriesDirective>
              );
              break;
            case 1:
              display = (
                <SeriesDirective
                  dataSource={d?.massCuml}
                  xName="age"
                  yName={'massCuml'}
                  name={d.lot}
                  width={3}
                  marker={{
                    visible: false,
                    width: 7,
                    height: 7,
                    shape: 'Circle',
                    isFilled: true
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
              shape: 'Circle',
              isFilled: true
            }}
            type="Line"
            yAxisName="yAxisA"
          ></SeriesDirective>
        )}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
export default MasseOeufChart;
