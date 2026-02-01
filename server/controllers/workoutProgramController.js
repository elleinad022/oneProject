import workoutPreferencesModel from "../models/workoutPreferencesModel.js";
import cachedWorkoutPlanModel from "../models/cachedWorkoutPlanModel.js";
import {
  callRapidApiAndParse,
  hashWorkoutPreferences,
} from "../services/workoutProgramService.js";
import { buildProgramSteps } from "../utils/buildProgramSteps.js";
import userModel from "../models/userModel.js";

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

    const programSteps = buildProgramSteps(generatedPlan.plan);

    let newWorkoutPlan;
    try {
      newWorkoutPlan = await cachedWorkoutPlanModel.create({
        preferencesHash,
        preferences: preferences.preferences, //store the user's preference
        ...generatedPlan,
        programSteps,
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

//@desc Update workout preferences and workout program
//Route PUT api/workout/update-preferences
//@access Private
export const updateWorkoutPreferences = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      daysPerWeek,
      sessionDuration,
      fitnessLevel,
      primaryGoal,
      preferences,
    } = req.body;

    if (
      [
        daysPerWeek,
        sessionDuration,
        fitnessLevel,
        primaryGoal,
        preferences,
      ].some((setting) => setting == null)
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid preferences are required.",
      });
    }

    let source = "cache";

    const updatedPreferences = await workoutPreferencesModel.findOneAndUpdate(
      {
        user: userId,
      },
      {
        daysPerWeek,
        sessionDuration,
        fitnessLevel,
        primaryGoal,
        preferences,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedPreferences) {
      return res.status(404).json({
        success: false,
        message: "Workout preferences not found",
      });
    }

    const preferencesHash = hashWorkoutPreferences({
      daysPerWeek: updatedPreferences.daysPerWeek,
      sessionDuration: updatedPreferences.sessionDuration,
      fitnessLevel: updatedPreferences.fitnessLevel,
      primaryGoal: updatedPreferences.primaryGoal,
      preferences: updatedPreferences.preferences,
    });

    let workoutPlan = await cachedWorkoutPlanModel.findOne({
      preferencesHash,
    });

    if (!workoutPlan) {
      const generatedPlan = await callRapidApiAndParse(updatedPreferences);
      try {
        workoutPlan = await cachedWorkoutPlanModel.create({
          preferencesHash,
          preferences: updatedPreferences.preferences,
          ...generatedPlan,
        });

        source = "generated";
      } catch (error) {
        if (error.code === 11000) {
          workoutPlan = await cachedWorkoutPlanModel.findOne({
            preferencesHash,
          });
          source = "cache";
        } else {
          throw error;
        }
      }
    }

    const resettedIndexes = await userModel.findByIdAndUpdate(
      userId,
      {
        workoutTrackingIndex: 0,
        workoutWeekIndex: 0,
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      workoutPreferences: updatedPreferences,
      workoutPlan,
      source,
      workoutTrackingIndex: resettedIndexes.workoutTrackingIndex,
      workoutWeekIndex: resettedIndexes.workoutWeekIndex,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
//@desc Advanced a step in workout program index
//Route POST /api/workout/advance-index
//@access Private
export const advanceWorkoutIndex = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const preferences = await workoutPreferencesModel.findOne({ user: userId });
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

    const workoutPlan = await cachedWorkoutPlanModel.findOne({
      preferencesHash,
    });

    if (!workoutPlan) {
      return res.status(404).json({
        success: false,
        message: "Workout plan not found",
      });
    }

    const maxIndex = workoutPlan.programSteps.length - 1;
    const maxWeeks = workoutPlan.totalWeeks;

    if (user.workoutTrackingIndex < maxIndex) {
      user.workoutTrackingIndex += 1;
    } else {
      //End of a week's program
      if (user.workoutWeekIndex + 1 < maxWeeks) {
        user.workoutWeekIndex += 1;
        user.workoutTrackingIndex = 0;
      } else {
        //End of full program(completion)
        return res.status(200).json({
          success: true,
          message: "Program fully completed",
          programCompleted: true,
        });
      }
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Workout tracking index progressed 1 step",
      workoutTrackingIndex: user.workoutTrackingIndex,
      workoutWeekIndex: user.workoutWeekIndex,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Resets/restarts workout program indexes
//Route POST /api/workout/reset-program
//@access Private
export const resetWorkoutIndexes = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.workoutTrackingIndex = 0;
    user.workoutWeekIndex = 0;

    await user.save();
    return res.status(200).json({
      success: true,
      message: "Workout program indexes reset successful",
      workoutTrackingIndex: user.workoutTrackingIndex,
      workoutWeekIndex: user.workoutWeekIndex,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
