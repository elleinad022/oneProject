import React from "react";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { useGetTrackersQuery } from "../slices/personalRecordSlice";

const PersonalRecords = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetTrackersQuery();

  const hasData = data?.trackers?.length > 0;

  const recordsOverview = data?.trackers?.map((tracker) => {
    const latestEntry =
      tracker.entries?.length > 0
        ? tracker.entries[tracker.entries.length - 1]
        : null;

    const formattedDate = latestEntry?.loggedAt
      ? new Date(latestEntry?.loggedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "";

    return {
      _id: tracker._id,
      exercise: tracker.exercise,
      unit: tracker.unit,
      latestValue: latestEntry?.value ?? null,
      loggedAt: formattedDate ?? null,
      note: latestEntry?.note ?? null,
    };
  });

  if (isLoading) {
    return (
      <div className="w-full max-w-lg h-[200px] mx-auto flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  return (
    <ul className="list bg-base-300 rounded-xl shadow-md w-full max-h-full overflow-y-auto">
      <li
        className={
          hasData
            ? "p-4 pb-2 text-lg tracking-wide"
            : "p-4 pb-2 text-lg text-accent opacity-70"
        }>
        {hasData
          ? "Records Overview"
          : "No data yet. Log your first PR in Records!"}
      </li>
      {recordsOverview.map((tracker) => {
        return (
          <li key={tracker._id} className="list-row flex items-center">
            <div className="flex flex-col flex-1 min-w-0 list-col-grow">
              <div className="uppercase">{tracker.exercise}</div>
              <div className="text-xs uppercase font-semibold text-secondary">
                Latest record: {tracker.latestValue} {tracker.unit}
              </div>
              <div className="text-xs uppercase font-medium opacity-60 text-secondary">
                {tracker.loggedAt}
              </div>
            </div>
            <div className="text-xs uppercase font-medium opacity-60 text-secondary truncate max-w-[50%]">
              {tracker.note}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PersonalRecords;
