import React from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import {
  useCreateProgressTrackerMutation,
  useDeleteProgressTrackerMutation,
  useGetTrackersQuery,
  useAddProgressEntryMutation,
  useDeleteProgressEntryMutation,
  useUpdateProgressEntryMutation,
} from "../slices/personalRecordSlice";
const Records = () => {
  const historyModalRef = useRef(null);
  const trackerDeleteModalRef = useRef(null);
  const trackerAddModalRef = useRef(null);
  const trackerAddEntryModalRef = useRef(null);
  const { data, isLoading } = useGetTrackersQuery();
  const [deleteTrackerEntry, { isLoading: isDeletingTrackerEntry }] =
    useDeleteProgressEntryMutation();
  const [addTrackerEntry, { isLoading: isAddingTrackerEntry }] =
    useAddProgressEntryMutation();
  const [editTrackerEntry, { isLoading: isEditingTrackerEntry }] =
    useUpdateProgressEntryMutation();
  const [deleteTracker, { isLoading: isDeletingTracker }] =
    useDeleteProgressTrackerMutation();
  const [addTracker, { isLoading: isAddingTracker }] =
    useCreateProgressTrackerMutation();

  const exerciseTrackers = data?.trackers;
  const [selectedTrackerId, setSelectedTrackerId] = useState(null);
  const [selectedTrackerDelete, setSelectedTrackerDelete] = useState(null);
  const [selectedTrackerAddEntry, setSelectedTrackerAddEntry] = useState(null);

  const selectedTracker = exerciseTrackers?.find(
    (tracker) => tracker._id === selectedTrackerId,
  );
  const [noteEditingEntry, setNoteEditingEntry] = useState(null);
  const [addTrackerExercise, setAddTrackerExercise] = useState(null);
  const [addTrackerUnit, setAddTrackerUnit] = useState(null);
  const [addTrackerExerciseValue, setAddTrackerExerciseValue] = useState(null);
  const [addTrackerExerciseNote, setAddTrackerExerciseNote] = useState(null);
  const [editEntryValue, setEditEntryValue] = useState(null);
  const [editEntryNote, setEditEntryNote] = useState(null);

  const handleDeleteTrackerButton = async () => {
    try {
      await deleteTracker(selectedTrackerDelete._id).unwrap();
      toast.success("Progress Tracker successfully deleted.");
      trackerDeleteModalRef.current.close();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleDeleteTrackerEntryButton = async (entry) => {
    try {
      await deleteTrackerEntry({
        trackerId: selectedTracker._id,
        entryId: entry._id,
      }).unwrap();
      toast.success("Tracker entry successfully deleted");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleAddTrackerButton = async () => {
    try {
      await addTracker({
        exercise: addTrackerExercise,
        unit: addTrackerUnit,
      }).unwrap();
      toast.success("Exercise Tracker successfully created");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleAddTrackerEntryButton = async () => {
    try {
      if (addTrackerExerciseValue <= 0) {
        toast.error("Enter a valid record value");
        return;
      }
      await addTrackerEntry({
        entry: {
          value: addTrackerExerciseValue,
          note: addTrackerExerciseNote,
        },
        trackerId: selectedTrackerAddEntry._id,
      }).unwrap();
      toast.success("Tracker entry successfully added");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleEditEntryButton = async (entry) => {
    try {
      await editTrackerEntry({
        trackerId: selectedTracker._id,
        entryId: entry._id,
        entry: {
          value: editEntryValue,
          note: editEntryNote,
        },
      }).unwrap();
      toast.success("Tracker entry successfully updated");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Navbar>
      <div className="h-full">
        <div
          className="tooltip tooltip-left fixed z-99 bottom-30 right-20"
          data-tip="Add Tracker">
          <button
            className="btn btn-circle btn-primary btn-xl "
            onClick={() => {
              trackerAddModalRef.current.showModal();
            }}>
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

        <div className="grid grid-cols-4 gap-4 py-4 w-7xl">
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
                    <button
                      className="btn btn-soft btn-primary"
                      onClick={() => {
                        setSelectedTrackerAddEntry(tracker);
                        trackerAddEntryModalRef.current.showModal();
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path
                          fill="#fff"
                          d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                        />
                      </svg>
                    </button>
                    <button
                      className="btn btn-soft btn-error"
                      onClick={() => {
                        setSelectedTrackerDelete(tracker);
                        trackerDeleteModalRef.current.showModal();
                      }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24">
                        <path
                          fill="#fff"
                          d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                        />
                      </svg>
                    </button>

                    <button
                      className="btn btn-soft btn-secondary"
                      onClick={() => {
                        setSelectedTrackerId(tracker._id);
                        historyModalRef.current.showModal();
                      }}>
                      History
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <dialog
            ref={trackerAddEntryModalRef}
            className="modal"
            onClose={() => {
              setAddTrackerExerciseValue("");
              setAddTrackerExerciseNote("");
            }}>
            <div className="modal-box">
              <h3 className="font-bold text-lg text-secondary">Add Entry</h3>
              <p className="py-4 text-sm opacity-60">
                Enter your record value for this exercise
              </p>
              <div className="flex flex-col my-3 gap-2">
                <input
                  type="number"
                  placeholder="Value"
                  className="input no-spinner"
                  value={addTrackerExerciseValue}
                  onChange={(e) => setAddTrackerExerciseValue(e.target.value)}
                />
                <textarea
                  className="textarea"
                  placeholder="Notes(Optional)"
                  value={addTrackerExerciseNote}
                  onChange={(e) =>
                    setAddTrackerExerciseNote(e.target.value)
                  }></textarea>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn btn-primary btn-soft"
                  onClick={() => {
                    handleAddTrackerEntryButton();
                    trackerAddEntryModalRef.current.close();
                  }}>
                  Add Entry
                </button>
                <button
                  className="btn"
                  onClick={() => trackerAddEntryModalRef.current.close()}>
                  Cancel
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <dialog
            ref={trackerAddModalRef}
            className="modal"
            onClose={() => {
              setAddTrackerExercise("");
              setAddTrackerUnit("");
            }}>
            <div className="modal-box">
              <h3 className="font-bold text-lg text-secondary">Add Tracker</h3>
              <p className="py-4 text-sm opacity-60">
                Please enter exercise name and choose a unit to track records
              </p>
              <div className="flex flex-col my-3 gap-2">
                <input
                  type="text"
                  placeholder="Exercise Name"
                  className="input"
                  value={addTrackerExercise}
                  onChange={(e) => setAddTrackerExercise(e.target.value)}
                />
                <select
                  defaultValue="Pick Unit to Record"
                  className="select"
                  value={addTrackerUnit}
                  onChange={(e) => setAddTrackerUnit(e.target.value)}>
                  <option value="" disabled={true}>
                    Pick Unit
                  </option>
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                  <option value="reps">reps</option>
                  <option value="minutes">minutes</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  className="btn btn-primary btn-soft"
                  onClick={() => {
                    handleAddTrackerButton();
                    trackerAddModalRef.current.close();
                  }}>
                  Add Tracker
                </button>
                <button
                  className="btn"
                  onClick={() => trackerAddModalRef.current.close()}>
                  Cancel
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <dialog ref={trackerDeleteModalRef} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-secondary">
                Delete{" "}
                {selectedTrackerDelete?.exercise
                  ?.toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
                Tracker ?
              </h3>
              <p className="py-4 text-sm opacity-60">
                Are you sure you want to delete{" "}
                {selectedTrackerDelete?.exercise
                  ?.toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
                tracker? You cannot undo this action
              </p>
              <div className="flex gap-2">
                <button
                  className="btn btn-soft btn-error"
                  onClick={handleDeleteTrackerButton}>
                  Yes
                </button>
                <button
                  className="btn"
                  onClick={() => trackerDeleteModalRef.current.close()}>
                  No
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <dialog
            ref={historyModalRef}
            className="modal"
            onClose={() => {
              setNoteEditingEntry(null);
            }}>
            <div className="modal-box max-h-9/12">
              <h3 className="font-bold text-xl opacity-60">
                {selectedTracker?.exercise
                  ?.toLowerCase()
                  .replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
                - History
              </h3>
              {selectedTracker?.entries?.map((entry) => (
                <div key={entry._id} className="border-b py-2">
                  <h3 className="text-secondary font-semibold">
                    {new Date(entry.loggedAt).toLocaleDateString()}
                  </h3>{" "}
                  <p>
                    Record:{" "}
                    {noteEditingEntry?._id !== entry._id ? (
                      entry.value
                    ) : (
                      <input
                        type="text"
                        defaultValue={entry.value}
                        className="input w-16"
                        value={editEntryValue}
                        onChange={(e) => setEditEntryValue(e.target.value)}
                      />
                    )}{" "}
                    {selectedTracker.unit}
                  </p>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Note</legend>
                    <textarea
                      disabled={noteEditingEntry?._id !== entry._id}
                      className="textarea h-24 max-h-24"
                      placeholder="Note about your record"
                      value={
                        noteEditingEntry?._id === entry._id
                          ? editEntryNote
                          : entry.note || ""
                      }
                      onChange={(e) =>
                        setEditEntryNote(e.target.value)
                      }></textarea>
                    <div className="label">Optional</div>
                  </fieldset>
                  <div className="flex flex-row gap-2">
                    {noteEditingEntry?._id !== entry._id ? (
                      <>
                        <button
                          className="btn btn-circle btn-outline"
                          onClick={() => {
                            setNoteEditingEntry(entry);
                            setEditEntryValue(entry.value);
                            setEditEntryNote(entry.note || "");
                          }}>
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
                          className="btn btn-circle btn-outline btn-error"
                          onClick={() =>
                            handleDeleteTrackerEntryButton(
                              entry,
                              selectedTracker,
                            )
                          }>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24">
                            <path
                              fill="#fff"
                              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                            />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-circle btn-outline"
                          onClick={() => {
                            handleEditEntryButton(entry, selectedTracker);
                            setNoteEditingEntry(null);
                          }}>
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
                              <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                              <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7M7 3v4a1 1 0 0 0 1 1h7" />
                            </g>
                          </svg>
                        </button>
                        <button
                          className="btn btn-circle btn-outline btn-error"
                          onClick={() => setNoteEditingEntry(null)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 48 48">
                            <path
                              fill="#d50000"
                              d="M24 6C14.1 6 6 14.1 6 24s8.1 18 18 18s18-8.1 18-18S33.9 6 24 6m0 4c3.1 0 6 1.1 8.4 2.8L12.8 32.4C11.1 30 10 27.1 10 24c0-7.7 6.3-14 14-14m0 28c-3.1 0-6-1.1-8.4-2.8l19.6-19.6C36.9 18 38 20.9 38 24c0 7.7-6.3 14-14 14"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </Navbar>
  );
};

export default Records;
