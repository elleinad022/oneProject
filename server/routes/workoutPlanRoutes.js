import express from "express";
import {
  getWorkoutProgram,
  initWorkoutPreferences,
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

export default workoutProgramRouter;
