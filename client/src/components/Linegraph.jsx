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
import { useSelector } from "react-redux";
import Loader from "./Loader";

import { useGetWeeklyCaloriesQuery } from "../slices/caloriesApiSlice";
import { useGetWaterWeekLogQuery } from "../slices/waterApiSlice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Linegraph = ({ type = "calories" }) => {
  const secondary = "#BD93F9";
  const primary = "#FF79C6";

  const { userInfo } = useSelector((state) => state.auth);
  const calorieGoal = userInfo?.dailyCalorieGoal ?? 0;
  const waterGoal = userInfo?.dailyWaterGoal ?? 0;

  const { data: calData, isLoading: calLoading } = useGetWeeklyCaloriesQuery(
    undefined,
    { skip: type !== "calories" },
  );
  const { data: waterData, isLoading: waterLoading } = useGetWaterWeekLogQuery(
    undefined,
    { skip: type !== "water" },
  );

  const isLoading = type === "calories" ? calLoading : waterLoading;

  if (isLoading) {
    return (
      <div className="w-full max-w-lg h-[200px] mx-auto flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const rawData =
    type === "calories" ? calData?.chartData : waterData?.chartData;

  const goal = type === "calories" ? calorieGoal : waterGoal;

  const labels =
    rawData?.map((entry) =>
      new Date(entry.date).toLocaleDateString("en-US", { weekday: "short" }),
    ) || [];

  const goalLine = labels.map(() => goal);

  const values =
    type === "calories"
      ? rawData?.map((entry) => entry.calories) || []
      : rawData?.map((entry) => entry.waterConsumed);

  const data = {
    labels,
    datasets: [
      {
        label: type === "calories" ? "Calories Consumed" : "Water consumed(ml)",
        data: values,
        borderWidth: 2,
        borderColor: primary,
        backgroundColor: primary + "55",
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 7,
      },
      {
        label: type === "calories" ? `Goal kcal: ${goal}` : `Goal ml ${goal}`,
        data: goalLine,
        borderWidth: 1,
        borderColor: secondary,
        borderDash: [6, 6],
        pointRadius: 0,
        tooltip: { enabled: false },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      title: {
        display: true,
        text:
          type === "calories" ? "Weekly Calorie Intake" : "Weekly Water Intake",
      },
      tooltip: {
        callbacks:
          type === "calories"
            ? {
                label: (context) => {
                  const dayData = rawData[context.dataIndex];
                  return [
                    `Calories: ${dayData.calories}`,
                    `Protein: ${dayData.proteinConsumed}g`,
                    `Carbs: ${dayData.carbsConsumed}g`,
                    `Fats: ${dayData.fatsConsumed}g`,
                  ];
                },
              }
            : {
                label: (context) => {
                  const dayData = rawData[context.dataIndex];
                  return `Water: ${dayData.waterConsumed} ml`;
                },
              },
      },
    },

    scales: {
      x: {
        grid: {
          display: false, // remove vertical grid lines
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(...values, goal) + 200,
        grid: {
          display: false, // remove horizontal grid lines
        },
      },
    },
  };

  return (
    <div className="w-full h-44 mx-auto">
      <Line
        data={data}
        options={{
          ...options,
        }}
      />
    </div>
  );
};

export default Linegraph;
