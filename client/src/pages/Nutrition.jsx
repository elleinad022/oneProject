import React from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  useGetWeeklyCaloriesQuery,
  useGetTodayCaloriesQuery,
  useInitTodayCaloriesQuery,
  useAddMealEntryMutation,
  useDeleteMealEntryMutation,
  useUpdateMealEntryMutation,
} from "../slices/caloriesApiSlice";

import {
  useInitTodayWaterLogQuery,
  useAddWaterEntryMutation,
  useGetWaterTodayLogQuery,
  useGetWaterWeekLogQuery,
  useDeleteWaterEntryMutation,
  useUpdateWaterEntryMutation,
} from "../slices/waterApiSlice";

import {
  useGetBodyWeightGoalQuery,
  useSetBodyWeightGoalMutation,
  useGetBodyWeightLatestQuery,
  useGetBodyWeightHistoryQuery,
  useLogBodyWeightMutation,
  useDeleteBodyWeightMutation,
} from "../slices/bodyweightApiSlice";

import {
  useUpdateUserCalorieGoalMutation,
  useUpdateUserWaterGoalMutation,
} from "../slices/usersApiSlice";

import Linegraph from "../components/Linegraph";
import Doughnutgraph from "../components/Doughnutgraph";
import Bargraph from "../components/Bargraph";
import Water from "../components/Water";
import { setCredentials } from "../slices/authSlice";
const Nutrition = () => {
  const { data: calData, isLoading: loadingCal } = useGetTodayCaloriesQuery();
  const calorieEntries = calData?.todayLog?.entries;
  const { data: waterData, isLoading: loadingWater } =
    useGetWaterTodayLogQuery();
  const { data: bodyweightData, isLoading: loadingBodyweight } =
    useGetBodyWeightHistoryQuery();

  const [updateWaterGoal, { isLoading: isUpdatingWaterGoal }] =
    useUpdateUserWaterGoalMutation();
  const [addWaterEntry, { isLoading: isAddingWaterEntry }] =
    useAddWaterEntryMutation();
  const [deleteWaterEntry, { isLoading: isDeletingWaterEntry }] =
    useDeleteWaterEntryMutation();
  const [updateWaterEntry, { isLoading: isUpdatingWaterEntry }] =
    useUpdateWaterEntryMutation();
  const [updateGoalAndStartingWeight, { isLoading: isUpdatingWeightGoals }] =
    useSetBodyWeightGoalMutation();
  const [addWeightEntry, { isLoading: isAddingWeightEntry }] =
    useLogBodyWeightMutation();
  const [deleteWeightEntry, { isLoading: isDeletingWeightEntry }] =
    useDeleteBodyWeightMutation();
  const [addMealEntry, { isLoading: isAddingMealEntry }] =
    useAddMealEntryMutation();

  const [newWaterGoal, setNewWaterGoal] = useState("");
  const [waterEntry, setWaterEntry] = useState("");
  const [editingWaterEntry, setEditingWaterEntry] = useState(null);
  const [editedWaterAmount, setEditedWaterAmount] = useState("");
  const [newStartingWeight, setNewStartingWeight] = useState("");
  const [newGoalWeight, setNewGoalWeight] = useState("");
  const [weightEntry, setWeightEntry] = useState("");
  const [mealEntryDescription, setMealEntryDescription] = useState("");
  const [mealEntryCalories, setMealEntryCalories] = useState("");
  const [mealEntryProtein, setMealEntryProtein] = useState("");
  const [mealEntryCarbs, setMealEntryCarbs] = useState("");
  const [mealEntryFats, setMealEntryFats] = useState("");

  const waterEntries = waterData?.todayWaterLog?.entries;
  const bodyweightEntries = bodyweightData?.bodyWeightLogs;

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleUpdateWaterButton = async () => {
    try {
      const parsedWaterGoal = newWaterGoal !== "" ? Number(newWaterGoal) : null;

      if (parsedWaterGoal !== null && parsedWaterGoal <= 0) {
        toast.error("Valid amount of water goal is required");
        return;
      }

      await updateWaterGoal({ dailyWaterGoal: parsedWaterGoal }).unwrap();

      dispatch(
        setCredentials({
          ...userInfo,
          dailyWaterGoal: parsedWaterGoal,
        }),
      );

      toast.success("Daily water goal updated successfully");

      setNewWaterGoal("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleAddWaterEntryButton = async () => {
    try {
      const parsedWaterEntry = waterEntry !== "" ? Number(waterEntry) : null;

      if (!parsedWaterEntry || parsedWaterEntry <= 0) {
        toast.error("Valid amount of water entry is required");
        return;
      }

      await addWaterEntry({ waterAmount: parsedWaterEntry }).unwrap();

      toast.success("Water entry added successfully");
      setWaterEntry("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleWaterEntryEditButton = async (entry) => {
    setEditingWaterEntry(entry);
    setEditedWaterAmount(entry.waterAmount);
  };

  const handleDeleteWaterEntryButton = async (entry) => {
    try {
      await deleteWaterEntry({ entryId: entry._id }).unwrap();
      toast.success("Water Entry deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleSaveWaterEditButton = async () => {
    try {
      const parsedAmount = Number(editedWaterAmount);

      if (!parsedAmount || parsedAmount <= 0) {
        toast.error("Valid amount of water is required");
        return;
      }

      await updateWaterEntry({
        entryId: editingWaterEntry._id,
        waterAmount: parsedAmount,
      }).unwrap();

      toast.success("Water entry updated");

      setEditingWaterEntry(null);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleUpdateWeightGoalButton = async () => {
    try {
      const parsedWeightGoal =
        newGoalWeight !== "" ? Number(newGoalWeight) : null;
      const parsedStartingWeight =
        newStartingWeight !== "" ? Number(newStartingWeight) : null;

      if (
        (parsedWeightGoal !== null && parsedWeightGoal <= 0) ||
        (parsedStartingWeight !== null && parsedStartingWeight <= 0)
      ) {
        toast.error("Valid weight goal and starting weight is required");
        return;
      }

      await updateGoalAndStartingWeight({
        goalWeight: parsedWeightGoal,
        startWeight: parsedStartingWeight,
      }).unwrap();

      dispatch(
        setCredentials({
          ...userInfo,
          goalWeight: parsedWeightGoal,
          startWeight: parsedStartingWeight,
        }),
      );

      toast.success("Weight goal and starting weight updates successfully");
      setNewGoalWeight("");
      setNewStartingWeight("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleAddWeightEntryButton = async () => {
    try {
      const parsedWeightEntry = weightEntry !== "" ? Number(weightEntry) : null;

      if (!parsedWeightEntry || parsedWeightEntry <= 0) {
        toast.error("Valid weight entry is required");
        return;
      }

      await addWeightEntry({ weight: parsedWeightEntry }).unwrap();

      toast.success("Bodyweight entry for today added successfully");
      setWeightEntry("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDeleteWeightEntryButton = async () => {
    try {
      await deleteWeightEntry().unwrap();
      toast.success("Bodyweight log for today deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleAddMealEntryButton = async () => {
    try {
      const parsedMealEntryDescription =
        mealEntryDescription !== "" ? String(mealEntryDescription) : null;
      const parsedMealEntryCalories =
        mealEntryCalories !== "" ? Number(mealEntryCalories) : null;
      const parsedMealEntryProtein =
        mealEntryProtein !== "" ? Number(mealEntryProtein) : null;
      const parsedMealEntryCarbs =
        mealEntryCarbs !== "" ? Number(mealEntryCarbs) : null;
      const parsedMealEntryFats =
        mealEntryFats !== "" ? Number(mealEntryFats) : null;

      if (
        [
          parsedMealEntryCalories,
          parsedMealEntryProtein,
          parsedMealEntryCarbs,
          parsedMealEntryFats,
        ].some((e) => !e || e <= 0)
      ) {
        toast.error("Valid meal details are required");
        return;
      }

      if (!parsedMealEntryDescription) {
        toast.error("Meal description is required");
        return;
      }

      await addMealEntry({
        description: parsedMealEntryDescription,
        calories: parsedMealEntryCalories,
        protein: parsedMealEntryProtein,
        carbs: parsedMealEntryCarbs,
        fats: parsedMealEntryFats,
      }).unwrap();

      toast.success("Meal entry added successfully");
      setMealEntryDescription("");
      setMealEntryCalories("");
      setMealEntryProtein("");
      setMealEntryCarbs("");
      setMealEntryFats("");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Navbar>
      <div className="grid grid-flow-row grid-cols-2 gap-2">
        {/* Water section */}
        <div className="bg-base-200 rounded-box mt-2 p-4 w-2xl flex flex-col gap-4">
          <Linegraph type="water"></Linegraph>
          <div className="flex flex-row justify-between">
            <Water></Water>
            <div>
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-54 border p-4 max-h-[29vh] overflow-auto">
                <legend className="fieldset-legend">Edit water goal</legend>

                <label className="label">Water Amount</label>
                <input
                  type="number"
                  min={0}
                  className="input no-spinner"
                  value={newWaterGoal}
                  onChange={(e) => setNewWaterGoal(e.target.value)}
                  placeholder="milliliters"
                />

                <button
                  type="button"
                  className="btn btn-outline btn-secondary"
                  disabled={isUpdatingWaterGoal}
                  onClick={handleUpdateWaterButton}>
                  {isUpdatingWaterGoal ? "Updating" : "Update Goal"}
                </button>
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-54 border p-4 max-h-[29vh] overflow-auto">
                <legend className="fieldset-legend">
                  Add/Edit water entry
                </legend>

                <button
                  type="button"
                  className="btn btn-soft btn-primary mt-6"
                  onClick={() =>
                    document.getElementById("add_entry_modal").showModal()
                  }>
                  Add entry
                </button>
                <dialog id="add_entry_modal" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Entry</h3>
                    <p className="py-4">
                      Press ESC key or click outside to close
                    </p>
                    <div className="flex w-full items-center justify-center">
                      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 max-h-[29vh] overflow-auto">
                        <label className="label">Water Amount</label>
                        <input
                          type="number"
                          className="input w-full no-spinner"
                          value={waterEntry}
                          onChange={(e) => setWaterEntry(e.target.value)}
                          placeholder="milliliters"
                        />

                        <button
                          disabled={isAddingWaterEntry}
                          type="button"
                          className="btn btn-outline btn-primary"
                          onClick={handleAddWaterEntryButton}>
                          {isAddingWaterEntry ? "Adding entry" : "Log entry"}
                        </button>
                      </fieldset>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>

                <button
                  type="button"
                  className="btn btn-soft"
                  onClick={() =>
                    document.getElementById("edit_entry_modal").showModal()
                  }>
                  Edit entry
                </button>
                <dialog id="edit_entry_modal" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Entry</h3>
                    <p className="py-4">
                      Press ESC key or click outside to close
                    </p>
                    <div className="flex-1 overflow-auto max-h-[29vh] ">
                      <table className="table">
                        {/* head */}
                        <thead>
                          <tr>
                            <th>Water Entries Today</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody className="overflow-auto">
                          {waterEntries?.length > 0 ? (
                            waterEntries?.map((entry) => (
                              <tr key={entry._id}>
                                <td>
                                  {editingWaterEntry?._id === entry._id ? (
                                    <input
                                      type="number"
                                      className="input w-48 no-spinner"
                                      value={editedWaterAmount}
                                      onChange={(e) =>
                                        setEditedWaterAmount(e.target.value)
                                      }
                                    />
                                  ) : (
                                    <>{entry.waterAmount} ml</>
                                  )}
                                </td>
                                <td>
                                  {new Date(entry.time).toLocaleTimeString(
                                    "en-us",
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    },
                                  )}
                                </td>

                                <td>
                                  {editingWaterEntry?._id === entry._id ? (
                                    <>
                                      <button
                                        disabled={isUpdatingWaterEntry}
                                        onClick={handleSaveWaterEditButton}
                                        type="button"
                                        className="btn btn-circle btn-outline btn-secondary tooltip"
                                        data-tip="Save">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="32"
                                          height="32"
                                          viewBox="0 0 24 24">
                                          <g
                                            fill="none"
                                            stroke="#fff"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2">
                                            <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                                            <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7M7 3v4a1 1 0 0 0 1 1h7" />
                                          </g>
                                        </svg>
                                      </button>
                                      <button
                                        onClick={() =>
                                          setEditingWaterEntry(null)
                                        }
                                        type="button"
                                        className="btn btn-circle tooltip"
                                        data-tip="Cancel">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="32"
                                          height="32"
                                          viewBox="0 0 48 48">
                                          <path
                                            fill="#d50000"
                                            d="M24 6C14.1 6 6 14.1 6 24s8.1 18 18 18s18-8.1 18-18S33.9 6 24 6m0 4c3.1 0 6 1.1 8.4 2.8L12.8 32.4C11.1 30 10 27.1 10 24c0-7.7 6.3-14 14-14m0 28c-3.1 0-6-1.1-8.4-2.8l19.6-19.6C36.9 18 38 20.9 38 24c0 7.7-6.3 14-14 14"
                                          />
                                        </svg>
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() =>
                                          handleWaterEntryEditButton(entry)
                                        }
                                        type="button"
                                        className="btn btn-circle tooltip"
                                        data-tip="Edit">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24">
                                          <g
                                            fill="none"
                                            stroke="#fff"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2">
                                            <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                                            <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                                          </g>
                                        </svg>
                                      </button>
                                      <button
                                        disabled={isDeletingWaterEntry}
                                        onClick={() =>
                                          handleDeleteWaterEntryButton(entry)
                                        }
                                        type="button"
                                        className="btn btn-circle tooltip"
                                        data-tip="Delete">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="32"
                                          height="32"
                                          viewBox="0 0 24 24">
                                          <path
                                            fill="#fff"
                                            d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                                          />
                                        </svg>
                                      </button>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={5}
                                className="text-center p-10 text-2xl text-accent opacity-60 animate-pulse">
                                No Water Entries Yet
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </fieldset>
            </div>
          </div>
        </div>

        {/* Bodyweight section */}
        <div className="bg-base-200 rounded-box mt-2 p-4 w-2xl">
          <div className="flex flex-row justify-between">
            <div className="max-w-2xs">
              <div className="flex flex-row gap-2 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24">
                  <g
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2">
                    <path d="M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
                    <path d="M12 7c1.956 0 3.724.802 5 2.095l-2.956 2.904a3 3 0 0 0-2.038-.799a3 3 0 0 0-2.038.798L7.012 9.095a6.98 6.98 0 0 1 5-2.095" />
                  </g>
                </svg>
                <h2 className="opacity-70 text-lg">Bodyweight</h2>
              </div>
              <ul className="timeline timeline-vertical">
                <li>
                  <div className="timeline-start">
                    {userInfo.startWeight} Kilograms
                  </div>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box">
                    Starting Weight
                  </div>
                  <hr />
                </li>
                {bodyweightEntries?.map((log) => (
                  <li>
                    <hr />
                    <div className="timeline-start">{log.weight} Kilograms</div>
                    <div className="timeline-middle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="timeline-end timeline-box">
                      {new Date(log.loggedAt).toLocaleDateString("en-us", {
                        day: "numeric",
                        month: "short",
                      })}
                    </div>
                    <hr />
                  </li>
                ))}
                <li>
                  <hr />
                  <div className="timeline-start">
                    {userInfo.goalWeight} Kilograms
                  </div>
                  <div className="timeline-middle">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-5 w-5">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="timeline-end timeline-box">Goal Weight</div>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-72 border p-4 max-h-[29vh] overflow-auto">
                  <legend className="fieldset-legend">
                    Edit bodyweight goal and starting weight
                  </legend>

                  <input
                    type="number"
                    min={0}
                    className="input no-spinner"
                    value={newGoalWeight}
                    onChange={(e) => setNewGoalWeight(e.target.value)}
                    placeholder="Goal Weight in Kg"
                  />

                  <input
                    type="number"
                    min={0}
                    className="input no-spinner"
                    value={newStartingWeight}
                    onChange={(e) => setNewStartingWeight(e.target.value)}
                    placeholder="Starting Weight in Kg"
                  />

                  <button
                    type="button"
                    className="btn btn-outline btn-secondary"
                    onClick={() =>
                      document
                        .getElementById("weight_goal_confirm_modal")
                        .showModal()
                    }>
                    Update Goal
                  </button>

                  <dialog id="weight_goal_confirm_modal" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">
                        Update Goal and Starting Weight
                      </h3>
                      <p className="py-4">
                        Press ESC key or click outside to close
                      </p>
                      <div className="flex flex-row justify-center items-center">
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 max-h-[29vh] overflow-auto">
                          <label className="label">
                            Are you sure you want to update/reset starting and
                            goal weight?
                          </label>

                          <div className="flex flex-row justify-around">
                            <button
                              type="button"
                              className="btn btn-primary"
                              disabled={isUpdatingWeightGoals}
                              onClick={handleUpdateWeightGoalButton}>
                              {isUpdatingWeightGoals ? "Updating" : "Confirm"}
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline"
                              onClick={() =>
                                document
                                  .getElementById("weight_goal_confirm_modal")
                                  .close()
                              }>
                              Cancel
                            </button>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </fieldset>
              </div>
              <div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-72 border p-4 max-h-[29vh] overflow-auto">
                  <legend className="fieldset-legend">
                    Add/Delete bodyweight log
                  </legend>

                  <button
                    type="button"
                    className="btn btn-soft btn-primary"
                    onClick={() =>
                      document.getElementById("add_bwlog_modal").showModal()
                    }>
                    Add Log
                  </button>
                  <dialog id="add_bwlog_modal" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Add Bodyweight Log</h3>
                      <p className="py-4">
                        Press ESC key or click outside to close
                      </p>
                      <div className="flex w-full items-center justify-center">
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 max-h-[29vh] overflow-auto">
                          <label className="label">
                            One (1) bodyweight log can exist per day
                          </label>
                          <input
                            type="number"
                            className="input w-full no-spinner"
                            value={weightEntry}
                            onChange={(e) => setWeightEntry(e.target.value)}
                            placeholder="Kilograms"
                          />

                          <button
                            disabled={isAddingWeightEntry}
                            type="button"
                            className="btn btn-outline btn-primary"
                            onClick={handleAddWeightEntryButton}>
                            {isAddingWeightEntry
                              ? "Adding entry"
                              : "Log bodyweight"}
                          </button>
                        </fieldset>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>

                  <button
                    type="button"
                    className="btn btn-soft "
                    onClick={() =>
                      document.getElementById("delete_bwlog_modal").showModal()
                    }>
                    Delete Log
                  </button>
                  <dialog id="delete_bwlog_modal" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">
                        Delete Bodyweight Log
                      </h3>
                      <p className="py-4">
                        Press ESC key or click outside to close
                      </p>
                      <div className="flex w-full items-center justify-center">
                        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 max-h-[29vh] overflow-auto">
                          <label className="label">
                            Are you sure you want to delete today's bodyweight
                            log?
                          </label>

                          <div className="flex flex-row justify-around">
                            <button
                              disabled={isDeletingWeightEntry}
                              type="button"
                              className="btn btn-primary"
                              onClick={handleDeleteWeightEntryButton}>
                              {isDeletingWeightEntry ? "Deleting" : "Confirm"}
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline"
                              onClick={() =>
                                document
                                  .getElementById("delete_bwlog_modal")
                                  .close()
                              }>
                              Cancel
                            </button>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </fieldset>
              </div>
            </div>
          </div>
        </div>

        {/* Calories/Meals section */}
        <div className="bg-base-200 rounded-box mb-2 p-4 w-full col-span-2">
          <div>
            <div className="flex gap-6">
              <div className="flex-1 overflow-auto max-h-[29vh] ">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Meal Entries Today</th>
                      <th>Calories</th>
                      <th>Protein</th>
                      <th>Carbs</th>
                      <th>Fats</th>
                    </tr>
                  </thead>
                  <tbody className="overflow-auto">
                    {calorieEntries?.length > 0 ? (
                      calorieEntries?.map((entry) => (
                        <tr key={entry._id}>
                          <td>{entry.description}</td>
                          <td>{entry.calories}</td>
                          <td>{entry.protein}</td>
                          <td>{entry.carbs}</td>
                          <td>{entry.fats}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-circle tooltip"
                              data-tip="Edit">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24">
                                <g
                                  fill="none"
                                  stroke="#fff"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2">
                                  <path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
                                  <path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3" />
                                </g>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center p-10 text-2xl text-accent opacity-60 animate-pulse">
                          No Meal Entries Yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 max-h-[29vh] overflow-auto">
                <legend className="fieldset-legend">Add meal entry</legend>

                <label className="label">Description</label>
                <input
                  type="text"
                  className="input"
                  value={mealEntryDescription}
                  onChange={(e) => setMealEntryDescription(e.target.value)}
                />

                <label className="label">Calories</label>
                <input
                  type="number"
                  className="input no-spinner"
                  value={mealEntryCalories}
                  onChange={(e) => setMealEntryCalories(e.target.value)}
                />

                <label className="label">Protein</label>
                <input
                  type="number"
                  className="input no-spinner"
                  value={mealEntryProtein}
                  onChange={(e) => setMealEntryProtein(e.target.value)}
                />

                <label className="label">Carbs</label>
                <input
                  type="number"
                  className="input no-spinner"
                  value={mealEntryCarbs}
                  onChange={(e) => setMealEntryCarbs(e.target.value)}
                />

                <label className="label">Fats</label>
                <input
                  type="number"
                  className="input no-spinner"
                  value={mealEntryFats}
                  onChange={(e) => setMealEntryFats(e.target.value)}
                />

                <button
                  type="button"
                  className="btn btn-soft btn-primary"
                  disabled={isAddingMealEntry}
                  onClick={handleAddMealEntryButton}>
                  {isAddingMealEntry ? "Adding Entry" : "Add entry"}
                </button>
              </fieldset>
            </div>
            <div className="fieldset"></div>
          </div>
          <div className="divider m-0"></div>
          <div className="flex flex-row">
            <div className="flex-1 max-w-1/2">
              <h3 className="text-lg opacity-80 pb-4">Edit goal macros</h3>
              <div className="grid grid-cols-2 grid-rows-2 gap-2">
                <label className="input">
                  <span className="label">Calories</span>
                  <input type="text" placeholder="Total" />
                </label>
                <label className="input">
                  <span className="label">Protein</span>
                  <input type="text" placeholder="grams" />
                </label>
                <label className="input">
                  <span className="label">Carbs</span>
                  <input type="text" placeholder="grams" />
                </label>
                <label className="input">
                  <span className="label">Fats</span>
                  <input type="text" placeholder="grams" />
                </label>
                <button
                  type="button"
                  className="col-span-2 btn btn-outline btn-secondary">
                  Update Goal Macros
                </button>
              </div>
            </div>
            <div className="flex flex-row">
              <Doughnutgraph></Doughnutgraph>
              <Bargraph></Bargraph>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Nutrition;
