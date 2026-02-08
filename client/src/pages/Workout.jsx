import React from "react";
import Navbar from "../components/Navbar";
import AtomicBackground from "../components/AtomicBackground";
import WorkoutPlan from "../components/WorkoutPlan";

const Workout = () => {
  return (
    <div>
      <Navbar>
        <div className="grid grid-flow-row grid-cols-2 gap-2">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4">
            <legend className="fieldset-legend text-lg">
              Current preferences
            </legend>

            <h2 className="label text-lg">Workout days per week</h2>
            <p className="text-sm">3 Days</p>
            <div className="divider m-0"></div>
            <h2 className="label text-lg">Session Duration</h2>
            <p className="text-sm">45 Minutes</p>
            <div className="divider m-0"></div>
            <h2 className="label text-lg">Fitness Level</h2>
            <p className="text-sm">Beginner</p>
            <div className="divider m-0"></div>
            <h2 className="label text-lg">Primary Goal</h2>
            <p className="text-sm">Fat Loss</p>
            <div className="divider m-0"></div>
            <h2 className="label text-lg">Preferences</h2>
            <p className="text-sm">Cardio</p>
            <div className="divider m-0"></div>
            <h2 className="label text-lg">Workout Program Title</h2>
            <p className="text-sm">
              Beginner Fat Loss Workout Plan - 3 Days Per Week
            </p>
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
              placeholder="2 to 6 days"
            />

            <label className="label">Desired session duration</label>
            <input
              type="number"
              min={30}
              max={120}
              className="input w-full no-spinner"
              placeholder="30 to 120 minutes"
            />

            <label className="label">Fitness Level</label>
            <select defaultValue="Choose fitness level" className="select">
              <option disabled={true}>Choose fitness level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <span className="label">Required</span>

            <label className="label">Primary Goal</label>
            <select defaultValue="Choose primary goal" className="select">
              <option disabled={true}>Choose primary goal</option>
              <option>Muscle Gain</option>
              <option>Fat Loss</option>
              <option>Strength</option>
              <option>Endurance</option>
            </select>
            <span className="label">Required</span>

            <label className="label">Preferences</label>
            <select defaultValue="Choose preferences" className="select">
              <option disabled={true}>Choose preferences</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <span className="label">Optional</span>
            <button className="btn btn-primary">Update Preferences</button>
          </fieldset>
          <div className="col-span-2 card w-full bg-base-100 card-xl shadow-sm">
            <div className="card-body">
              <h2 className="card-title">Current Workout Plan</h2>
              <div className="bg-base-300 shadow-sm flex flex-row justify-around">
                <div>
                  <h3>Workout Day 1</h3>
                  <p>Exercises:</p>
                </div>
                <div>
                  <h3>Workout Day 1</h3>
                  <p>Exercises:</p>
                </div>
                <div>
                  <h3>Workout Day 1</h3>
                  <p>Exercises:</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Workout;
