import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  LineSeries,
  AxesDirective,
  AxisDirective,
  AreaSeries,
  SplineRangeAreaSeries,
  RangeAreaSeries,
  RangeColumnSeries,
  SplineSeries
} from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { useTheme } from '@mui/material';
import { lightGreen, teal } from '@mui/material/colors';

function ConsoChart({ reel, guide, show }) {
  const theme = useTheme();
  const legendSettings = {
    visible: true,
    textStyle: { color: theme.palette.text.primary }
  };
  return (
    <ChartComponent
      id="conso-chart"
      theme={theme.palette.mode === 'dark' ? 'MaterialDark3' : 'Material'}
      primaryXAxis={{
        labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
        labelRotation: Browser.isDevice ? -45 : 0,
        majorGridLines: {
          color: theme.palette.divider,
          width: 0.5
        },
        valueType: 'Double',
        interval: 1,
        minimum: 0,
        maximum: 18,
        labelStyle: {
          color: theme.palette.text.secondary
        }
      }}
      primaryYAxis={{
        title: 'Eau consommée (ml/j)',
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
        majorTickLines: { width: 1 },
        minorTickLines: { width: 0 },
        majorGridLines: { width: 0 }
      }}
      width={Browser.isDevice ? '100%' : '100%'}
      legendSettings={legendSettings}
      chartArea={{ border: { width: 0 } }}
      // title="Consommation"
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
      <Inject
        services={[
          LineSeries,
          AreaSeries,
          SplineRangeAreaSeries,
          Legend,
          Tooltip,
          DataLabel,
          Category,
          RangeAreaSeries,
          RangeColumnSeries,
          SplineSeries
        ]}
      />
      <AxesDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis1"
          opposedPosition={false}
          title="Aliment Consommée (g/j)"
          titleStyle={{
            textAlignment: 'Center',
            size: '11px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          labelStyle={{
            color: theme.palette.text.secondary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 0 }}
          minorGridLines={{ width: 0 }}
          lineStyle={{ width: 1 }}
          minimum={null}
          maximum={null}
          interval={null}
          visible={show}
        ></AxisDirective>

        <AxisDirective
          rowIndex={0}
          name="yAxis2"
          opposedPosition={true}
          title="∑ Aliment Consommée (kg)"
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
          lineStyle={{ width: 0 }}
          minimum={null}
          maximum={null}
          interval={null}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxis3"
          opposedPosition={true}
          title="Ratio (Eau/Alt)"
          titleStyle={{
            textAlignment: 'Center',
            size: '11px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          labelStyle={{
            color: theme.palette.text.secondary
          }}
          majorGridLines={{ width: 0 }}
          minorTickLines={{ width: 0 }}
          minorGridLines={{ width: 0 }}
          lineStyle={{ width: 1 }}
          minimum={null}
          maximum={null}
          interval={null}
          visible={show}
        ></AxisDirective>
        <AxisDirective
          rowIndex={0}
          name="yAxisdate"
          opposedPosition={true}
          title=""
          titleStyle={{
            textAlignment: 'Center',
            size: '11px',
            fontWeight: '400',
            color: theme.palette.text.primary
          }}
          labelStyle={{
            color: 'transparent'
          }}
          majorGridLines={{ width: 1, color: theme.palette.divider }}
          minorTickLines={{ width: 0 }}
          minorGridLines={{ width: 0 }}
          majorTickLines={{ width: 0 }}
          lineStyle={{ width: 0 }}
          minimum={0}
          maximum={100}
          interval={2.5}
          visible={show}
        ></AxisDirective>
      </AxesDirective>
      <SeriesCollectionDirective>
        <SeriesDirective
          dataSource={reel}
          xName="age"
          yName="epsSem"
          width={show ? 6 : 2}
          name={show ? 'Eau' : ' '}
          type="Line"
          dashArray="6,5"
          fill="#83A2FF"
        ></SeriesDirective>
        <SeriesDirective
          dataSource={reel}
          xName="age"
          yName="aps"
          width={show ? 4 : 2}
          name={show ? 'Aliment/sujet' : ' '}
          type="Spline"
          yAxisName="yAxis1"
          fill={theme.palette.mode === 'dark' ? teal[400] : teal[800]}
        ></SeriesDirective>

        <SeriesDirective
          dataSource={guide}
          xName="G_age"
          high="G_consoSemMax"
          low="G_consoSemMin"
          name={show ? 'Guide: Aliment/sujet' : ' '}
          opacity={0.3}
          fill={theme.palette.mode === 'dark' ? teal[400] : teal[800]}
          type="RangeColumn"
          yAxisName="yAxis1"
          tooltipFormat={show ? 'Guide: Aliment/sujet: Min:${point.low}~~Max:${point.high}' : ':<b> ${point.low}~~${point.high}</b>'}
          marker={{ dataLabel: { visible: false, position: 'Outer' } }}
        ></SeriesDirective>
        <SeriesDirective
          dataSource={guide}
          xName="G_age"
          high="G_consoCumlMax"
          low="G_consoCumlMin"
          name={show ? 'Guide: ∑ Aliment/sujet' : ' '}
          opacity={0.3}
          fill={theme.palette.mode === 'dark' ? lightGreen[400] : lightGreen[700]}
          type="RangeColumn"
          yAxisName="yAxis2"
          tooltipFormat={show ? 'Guide: ∑ Aliment/sujet: Min:${point.low}~~Max:${point.high}' : ':<b> ${point.low}~~${point.high}</b>'}
          marker={{ dataLabel: { visible: false, position: 'Outer' } }}
        ></SeriesDirective>
        <SeriesDirective
          dataSource={reel}
          xName="age"
          yName="apsCuml"
          width={show ? 4 : 2}
          name={show ? '∑ Aliment/sujet' : ' '}
          type="Spline"
          yAxisName="yAxis2"
          fill={theme.palette.mode === 'dark' ? lightGreen[400] : lightGreen[700]}
        ></SeriesDirective>
        <SeriesDirective
          dataSource={reel}
          xName="age"
          yName="ratio"
          width={2}
          name={show ? 'Ratio Eau/Aliment' : ' '}
          type="Area"
          fill="#97e0ff"
          border={{
            width: 2,
            color: '#97e0ff'
          }}
          opacity={0.6}
          yAxisName="yAxis3"
        ></SeriesDirective>

        <SeriesDirective
          dataSource={guide}
          xName="age"
          yName=""
          width={show ? 4 : 2}
          name={''}
          type="Line"
          yAxisName="yAxisdate"
        ></SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent>
  );
}
export default ConsoChart;
