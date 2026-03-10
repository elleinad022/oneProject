import React from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  useCreateProgressTrackerMutation,
  useDeleteProgressTrackerMutation,
  useGetTrackersQuery,
  useAddProgressEntryMutation,
  useDeleteProgressEntryMutation,
  useUpdateProgressEntryMutation,
} from "../slices/personalRecordSlice";
const Records = () => {
  const { data, isLoading } = useGetTrackersQuery();
  const exerciseTrackers = data?.trackers;

  return (
    <Navbar>
      <div className="relative h-full">
        <div
          className="tooltip tooltip-left absolute z-99 bottom-30 right-0"
          data-tip="Add Tracker">
          <button className="btn btn-circle btn-primary btn-xl ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24">
              <path
                fill="#000"
                d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 py-4">
          {exerciseTrackers?.map((tracker) => {
            const latestEntry = tracker.entries?.[tracker.entries.length - 1];
            const formatDate = (date) =>
              new Date(date).toLocaleDateString("en-us", {
                year: "numeric",
                month: "short",
                day: "numeric",
              });
            return (
              <div
                className="card card-border bg-base-100 w-74"
                key={tracker._id}>
                <div className="card-body">
                  <h2 className="card-title text-primary font-bold">
                    {tracker.exercise
                      ?.toLowerCase()
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </h2>
                  <p>
                    Latest Record:{" "}
                    {latestEntry
                      ? `${latestEntry.value} ${tracker.unit}`
                      : "No records yet"}{" "}
                    <br />
                    <span className="text-xs opacity-60">
                      {latestEntry ? formatDate(latestEntry.loggedAt) : ""}
                    </span>
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-soft btn-secondary">
                      History
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Navbar>
  );
};

export default Records;
