import React from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement);

const Doughnutgraph = () => {
  const secondary = "#BD93F9";
  const primary = "#FF79C6";
  const accent = "#6272A4";

  const { userInfo } = useSelector((state) => state.auth);
  const macros = userInfo?.macros;

  const options = {
    responsive: true,
    maintainAspectRaio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Goal Macros" },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `Goal: ${value} g`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 10 },
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return `${label} \n    ${value}g`;
        },
      },
    },
  };

  const data = {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        label: "Grams",
        data: macros
          ? [macros.protein, macros.carbohydrates, macros.fats]
          : [0, 0, 0],
        backgroundColor: [primary + "55", secondary + "55", accent + "55"],
        borderColor: [primary, secondary, accent],
        borderWidth: 1.5,
      },
    ],
  };
  return (
    <div className="w-full h-44 mx-auto">
      <Doughnut data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default Doughnutgraph;
