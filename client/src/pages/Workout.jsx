import React from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  useGetWorkoutProgramQuery,
  useInitWorkoutPreferencesMutation,
  useUpdateWorkoutPreferencesMutation,
} from "../slices/workoutPlanApiSlice";
import { updateWorkoutIndexes } from "../slices/authSlice";

const Workout = () => {
  const [updateWorkoutPreferences, { isLoading: isUpdating }] =
    useUpdateWorkoutPreferencesMutation();
  const [initWorkoutPreferences, { isLoading: isInitializing }] =
    useInitWorkoutPreferencesMutation();
  const { data, isLoading } = useGetWorkoutProgramQuery();
  const dispatch = useDispatch();
  const currentPlan = data?.workoutPlan;

  const [daysPerWeek, setDaysPerWeek] = useState("");
  const [sessionDuration, setSessionDuration] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [primaryGoal, setPrimaryGoal] = useState("");
  const [preferences, setPreferences] = useState("");

  const appliedPlan = data?.workoutPlan?.plan;
  console.log(appliedPlan);

  const handleUpdateButton = async () => {
    if (daysPerWeek && (daysPerWeek < 2 || daysPerWeek > 6)) {
      toast.error("Workout days must be between 2 and 6");
      return;
    }

    if (sessionDuration && (sessionDuration < 30 || sessionDuration > 120)) {
      toast.error("Session duration must be between 30 and 120 minutes");
      return;
    }
    try {
      const payload = {
        daysPerWeek: daysPerWeek || currentPlan.schedule.daysPerWeek,
        sessionDuration:
          sessionDuration || currentPlan.schedule.sessionDuration,
        fitnessLevel: fitnessLevel || currentPlan.fitnessLevel,
        primaryGoal: primaryGoal || currentPlan.goal,
        preferences: preferences || currentPlan.preferences,
      };

      await updateWorkoutPreferences(payload).unwrap();

      dispatch(
        updateWorkoutIndexes({
          workoutTrackingIndex: 0,
          workoutWeekIndex: 0,
        }),
      );

      toast.success("Workout preferences updated successfully");
      setDaysPerWeek("");
      setSessionDuration("");
      setFitnessLevel("");
      setPrimaryGoal("");
      setPreferences("");
    } catch (error) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <Navbar>
        <div className="grid grid-flow-row grid-cols-2 gap-2">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4">
            <legend className="fieldset-legend text-lg">
              Current preferences
            </legend>

            <h2 className="label text-lg">Workout days per week</h2>
            <p className="text-sm">
              {data?.workoutPlan?.schedule?.daysPerWeek} Days
            </p>
            <div className="divider m-0"></div>
            <h2 className="label text-lg">Session Duration</h2>
            <p className="text-sm">
              {data?.workoutPlan?.schedule?.sessionDuration} Minutes
            </p>
            <div className="divider m-0"></div>
            <h2 className="label text-lg">Fitness Level</h2>
            <p className="text-sm">{data?.workoutPlan?.fitnessLevel}</p>
            <div className="divider m-0"></div>
            <h2 className="label text-lg">Primary Goal</h2>
            <p className="text-sm">{data?.workoutPlan?.goal}</p>
            <div className="divider m-0"></div>
            <h2 className="label text-lg">Preferences</h2>
            <p className="text-sm">{data?.workoutPlan?.preferences}</p>
            <div className="divider m-0"></div>
            <h2 className="label text-lg">Workout Program Title</h2>
            <p className="text-sm">{data?.workoutPlan?.seo_title}</p>
          </fieldset>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4">
            <legend className="fieldset-legend text-lg">
              Edit Preferences
            </legend>

            <label className="label">Workout days per week</label>
            <input
              type="number"
              min={2}
              max={6}
              className="input w-full no-spinner"
              value={daysPerWeek}
              onChange={(e) => setDaysPerWeek(Number(e.target.value))}
              placeholder="2 to 6 days"
            />

            <label className="label">Desired session duration</label>
            <input
              type="number"
              min={30}
              max={120}
              className="input w-full no-spinner"
              value={sessionDuration}
              onChange={(e) => setSessionDuration(Number(e.target.value))}
              placeholder="30 to 120 minutes"
            />

            <label className="label">Fitness Level</label>
            <select
              defaultValue="Choose fitness level"
              className="select"
              value={fitnessLevel}
              onChange={(e) => setFitnessLevel(e.target.value)}>
              <option value="" disabled={true}>
                Choose fitness level
              </option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <span className="label">Required</span>

            <label className="label">Primary Goal</label>
            <select
              defaultValue="Choose primary goal"
              className="select"
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}>
              <option value="" disabled={true}>
                Choose primary goal
              </option>
              <option>Muscle Gain</option>
              <option>Fat Loss</option>
              <option>Strength</option>
              <option>Endurance</option>
            </select>
            <span className="label">Required</span>

            <label className="label">Preferences</label>
            <select
              defaultValue="Choose preferences"
              className="select"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}>
              <option value="" disabled={true}>
                Choose preferences
              </option>
              <option>Bodybuilding</option>
              <option>Power building</option>
              <option>Hiit</option>
              <option>Functional Training</option>
              <option>Cardio</option>
              <option>General Fitness</option>
            </select>
            <span className="label">Optional</span>

            {(isUpdating || isInitializing || isLoading) && <Loader />}
            <button
              disabled={isUpdating}
              className="btn btn-primary"
              type="button"
              onClick={handleUpdateButton}>
              {isUpdating ? "Updating" : "Update Preferences"}
            </button>
          </fieldset>
          <div className="col-span-2 card w-full bg-base-100 card-xl shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Current Workout Plan</h2>
              <div className="bg-base-300 shadow-sm flex flex-row justify-around">
                {appliedPlan.map((dayPlan, index) => (
                  <div key={dayPlan._id}>
                    <h3 className="label">Workout Day {index + 1}</h3>

                    <ul>
                      {dayPlan.exercises.map((exercise, exerciseIndex) => (
                        <li className="text-sm border-t" key={exercise._id}>
                          {exercise.name} <br />
                          Reps: {exercise.repetitions} <br />
                          Sets: {exercise.sets} <br />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Workout;
