import * as React from 'react';
import { useEffect } from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  Highlight,
  DateTime,
  SeriesDirective,
  Inject,
  Tooltip,
  RangeStepAreaSeries,
  StepLineSeries,
  StepAreaSeries,
  LineSeries,
  AxesDirective,
  AxisDirective,
  SplineAreaSeries,
  Legend
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { useTheme } from '@mui/material';

const LightChart = ({ data, show }) => {
  const theme = useTheme();
  const legendSettings = {
    visible: true,
    textStyle: { color: theme.palette.text.primary }
  };
  return (
    <ChartComponent
      id="chart_light"
      theme={theme.palette.mode === 'dark' ? 'MaterialDark3' : 'Material'}
      primaryXAxis={{
        labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
        labelRotation: Browser.isDevice ? -45 : 0,
        title: '',
        interval: 1,
        minimum: 1,
        maximum: 17,
        majorTickLines: { width: 1, color: theme.palette.divider },
        rangePadding: 'None',
        valueType: 'Double',
        majorGridLines: {
          color: theme.palette.divider,
          width: 1
        },
        labelStyle: {
          color: theme.palette.text.secondary
        }
      }}
      primaryYAxis={{
        labelFormat: '{value}h',
        title: 'Durée lumière',
        lineStyle: { width: 0 },
        minimum: 0,
        maximum: 24,
        interval: 2,
        majorTickLines: { width: 0 },
        majorGridLines: { width: 0 },
        titleStyle: {
          textAlignment: 'Center',
          size: '12px',
          color: theme.palette.text.primary,
          fontWeight: 'bold'
        },
        labelStyle: {
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
      width={Browser.isDevice ? '100%' : '100%'}
      height="100%"
      legendSettings={legendSettings}
    >
      <Inject
        services={[RangeStepAreaSeries, StepLineSeries, StepAreaSeries, DateTime, Tooltip, Highlight, LineSeries, SplineAreaSeries, Legend]}
      />
      <AxesDirective>
        <AxisDirective
          ajorGridLines={{ width: 0 }}
          rowIndex={0}
          opposedPosition={true}
          lineStyle={{ width: 0 }}
          majorGridLines={{ width: 2, color: theme.palette.divider }}
          maximum={100}
          interval={10}
          majorTickLines={{ width: 0 }}
          name="yAxis1"
          labelFormat="{value}"
          title="Intensité (%)"
          titleStyle={{
            textAlignment: 'Center',
            size: '12px',
            color: theme.palette.text.primary,
            fontWeight: 'bold'
          }}
          labelStyle={{
            color: theme.palette.text.secondary
          }}
        />
        <AxisDirective
          majorGridLines={{ width: 1, color: theme.palette.divider }}
          rowIndex={0}
          opposedPosition={true}
          lineStyle={{ width: 0 }}
          maximum={100}
          interval={2.5}
          majorTickLines={{ width: 0 }}
          name="yAxis1"
          labelFormat=""
          title=""
          labelStyle={{
            color: 'transparent'
          }}
          visible={show}
        />
      </AxesDirective>
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={data}
          border={{ width: 2 }}
          xName="age"
          high="lightOn"
          yName="lightDur"
          low="lightOff"
          name={show ? 'Lumiére' : ' '}
          opacity={0.9}
          fill="#0174BE"
          animation={{ enable: true }}
          type="RangeStepArea"
          tooltipFormat={show ? 'Lumiere On : ${point.high} Lumiere Off : ${point.low}' : ':<b> ${point.high}~~${point.low}</b>'}
        />
        <SeriesDirective
          dataSource={data}
          border={{ width: 2 }}
          xName="age"
          high="flashOn"
          yName="flashDur"
          name={show ? 'Flash' : ' '}
          fill="#0174BE"
          opacity={0.8}
          marker={{ visible: false }}
          low="flashOff"
          animation={{ enable: true }}
          type="RangeStepArea"
          tooltipFormat={show ? 'Flash On : ${point.high} Flash Off : ${point.low}' : ':<b> ${point.high}~~${point.low}</b>'}
        />

        <SeriesDirective
          dataSource={data}
          xName="age"
          yName="intensite"
          name={show ? 'Intensité' : ' '}
          opacity={1}
          type="StepLine"
          fill="#F8DE22"
          yAxisName="yAxis1"
          width={4}
          border={{ width: 2 }}
          tooltipFormat="Intensité : ${point.y} "
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LightChart;
