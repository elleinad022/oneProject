import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

const Doughnutgraph = () => {
  const secondary = "#BD93F9";
  const primary = "#FF79C6";
  const accent = "#6272A4";

  const { userInfo } = useSelector((state) => state.auth);
  const macros = userInfo?.macros;
  const hasMacros =
    macros &&
    (macros.protein > 0 || macros.carbohydrates > 0 || macros.fats > 0);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: hasMacros,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          generateLabels: (chart) => {
            const { data } = chart;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => ({
                text: `${label}: ${data.datasets[0].data[i]}g`,
                fillStyle: data.datasets[0].borderColor[i],
                strokeStyle: data.datasets[0].borderColor[i],

                fontColor: "#A6ADBB", 

                pointStyle: "circle",
                lineWidth: 0,
                hidden: false,
                index: i,
              }));
            }
            return [];
          },
        },
      },
      title: {
        display: true,
        text: hasMacros ? "Goal Macros" : "Goal Macros: EMPTY",
      },
      tooltip: {
        enabled: hasMacros,
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `Goal: ${value} g`;
          },
        },
      },
      datalabels: hasMacros
        ? {
            color: "#fff",
            font: { weight: "bold", size: 10 },
            formatter: (value, ctx) => {
              const label = ctx.chart.data.labels[ctx.dataIndex];
              return `${label} \n    ${value}g`;
            },
          }
        : false,
    },
  };

  const data = hasMacros
    ? {
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
      }
    : {
        labels: ["No Data"],
        datasets: [
          {
            data: [1],
            backgroundColor: ["#2a2a2a"],
            borderColor: ["#444"],
            borderWidth: 1,
          },
        ],
      };
  return (
    <div className="w-full h-44 mx-auto">
      <Doughnut data={data} options={options} />
      {!hasMacros && (
        <p className="text-xs text-center opacity-60 mt-2 text-accent font-semibold">
          Set your macro goals in Nutrition
        </p>
      )}
    </div>
  );
};

export default Doughnutgraph;
