import express from "express";
import {
  getWorkoutProgram,
  initWorkoutPreferences,
} from "../controllers/workoutProgramController.js";

import userAuth from "../middleware/userAuth.js";

const workoutProgramRouter = express.Router();

workoutProgramRouter.get("/program", userAuth, getWorkoutProgram);
workoutProgramRouter.post(
  "/init-preferences",
  userAuth,
  initWorkoutPreferences,
);

export default workoutProgramRouter;
