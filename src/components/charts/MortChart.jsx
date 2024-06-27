import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);
const options = {
  elements: {
    point: {
      radius: 0, // The radius of data points (default is 3)
      borderWidth: 0, // Border width of the data points
    },
    line: {
      tension: 0.1, // Adjust the line curvature (default is 0.4)
      borderColor: "rgba(0, 102, 140,0)", // Color of the line
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
      text: "Evolution Mortalité",
      font: {
        size: "20px",
      },
    },
    legend: {
      display: true,
      position: "top", // 'top', 'bottom', 'left', 'right'
    },
  },
  scales: {
    x: {
      // X-axis grid customization
      grid: {
        display: true, // Display the grid lines for the X-axis
        color: "rgba(0, 0, 0, 0.08  )", // Color of the grid lines
        borderWidth: 1, // Width of the grid lines
        drawTicks: true, // Whether to draw tick marks on the grid lines
        drawOnChartArea: true,
      },
    },

    y1: {
      type: "linear",
      display: true,
      position: "left",
      ticks: {
        color: "#FA7070",
      },
      title: {
        display: true,
        text: "Mortalité",
        color: "#FA7070",
        font: {
          weight: "bold",
        },
      },
      grid: {
        display: true,
        drawOnChartArea: true,
      },
    },
  },
};
function MortChart({ mortData }) {
  const labels = mortData?.dates;
  const mortTotal = mortData?.mortTotal;
  console.log(mortTotal);

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "Moratilité",
        borderColor: "#FA7070",
        backgroundColor: "#FA7070",
        borderWidth: 4, // Set the border width
        yAxisID: "y1",
        data: mortTotal,
      },
      // {
      //   type: "line",
      //   label: "Guide : moratilité total",
      //   borderColor: "#FA707069",
      //   backgroundColor: "#FA7070",
      //   yAxisID: "y1",
      //   borderWidth: 4, // Set the border width

      //   data: mortData[2]?.mortGuide,
      // },
    ],
  };
  return <Chart options={options} data={data} />;
}

export default MortChart;
