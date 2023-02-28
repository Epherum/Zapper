import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

ChartJS.register({
  id: "custom_canvas_background_color",
});
function BarChart({ chartData }: any) {
  let delayed: boolean;
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
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0)",
            displayColors: false,
            titleColor: "#000",
            bodyColor: "#000",
            borderWidth: 0.3,
            borderColor: "#000",
          },
        },
        animation: {
          onComplete: () => {
            delayed = true;
          },
          delay: (context) => {
            let delay = 0;
            if (
              context.type === "data" &&
              context.mode === "default" &&
              !delayed
            ) {
              delay = context.dataIndex * 80 + context.datasetIndex * 100 + 600;
            }
            return delay;
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
