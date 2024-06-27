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
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  elements: {
    point: {
      radius: 0, // The radius of data points (default is 3)
      borderWidth: 0, // Border width of the data points
    },
    line: {
      tension: 0.1, // Adjust the line curvature (default is 0.4)
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
      text: "Indice  APO",
      font: {
        weight: "bold",
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
    y: {
      type: "linear",
      display: true,
      position: "left",
      ticks: {
        color: "#557C55",
      },
      title: {
        display: true,
        text: "Aliment",
        color: "#557C55",
        font: {
          weight: "bold",
        },
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        color: "rgba(0, 0, 0, 0.08)", // Color of the grid lines
      },
    },
    y1: {
      type: "linear",
      display: false,
      position: "right",
      grid: {
        drawOnChartArea: true,
      },
    },
  },
};

function AltChart({ altData }) {
  const labels = altData?.dates;

  const data = {
    labels,
    datasets: [
      {
        label: "Alt/Oeuf",
        data: altData?.altOeufReel,
        borderColor: "#557C55",
        backgroundColor: "#557C55",
        borderWidth: 2,
        fill: false, // Add fill property to fill the area below the line

        yAxisID: "y",
      },
      // {
      //   label: "Guide: alt/Oeuf",
      //   data: altData[2]?.altOeufGuide,
      //   borderColor: "#C5F88888",
      //   backgroundColor: "#C5F88888",
      //   borderWidth: 4,

      //   yAxisID: "y",
      // },
    ],
  };
  return <Line options={options} data={data} />;
}

export default AltChart;
