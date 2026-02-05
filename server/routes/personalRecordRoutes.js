import express from "express";
import {
  createProgressTracker,
  addProgressEntry,
  getTrackers,
  updateProgressEntry,
  deleteProgressEntry,
} from "../controllers/personalRecordController.js";

import userAuth from "../middleware/userAuth.js";

const personalRecordRouter = express.Router();

personalRecordRouter.post("/create-tracker", userAuth, createProgressTracker);
personalRecordRouter.post("/add-entry/:trackerId", userAuth, addProgressEntry);
personalRecordRouter.get("/all-trackers", userAuth, getTrackers);
personalRecordRouter.put(
  "/edit-progress/:trackerId/:entryId",
  userAuth,
  updateProgressEntry,
);
personalRecordRouter.delete(
  "/delete-entry/:trackerId/:entryId",
  userAuth,
  deleteProgressEntry,
);

export default personalRecordRouter;
