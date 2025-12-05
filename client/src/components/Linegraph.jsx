import React from "react";
import { Line } from "react-chartjs-2";
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
import Loader from "./Loader";

import { useGetWeeklyCaloriesQuery } from "../slices/caloriesApiSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Linegraph = () => {
  const secondary = "#BD93F9";
  const primary = "#FF79C6";
  const accent = "#6272A4";

  const { data: calData, isLoading } = useGetWeeklyCaloriesQuery();

  if (isLoading) {
    return (
      <div className="w-full max-w-lg h-[200px] mx-auto flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Dummy labels for days of the week
  const labels =
    calData?.chartData?.map((entry) =>
      new Date(entry.date).toLocaleDateString("en-US", { weekday: "short" })
    ) || [];

  const calories = calData?.chartData?.map((entry) => entry.calories) || [];

  // Dummy weekly calorie intake data
  const data = {
    labels,
    datasets: [
      {
        label: "Calories Consumed",
        data: calories,
        borderWidth: 2,
        borderColor: primary,
        backgroundColor: primary + "55",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: "Weekly Calorie Intake" },
    },
    scales: {
      x: {
        grid: {
          display: false, // remove vertical grid lines
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          display: false, // remove horizontal grid lines
        },
      },
    },
  };

  return (
    <div className="w-full max-w-lg h-[200px] mx-auto">
      <Line
        data={data}
        options={{
          ...options,
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default Linegraph;
