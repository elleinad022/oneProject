import React from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
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
} from "../slices/bodyweightApiSlice";

import {
  useUpdateUserCalorieGoalMutation,
  useUpdateUserWaterGoalMutation,
} from "../slices/usersApiSlice";

import Linegraph from "../components/Linegraph";
import Doughnutgraph from "../components/Doughnutgraph";
import Bargraph from "../components/Bargraph";
const Nutrition = () => {
  const { data, isLoading } = useGetTodayCaloriesQuery();
  const calorieEntries = data?.todayLog?.entries;
  console.log(calorieEntries);

  return (
    <Navbar>
      <div className="grid grid-flow-row grid-cols-2 gap-2">
        <div className="bg-base-200 rounded-box mt-4 p-4 w-2xl">
          <Linegraph></Linegraph>
          <div className="flex flex-row">
            <Doughnutgraph></Doughnutgraph>
            <Bargraph></Bargraph>
          </div>
        </div>
        <div className="bg-base-200 rounded-box mt-4 p-4 w-2xl">
          <Linegraph></Linegraph>
        </div>
        <div className="bg-base-200 rounded-box mb-4 p-4 w-full col-span-2">
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
                <input type="text" className="input" />

                <label className="label">Calories</label>
                <input type="text" className="input" />

                <label className="label">Protein</label>
                <input type="text" className="input" />

                <label className="label">Carbs</label>
                <input type="text" className="input" />

                <label className="label">Fats</label>
                <input type="text" className="input" />

                <button type="button" className="btn btn-primary">
                  Add entry
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
                <button type="button" className="col-span-2 btn btn-secondary">
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
