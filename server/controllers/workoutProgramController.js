import workoutPreferencesModel from "../models/workoutPreferencesModel.js";
import cachedWorkoutPlanModel from "../models/cachedWorkoutPlanModel.js";
import {
  callRapidApiAndParse,
  hashWorkoutPreferences,
} from "../services/workoutProgramService.js";

//@desc Get or generate workout program for user
//Route GET api/workout/program
//@access Private
export const getWorkoutProgram = async (req, res) => {
  try {
    const userId = req.userId;

    const preferences = await workoutPreferencesModel.findOne({
      user: userId,
    });

    if (!preferences) {
      return res.status(404).json({
        success: false,
        message: "Workout preferences not found",
      });
    }

    const preferencesHash = hashWorkoutPreferences({
      daysPerWeek: preferences.daysPerWeek,
      sessionDuration: preferences.sessionDuration,
      fitnessLevel: preferences.fitnessLevel,
      primaryGoal: preferences.primaryGoal,
      preferences: preferences.preferences,
    });

    const cachedPlan = await cachedWorkoutPlanModel.findOne({
      preferencesHash,
    });

    if (cachedPlan) {
      return res.status(200).json({
        success: true,
        source: "cache",
        workoutPlan: cachedPlan,
      });
    }

    const generatedPlan = await callRapidApiAndParse(preferences);

    let newWorkoutPlan;
    try {
      newWorkoutPlan = await cachedWorkoutPlanModel.create({
        preferencesHash,
        preferences: preferences.preferences, //store the user's preference
        ...generatedPlan,
      });
    } catch (error) {
      if (error.code === 11000) {
        newWorkoutPlan = await cachedWorkoutPlanModel.findOne({
          preferencesHash,
        });
      } else {
        throw error;
      }
    }

    return res.status(200).json({
      success: true,
      source: "generated",
      workoutPlan: newWorkoutPlan,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Initialize default workout preferences for user
//Route POST api/workout/init-preferences
//@access Private
export const initWorkoutPreferences = async (req, res) => {
  try {
    const userId = req.userId;

    let preferences = await workoutPreferencesModel.findOne({ user: userId });

    if (!preferences) {
      //Create default preference
      preferences = await workoutPreferencesModel.create({
        user: userId,
        daysPerWeek: 3,
        sessionDuration: 45,
        fitnessLevel: "Beginner",
        primaryGoal: "Muscle Gain",
        preferences: "General Fitness",
      });
    }

    return res.status(200).json({
      success: true,
      preferences,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
