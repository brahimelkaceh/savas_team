/**
 * Sample for Area series
 */
import * as React from 'react';
import { useEffect } from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  Highlight,
  SeriesDirective,
  Inject,
  Tooltip,
  DateTime,
  SplineAreaSeries,
  Legend,
  AxesDirective,
  AxisDirective,
  LineSeries,
  SplineRangeAreaSeries
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { useTheme } from '@mui/material';

const IcChart = ({ reel, guide, show }) => {
  const theme = useTheme();
  const legendSettings = {
    visible: true,
    textStyle: { color: theme.palette.text.primary }
  };
  return (
    <ChartComponent
      id="ic-chart"
      theme={theme.palette.mode === 'dark' ? 'MaterialDark3' : 'Material'}
      primaryXAxis={{
        majorGridLines: {
          color: theme.palette.divider,
          width: 0.5
        },
        interval: 1,
        minimum: 1,
        maximum: 17,
        labelStyle: {
          color: theme.palette.text.secondary
        }
      }}
      primaryxAxis={{
        valueType: 'Double',
        title: 'Overs',
        labelFormat: 'G_age'
      }}
      primaryYAxis={{
        title: 'ic',
        titleStyle: {
          textAlignment: 'Center',
          size: '11px',
          fontWeight: '400',
          color: theme.palette.text.primary
        },
        labelStyle: {
          color: theme.palette.text.secondary
        },
        labelFormat: '{value}',
        lineStyle: { width: 0 },
        maximum: null,
        interval: null,
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        majorGridLines: { width: 0 }
      }}
      width={Browser.isDevice ? '100%' : '100%'}
      // height={Browser.isDevice ? "100%" : "100%"}
      legendSettings={legendSettings}
      chartArea={{ border: { width: 0 } }}
      // title="Indice de conversion"
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
    >
      <Inject services={[SplineAreaSeries, DateTime, LineSeries, Tooltip, Legend, Highlight, SplineRangeAreaSeries]} />
      <AxesDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis1"
          opposedPosition={true}
          title="Guide : Indice de conversion"
          titleStyle={{
            textAlignment: 'Center',
            size: '11px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          labelStyle={{
            color: theme.palette.text.secondary
          }}
          majorGridLines={{ width: show ? 0 : 1, color: theme.palette.divider }}
          minorTickLines={{ width: 0 }}
          lineStyle={{ width: 1 }}
          minimum={null}
          maximum={null}
          interval={null}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisdate"
          opposedPosition={true}
          majorGridLines={{ width: 1, color: theme.palette.divider }}
          minorTickLines={{ width: 0 }}
          majorTickLines={{ width: 0 }}
          labelStyle={{
            color: 'transparent'
          }}
          lineStyle={{ width: 0 }}
          minimum={0}
          maximum={100}
          interval={2.5}
          visible={show}
        ></AxisDirective>
      </AxesDirective>

      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={guide}
          xName="G_age"
          yName="ic"
          name={show ? 'Guide : Indice de conversion' : ' '}
          type="Line"
          width={show ? 6 : 4}
          opacity={0.5}
          yAxisName="yAxis1"
          border={{ width: 2 }}
          fill="#65B741"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={reel}
          xName="age"
          yName="ic"
          name={show ? 'Indice de conversion' : ' '}
          type="Line"
          width={show ? 4 : 2}
          fill="#65B741"
        ></SeriesDirective>
        <SeriesDirective dataSource={guide} xName="G_age" yName="" name={''} type="Line" yAxisName="yAxisdate"></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
export default IcChart;
