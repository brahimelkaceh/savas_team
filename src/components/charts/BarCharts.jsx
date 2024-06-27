import React from "react";
import { useState } from "react";
import { ResponsiveLine } from "@nivo/line";
const data = [
  {
    "id": "Normal",
    "color": "hsl(270, 70%, 50%)",
    "data": [
      {
        "x": "01/06",
        "y": 294,
      },
      {
        "x": "02/06",
        "y": 248,
      },
      {
        "x": "03/06",
        "y": 248,
      },
      {
        "x": "04/06",
        "y": 292,
      },
      {
        "x": "05/06",
        "y": 211,
      },
      {
        "x": "06/06",
        "y": 162,
      },
      {
        "x": "07/06",
        "y": 180,
      },
      {
        "x": "08/06",
        "y": 152,
      },
      {
        "x": "09/06",
        "y": 297,
      },
      {
        "x": "10/06",
        "y": 13,
      },
      {
        "x": "11/06",
        "y": 90,
      },
      {
        "x": "12/06",
        "y": 132,
      },
    ],
  },
  {
    "id": "declasse",
    "color": "hsl(346, 70%, 50%)",
    "data": [
      {
        "x": "01/06",
        "y": 195,
      },
      {
        "x": "02/06",
        "y": 215,
      },
      {
        "x": "03/06",
        "y": 173,
      },
      {
        "x": "04/06",
        "y": 6,
      },
      {
        "x": "05/06",
        "y": 293,
      },
      {
        "x": "06/06",
        "y": 77,
      },
      {
        "x": "07/06",
        "y": 55,
      },
      {
        "x": "08/06",
        "y": 98,
      },
      {
        "x": "09/06",
        "y": 181,
      },
      {
        "x": "10/06",
        "y": 208,
      },
      {
        "x": "11/06",
        "y": 227,
      },
      {
        "x": "12/06",
        "y": 183,
      },
    ],
  },
  {
    "id": "d.j",
    "color": "hsl(72, 70%, 50%)",
    "data": [
      {
        "x": "01/06",
        "y": 97,
      },
      {
        "x": "02/06",
        "y": 121,
      },
      {
        "x": "03/06",
        "y": 122,
      },
      {
        "x": "04/06",
        "y": 280,
      },
      {
        "x": "05/06",
        "y": 39,
      },
      {
        "x": "06/06",
        "y": 198,
      },
      {
        "x": "07/06",
        "y": 146,
      },
      {
        "x": "08/06",
        "y": 91,
      },
      {
        "x": "09/06",
        "y": 254,
      },
      {
        "x": "10/06",
        "y": 131,
      },
      {
        "x": "11/06",
        "y": 115,
      },
      {
        "x": "12/06",
        "y": 159,
      },
    ],
  },
];
function BarCharts() {
  return (
    // <div>
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="cardinal"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Date",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Productions",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      lineWidth={1}
      pointSize={2}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
    // </div>
  );
}

export default BarCharts;
