import React from "react";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { useGetWaterTodayLogQuery } from "../slices/waterApiSlice";

const Water = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const goalWater = userInfo?.dailyWaterGoal;

  const { data, isLoading } = useGetWaterTodayLogQuery();
  if (isLoading) {
    return (
      <div className="w-full max-w-lg h-[200px] mx-auto flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  const waterConsumedToday = data.todayWaterLog.waterConsumed;

  const calculateProgressDetails = (goalWater, waterConsumedToday) => {
    if (!goalWater || !waterConsumedToday) return { percentageConsumed: 0 };

    const percentageConsumed = Math.round(
      (waterConsumedToday / goalWater) * 100,
    );

    return { percentageConsumed };
  };

  const { percentageConsumed } = calculateProgressDetails(
    goalWater,
    waterConsumedToday,
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="w-full text-center bg-base-100 mb-4 rounded-xl">
        Water Intake
      </h2>
      <div className="flex flex-row gap-x-5">
        <div
          className="radial-progress"
          style={{
            "--value": percentageConsumed,
            "--size": "4rem",
            "--thickness": "2px",
          }}
          aria-valuenow={70}
          role="progressbar">
          {percentageConsumed}%
        </div>
        <p className="text-zinc-400 text-md mt-4">
          {waterConsumedToday}ML/{goalWater}ML
        </p>
      </div>
    </div>
  );
};

export default Water;
