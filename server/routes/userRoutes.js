import express from "express";
import userAuth from "../middleware/userAuth.js";
import { upload } from "../middleware/uploadProfilePicture.js";
import {
  addCaloricGoals,
  addWaterGoal,
  getUserData,
  updateProfilePicture,
  deleteProfilePicture,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.post("/update-calorie-goals", userAuth, addCaloricGoals);
userRouter.post("/update-water-goal", userAuth, addWaterGoal);
userRouter.put(
  "/profile-picture",
  userAuth,
  upload.single("profilePicture"),
  updateProfilePicture,
);
userRouter.delete("/profile-picture", userAuth, deleteProfilePicture);

export default userRouter;
