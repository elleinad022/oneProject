import express from "express";
import {
  advanceWorkoutIndex,
  getWorkoutProgram,
  initWorkoutPreferences,
  resetWorkoutIndexes,
  updateWorkoutPreferences,
} from "../controllers/workoutProgramController.js";

import userAuth from "../middleware/userAuth.js";

const workoutProgramRouter = express.Router();

workoutProgramRouter.get("/program", userAuth, getWorkoutProgram);
workoutProgramRouter.put(
  "/update-preferences",
  userAuth,
  updateWorkoutPreferences,
);
workoutProgramRouter.post(
  "/init-preferences",
  userAuth,
  initWorkoutPreferences,
);
workoutProgramRouter.post("/advance-index", userAuth, advanceWorkoutIndex);
workoutProgramRouter.post("/reset-program", userAuth, resetWorkoutIndexes);

export default workoutProgramRouter;
