import express from "express";
import {
  logBodyWeight,
  getBodyWeightGoal,
  getBodyWeightLatest,
  getBodyWeightHistory,
  setBodyWeightGoal,
} from "../controllers/bodyWeightLogController.js";
import userAuth from "../middleware/userAuth.js";

const bodyWeightLogRouter = express.Router();

bodyWeightLogRouter.post("/log", userAuth, logBodyWeight);
bodyWeightLogRouter.get("/goal", userAuth, getBodyWeightGoal);
bodyWeightLogRouter.patch("/set-goal", userAuth, setBodyWeightGoal);
bodyWeightLogRouter.get("/latest", userAuth, getBodyWeightLatest);
bodyWeightLogRouter.get("/history", userAuth, getBodyWeightHistory);

export default bodyWeightLogRouter;
