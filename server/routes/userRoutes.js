import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  addCaloricGoals,
  addWaterGoal,
  getUserData,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.post("/update-calorie-goals", userAuth, addCaloricGoals);
userRouter.post("/update-water-goal", userAuth, addWaterGoal);

export default userRouter;
