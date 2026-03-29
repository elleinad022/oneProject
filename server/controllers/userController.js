import { log } from "console";
import userModel from "../models/userModel.js";

//@desc Gets user data
//Route GET /api/user/data
//@access private
export const getUserData = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.userId)
      .select(
        "_id email name isVerified verifyOtpExpireAt resetOtpExpireAt otpCooldown dailyCalorieGoal macros dailyWaterGoal startWeight currentWeight goalWeight weightGoalStartedAt workoutTrackingIndex workoutWeekIndex profilePicture",
      );

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      userData: {
        _id: user._id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
        verifyOtpExpireAt: user.verifyOtpExpireAt,
        resetOtpExpireAt: user.resetOtpExpireAt,
        otpCooldown: user.otpCooldown,
        dailyCalorieGoal: user.dailyCalorieGoal,
        macros: user.macros,
        dailyWaterGoal: user.dailyWaterGoal,
        startWeight: user.startWeight,
        currentWeight: user.currentWeight,
        goalWeight: user.goalWeight,
        weightGoalStartedAt: user.weightGoalStartedAt,
        workoutTrackingIndex: user.workoutTrackingIndex,
        workoutWeekIndex: user.workoutWeekIndex,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Sets user calorie goals
//Route POST /api/user/update-calorie-goals
//@access private
export const addCaloricGoals = async (req, res) => {
  const user = await userModel.findById(req.userId);
  const { dailyCalorieGoal, protein, carbohydrates, fats } = req.body;

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }
  if (
    dailyCalorieGoal == null ||
    protein == null ||
    carbohydrates == null ||
    fats == null
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide your caloric goals and macros",
    });
  }
  try {
    user.dailyCalorieGoal = dailyCalorieGoal;
    user.macros.protein = protein;
    user.macros.carbohydrates = carbohydrates;
    user.macros.fats = fats;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Calorie goals updated successfully",
      userData: {
        dailyCalorieGoal: user.dailyCalorieGoal,
        macros: user.macros,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Sets user water goals
//Route POST /api/user/update-water-goals
//@access private
export const addWaterGoal = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    const { dailyWaterGoal } = req.body;

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    if (dailyWaterGoal == null || isNaN(dailyWaterGoal)) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid goal water amount in mL",
      });
    }

    user.dailyWaterGoal = dailyWaterGoal;

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Water goal updated successfully",
      userData: { dailyWaterGoal: user.dailyWaterGoal },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

import fs from "fs";

//@desc Update user Profile Picture
//Route PUT /api/user/profile-picture
//@access private
export const updateProfilePicture = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });

    const newImagePath = req.file.path;

    user.profilePicture = newImagePath;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Profile picture updated successfully",
      profilePicture: newImagePath,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//@desc Delete user Profile Picture
//Route DELETE /api/user/profile-picture
//@access Private
export const deleteProfilePicture = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.profilePicture) {
      return res.status(404).json({
        success: false,
        message: "User does not have a profile picture",
      });
    }

    const imagePath = `.${user.profilePicture}`;

    fs.unlink(imagePath, (err) => {
      if (err) console.log("Failed to delete current profile picture", err);
    });

    user.profilePicture = null;

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile picture deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
