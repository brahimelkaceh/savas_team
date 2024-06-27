import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  elements: {
    point: {
      radius: 0, // The radius of data points (default is 3)
      borderWidth: 0.5, // Border width of the data points
      hoverRadius: 3, // Radius of data points on hover
    },
    line: {
      tension: 0, // Adjust the line curvature (default is 0.4)
      borderColor: "rgba(255, 0, 0, 1)", // Color of the line
      borderWidth: 1.8, // Width of the line
      borderCapStyle: "round", // Line cap style ('butt', 'round', 'square')
      //   borderDash: [5, 5], // Dashed line pattern (e.g., [5, 5] for dashes)
    },
  },

  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Indices de Conversion",
    },
    legend: {
      display: true,
      position: "bottom", // 'top', 'bottom', 'left', 'right'
    },
  },
  scales: {
    x: {
      title: {
        display: false,
        text: "Age (semaine)",
        font: {
          weight: "bold",
        },
      },
      grid: {
        display: true, // Display the grid lines for the X-axis
        color: "rgba(0, 0, 0, 0.08)", // Color of the grid lines
        borderWidth: 1, // Width of the grid lines
        drawTicks: false, // Whether to draw tick marks on the grid lines
      },
    },
    y: {
      type: "linear",
      display: true,
      position: "left",

      max: 5,

      ticks: {
        font: {
          weight: "bold",
        },
        color: "#FF4D4D",
      },

      title: {
        display: true,
        text: "indice de conversion", // Specify the y-axis label text
        position: "left", // Position of the y-axis label (can be 'top', 'bottom', 'left', or 'right')
        font: {
          weight: "bold",
        },
        color: "#FF4D4D",
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        color: "rgba(0, 0, 0, 0.08)", // Color of the grid lines
      },
      scaleLabel: {
        display: true, // Display the x-axis label
        labelString: "X-Axis Label", // Specify the x-axis label text
      },
    },
    // y1: {
    //   type: "linear",
    //   display: true,
    //   position: "right",
    //   grid: {
    //     drawOnChartArea: false,
    //   },
    //   title: {
    //     display: true,
    //     text: "", // Specify the y-axis label text
    //     position: "left", // Position of the y-axis label (can be 'top', 'bottom', 'left', or 'right')
    //   },
    // },
  },
};

function IcChart({ icData }) {
  const labels = icData?.ages;
  const yData = icData?.guideIcCuml;
  const xData = icData?.guideIcSem;
  const zData = icData?.ic_cuml;
  const wData = icData?.ic_sem;

  // return;
  //   const zData = [10, 69, 60, 18, 10, 5, 15, 22, 49, 8];
  const data = {
    labels,
    datasets: [
      {
        label: "Guide : ∑ Indice de conversion",
        data: xData,
        borderColor: "#345e3755",
        backgroundColor: "#345e3755",
        yAxisID: "y",
        borderWidth: 8,
      },
      {
        label: "Guide : Indice de conversion",
        data: yData,
        borderColor: "#ff4d4d74",
        backgroundColor: "#ff4d4d74",
        yAxisID: "y",
        borderWidth: 8,
      },
      {
        label: " ∑ Indice de conversion",
        data: zData,
        borderColor: "#345e37",
        backgroundColor: "#345e37",
        borderWidth: 4,
        yAxisID: "y",
      },
      {
        label: "Indice de conversion",
        data: wData,
        borderColor: "#FF4D4D",
        backgroundColor: "#FF4D4D",
        borderWidth: 4,
        yAxisID: "y",
      },
    ],
  };
  return <Line options={options} data={data} />;
}

export default IcChart;

// 'table-conso-chart/': consommation
// 'table-prod-chart/': % ponte + pmo +  % declassé
