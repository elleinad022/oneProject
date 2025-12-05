import express from "express";
import {
  initTodayLog,
  addMealEntry,
  getTodayLog,
  getWeeklyLogs,
} from "../controllers/calorieLogController.js";

import userAuth from "../middleware/userAuth.js";

const calorieLogRouter = express.Router();

calorieLogRouter.get("/init-calorie", userAuth, initTodayLog);
calorieLogRouter.post("/add-meal", userAuth, addMealEntry);
calorieLogRouter.get("/calorie-day-log", userAuth, getTodayLog);
calorieLogRouter.get("/calorie-week-log", userAuth, getWeeklyLogs);

export default calorieLogRouter;
