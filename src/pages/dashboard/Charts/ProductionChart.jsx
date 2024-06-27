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
      text: "Evolution production des oeufs",
      font: {
        size: "20",
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
        drawOnChartArea: false,
      },
    },
    y: {
      type: "linear",
      display: true,
      position: "left",

      ticks: {
        color: "#BA704F",
      },
      title: {
        display: true,
        text: "Ponte (en milliers)",
        color: "#BA704F",
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

function ProductionChart({ prodChart }) {
  const labels = prodChart?.dates;
  const xData = prodChart?.prodTotal;
  const zData = prodChart?.declassed;
  const bData = prodChart?.prev;

  const data = {
    labels,
    datasets: [
      {
        label: "Production Totale",
        data: xData,
        borderColor: "#BA704F",
        backgroundColor: "#BA704F",
        fill: false,
        yAxisID: "y",
        borderWidth: 4,
      },
      {
        label: "Declassés",
        data: zData,
        borderColor: "#E08E6D",
        backgroundColor: "#fce3dc",
        borderWidth: 1,
        fill: true,
        yAxisID: "y",
      },

      {
        label: "Prévisions",
        data: bData,
        borderColor: "#D2DE32",
        backgroundColor: "#D2DE32",
        borderWidth: 6,
        yAxisID: "y",
      },
    ],
  };
  return <Line options={options} data={data} />;
}

export default ProductionChart;
