import express from "express";
import {
  logBodyWeight,
  getBodyWeightGoal,
  getBodyWeightLatest,
  getBodyWeightHistory,
  setBodyWeightGoal,
  deleteBodyWeightLog,
} from "../controllers/bodyWeightLogController.js";
import userAuth from "../middleware/userAuth.js";

const bodyWeightLogRouter = express.Router();

bodyWeightLogRouter.post("/log", userAuth, logBodyWeight);
bodyWeightLogRouter.get("/goal", userAuth, getBodyWeightGoal);
bodyWeightLogRouter.patch("/set-goal", userAuth, setBodyWeightGoal);
bodyWeightLogRouter.get("/latest", userAuth, getBodyWeightLatest);
bodyWeightLogRouter.get("/history", userAuth, getBodyWeightHistory);
bodyWeightLogRouter.delete("/delete-log", userAuth, deleteBodyWeightLog);

export default bodyWeightLogRouter;
