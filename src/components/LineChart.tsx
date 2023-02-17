import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

ChartJS.register({
  id: "custom_canvas_background_color",
});
function BarChart({ chartData }: any) {
  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            align: "start",

            labels: {
              boxHeight: 0.6,
              boxWidth: 30,
            },
          },
        },

        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 10,
            },
          },
        },
      }}
    />
  );
}

export default BarChart;
