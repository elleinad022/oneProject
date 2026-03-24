import { Bar } from "react-chartjs-2";
import { useGetTodayCaloriesQuery } from "../slices/caloriesApiSlice";
import Loader from "./Loader";

const Bargraph = () => {
  const secondary = "#BD93F9";
  const primary = "#FF79C6";
  const accent = "#6272A4";

  const { data: calTodayData, isLoading } = useGetTodayCaloriesQuery();
  if (isLoading) {
    return (
      <div className="w-full max-w-lg h-[200px] mx-auto flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  const macrosConsumed = {
    protein: calTodayData?.todayLog?.proteinConsumed ?? 0,
    carbs: calTodayData?.todayLog?.carbsConsumed ?? 0,
    fats: calTodayData?.todayLog?.fatsConsumed ?? 0,
  };

  const hasData =
    macrosConsumed.protein > 0 ||
    macrosConsumed.carbs > 0 ||
    macrosConsumed.fats > 0;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: hasData ? "Consumed Today" : "No Data Yet",
      },
      tooltip: {
        enabled: hasData,
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return `Consumed: ${value} g`;
          },
        },
      },
    },
  };
  const data = {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        label: "Consumed",
        data: [
          macrosConsumed.protein,
          macrosConsumed.carbs,
          macrosConsumed.fats,
        ],
        backgroundColor: [primary, secondary, accent],
        borderColor: [primary, secondary, accent],
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <div className="relative w-full h-44 mx-auto">
      <Bar data={data} options={options} />
      {!hasData && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm text-accent opacity-70 bg-base-200 px-3 py-1 rounded shadow">
            No data yet. Start logging your meals!{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default Bargraph;
