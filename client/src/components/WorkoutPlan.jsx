import React from "react";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { updateWorkoutIndexes } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetWorkoutProgramQuery,
  useAdvanceWorkoutIndexMutation,
  useResetWorkoutIndexesMutation,
} from "../slices/workoutPlanApiSlice";

const WorkoutPlan = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetWorkoutProgramQuery();

  const dispatch = useDispatch();
  const [advanceWorkoutIndex, { isLoading: isAdvancing }] =
    useAdvanceWorkoutIndexMutation();
  const [resetWorkoutIndex, { isLoading: isResetting }] =
    useResetWorkoutIndexesMutation();

  const hasData = data?.workoutPlan?.plan?.length > 0;

  const programSteps = data?.workoutPlan?.programSteps ?? [];
  const programTitle = data?.workoutPlan?.seo_title;

  const programLayout = programSteps.slice(userInfo?.workoutTrackingIndex ?? 0);

  if (isLoading) {
    return (
      <div className="w-full max-w-lg h-[200px] mx-auto flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const handleProgramAdvance = async () => {
    try {
      const res = await advanceWorkoutIndex().unwrap();
      dispatch(
        updateWorkoutIndexes({
          workoutTrackingIndex: res.workoutTrackingIndex,
          workoutWeekIndex: res.workoutWeekIndex,
        }),
      );
      toast.success("Program advanced successfully");
    } catch (error) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleProgramReset = async () => {
    if (!window.confirm("Reset workout progress to the beginning?")) return;
    try {
      const res = await resetWorkoutIndex().unwrap();
      dispatch(
        updateWorkoutIndexes({
          workoutTrackingIndex: res.workoutTrackingIndex,
          workoutWeekIndex: res.workoutWeekIndex,
        }),
      );
      toast.success("Reset Program successful");
    } catch (error) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="p-4 flex flex-row justify-between">
        <h1
          className={
            hasData
              ? "font-semibold truncate text-xl"
              : "font-semibold truncate text-xl text-accent opacity-70"
          }>
          {hasData
            ? programTitle
            : "No selected workout program yet. Select a program in Workout"}
        </h1>
        <button
          className="btn btn-neutral"
          type="button"
          disabled={isResetting || !hasData}
          onClick={handleProgramReset}>
          {isResetting ? "Resetting..." : "Reset Program"}
        </button>
      </div>
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Type</th>
            <th># Exercises</th>
            <th>Est. Duration </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {programLayout.map((step, index) => {
            const isCurrent = index === 0;
            const exerciseCount = step.exercises?.length ?? 0;
            const estimatedDuration =
              step.indexType === "workout"
                ? data?.workoutPlan?.schedule?.sessionDuration
                : 0;

            return (
              <tr key={step._id} className={isCurrent ? "bg-primary/10" : ""}>
                <td>
                  {step.indexType.charAt(0).toUpperCase() +
                    step.indexType.slice(1)}
                </td>
                <td>{exerciseCount}</td>
                <td>{estimatedDuration}</td>
                <td>
                  <button
                    className="btn btn-circle"
                    disabled={!isCurrent || isAdvancing}
                    type="button"
                    onClick={handleProgramAdvance}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24">
                      <path
                        fill="#FF79C6"
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutPlan;
