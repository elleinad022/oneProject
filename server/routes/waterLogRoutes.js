import express from "express";
import {
  initTodayWaterLog,
  addWaterEntry,
  getWaterTodayLog,
  getWaterWeeklyLogs,
  deleteWaterEntry,
  updateWaterEntry,
} from "../controllers/waterLogController.js";

import userAuth from "../middleware/userAuth.js";

const waterLogRouter = express.Router();

waterLogRouter.get("/init-water", userAuth, initTodayWaterLog);
waterLogRouter.get("/add-water", userAuth, addWaterEntry);
waterLogRouter.get("/water-day-log", userAuth, getWaterTodayLog);
waterLogRouter.get("/water-week-log", userAuth, getWaterWeeklyLogs);
waterLogRouter.get("/delete-water/:entryId", userAuth, deleteWaterEntry);
waterLogRouter.get("/update-water/:entryId", userAuth, updateWaterEntry);

export default waterLogRouter;
