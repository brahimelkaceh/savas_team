import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 24,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 13,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 98,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 39,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 48,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 38,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 43,
    amt: 2100,
  },
];

function LineCharts2() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="pv"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" />
        <Line yAxisId="right" type="monotone" dataKey="amt" stroke="#dc2626" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineCharts2;
