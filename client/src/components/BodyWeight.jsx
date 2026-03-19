import React from "react";
import { useSelector } from "react-redux";
import { useGetBodyWeightLatestQuery } from "../slices/bodyweightApiSlice";
import Loader from "./Loader";

const BodyWeight = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const goalWeight = userInfo?.goalWeight;
  const currentWeight = userInfo?.currentWeight;
  const startWeight = userInfo?.startWeight;

  const { data, isLoading } = useGetBodyWeightLatestQuery();

  if (isLoading) {
    return (
      <div className="w-full max-w-lg h-[200px] mx-auto flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const latestLoggedAt = data?.latestBodyWeightLog?.loggedAt;
  const formattedDate = latestLoggedAt
    ? new Date(latestLoggedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "---";

  const calculateProgressDetails = (startWeight, currentWeight, goalWeight) => {
    if (startWeight == null || currentWeight == null || goalWeight == null)
      return { moved: 0, total: 0, percentage: 0 };

    const isLosingWeight = startWeight > goalWeight;

    const totalDifference = Math.abs(goalWeight - startWeight);
    const movedDifference = isLosingWeight
      ? startWeight - currentWeight
      : currentWeight - startWeight;

    const percentageOfMovedWeight = Math.round(
      Math.max(0, Math.min((movedDifference / totalDifference) * 100, 100)),
    );

    return {
      movedWeight: movedDifference,
      totalWeightToMove: totalDifference,
      percentageOfMovedWeight,
    };
  };

  const { movedWeight, totalWeightToMove, percentageOfMovedWeight } =
    calculateProgressDetails(startWeight, currentWeight, goalWeight);

  return (
    <div className="stats stats-vertical shadow">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2">
              <path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
              <path d="M12 7c1.956 0 3.724.802 5 2.095l-2.956 2.904a3 3 0 0 0-2.038-.799a3 3 0 0 0-2.038.798L7.012 9.095a6.98 6.98 0 0 1 5-2.095" />
            </g>
          </svg>
        </div>
        <div className="stat-title">Goal Weight</div>
        <div className="stat-value text-primary">{goalWeight ?? "---"} KG</div>
        <div className="stat-desc">
          Progress: {percentageOfMovedWeight}% ({movedWeight}kg/
          {totalWeightToMove}kg)
        </div>
        <progress
          className="progress progress-primary w-full"
          value={percentageOfMovedWeight}
          max={100}></progress>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        </div>
        <div className="stat-title">Latest Weight Log</div>
        <div className="stat-value text-secondary">
          {currentWeight ?? "---"} KG
        </div>
        <div className="stat-desc">Logged At: {formattedDate}</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-white">
          {currentWeight > startWeight ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2">
                <path stroke-dasharray="20" d="M12 21l0 -17.5">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.3s"
                    values="20;0"
                  />
                </path>
                <path
                  stroke-dasharray="12"
                  stroke-dashoffset="12"
                  d="M12 3l7 7M12 3l-7 7">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.3s"
                    dur="0.2s"
                    to="0"
                  />
                </path>
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2">
                <path stroke-dasharray="20" d="M12 3l0 17.5">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.3s"
                    values="20;0"
                  />
                </path>
                <path
                  stroke-dasharray="12"
                  stroke-dashoffset="12"
                  d="M12 21l7 -7M12 21l-7 -7">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.3s"
                    dur="0.2s"
                    to="0"
                  />
                </path>
              </g>
            </svg>
          )}
        </div>
        <div className="stat-title">Starting Weight</div>
        <div className="stat-value text-white">{startWeight ?? "---"} KG</div>
        <div className="stat-desc">
          Weight Status: {currentWeight > startWeight ? "Gaining" : "Losing"}
        </div>
      </div>
    </div>
  );
};

export default BodyWeight;
