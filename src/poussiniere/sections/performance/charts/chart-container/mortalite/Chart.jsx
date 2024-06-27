/**
 * Sample for Column series
 */
import * as React from 'react';
import { useEffect } from 'react';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
  Highlight,
  LineSeries,
  AxesDirective,
  AxisDirective
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { useTheme } from '@mui/material';

const MortChart = ({ reel, guide, show }) => {
  const theme = useTheme();
  const legendSettings = {
    visible: true,
    textStyle: { color: theme.palette.text.primary }
  };
  return (
    <ChartComponent
      id="chart_mort"
      legendSettings={legendSettings}
      theme={theme.palette.mode === 'dark' ? 'MaterialDark3' : 'Material'}
      primaryXAxis={{
        labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
        labelRotation: Browser.isDevice ? -45 : 0,
        valueType: 'Category',
        interval: 1,
        minimum: 0,
        labelStyle: {
          color: theme.palette.text.secondary
        },
        majorGridLines: { width: 1, color: theme.palette.divider },
        majorTickLines: { width: 1, color: theme.palette.divider }
      }}
      primaryYAxis={{
        title: '% Mortalité / Semaine',
        titleStyle: {
          textAlignment: 'Center',
          size: '11px',
          fontWeight: 'normal',
          color: theme.palette.text.primary
        },
        labelStyle: {
          color: theme.palette.text.secondary
        },
        majorTickLines: { width: 0 },
        majorGridLines: { width: show ? 0 : 1, color: theme.palette.divider },
        lineStyle: { width: 1 },

        maximum: null,
        interval: null,
        labelFormat: '{value}%'
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
    >
      <Inject services={[LineSeries, ColumnSeries, Legend, Tooltip, Category, DataLabel, Highlight]} />
      <AxesDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis1"
          opposedPosition={true}
          title="∑ % moratilité PD"
          titleStyle={{
            textAlignment: 'Center',
            size: '11px',
            fontWeight: 'normal',
            color: theme.palette.text.primary
          }}
          labelStyle={{
            color: theme.palette.text.secondary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 1, color: theme.palette.divider }}
          lineStyle={{ width: 1, color: theme.palette.divider }}
          minimum={0}
          maximum={null}
          interval={null}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisA"
          opposedPosition={true}
          title=""
          titleStyle={{
            textAlignment: 'Center',
            size: '11px',
            fontWeight: 'normal'
          }}
          labelStyle={{
            color: 'transparent'
          }}
          majorGridLines={{
            width: 0
          }}
          minorTickLines={{
            width: 1,
            color: theme.palette.divider
          }}
          lineStyle={{
            width: 0
          }}
          majorTickLines={{
            width: 0
          }}
          minimum={0}
          maximum={null}
          interval={null}
          visible={show}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisB"
          opposedPosition={true}
          title=""
          titleStyle={{
            textAlignment: 'Center',
            size: '12px',
            fontWeight: '400'
          }}
          labelStyle={{
            color: 'transparent'
          }}
          majorGridLines={{
            width: 1,
            color: theme.palette.divider
          }}
          minorTickLines={{
            width: 0
          }}
          lineStyle={{
            width: 0
          }}
          majorTickLines={{
            width: 0
          }}
          minimum={0}
          maximum={100}
          interval={1.5}
          visible={show}
        ></AxisDirective>
      </AxesDirective>
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={reel}
          xName="age"
          yName="mort_cuml"
          name={show ? '∑ Mortalité / PD (%)' : ' '}
          type="Line"
          fill="#79AC78"
          width={show ? 5 : 2.5}
          yAxisName="yAxis1"
        />
        <SeriesDirective
          dataSource={guide}
          xName="G_age"
          yName="G_mortCuml"
          name={show ? 'Guide : ∑ % moratilité PD' : ' '}
          width={show ? 5 : 2.5}
          fill="#79AC78"
          opacity={0.5}
          type="Line"
          yAxisName="yAxis1"
        />
        <SeriesDirective
          dataSource={guide}
          xName="G_age"
          yName="mort_sem"
          width={2}
          name={show ? 'Guide : % Mortalité / Semaine' : ' '}
          type="Column"
          fill="#F48FB1"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={reel}
          xName="age"
          columnSpacing={0.1}
          yName="mort_sem"
          name={show ? '% Mortalité / Semaine' : ' '}
          fill="#880e4f"
          type="Column"
        />

        <SeriesDirective dataSource={guide} xName="G_age" yName="" name="" opacity={0.5} type="Line" yAxisName="yAxisB" />
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};
export default MortChart;
