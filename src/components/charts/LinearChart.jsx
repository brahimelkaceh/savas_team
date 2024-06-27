import React from "react";
import { ResponsiveLine } from "@nivo/line";

function LinearChart({ prodChart }) {
  // console.log(prodChart?.slice(1));
  let data = prodChart?.slice(1);
  // console.log(data);
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 30, right: 100, bottom: 45, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: 0,
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="cardinal"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 8,
        tickRotation: 45,
        legend: "",
        legendOffset: 35,
        legendPosition: "middle",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 45,
        legend: "Production",
        legendOffset: -50,
        legendPosition: "middle",
      }}
      colors={{ scheme: "dark2" }}
      lineWidth={2}
      pointSize={3}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "top-right",
          direction: "column",
          justify: false,
          translateX: 98,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 90,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 5,
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
  );
}

export default LinearChart;
