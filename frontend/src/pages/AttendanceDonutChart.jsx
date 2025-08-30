import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AttendanceDonutChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        label: "% Attendance",
        data: data.map(d => d.value),
        backgroundColor: ["#7f5af0", "#f6c23e", "#e74a3b", "#36b9cc", "#1cc88a"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default AttendanceDonutChart;
