import mongoose from "mongoose";

const workoutPreferencesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

  daysPerWeek: { type: Number, min: 2, max: 6, required: true },

  sessionDuration: { type: Number, min: 30, max: 120, required: true },

  fitnessLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },

  primaryGoal: {
    type: String,
    enum: ["Muscle Gain", "Fat Loss", "Strength", "Endurance"],
    required: true,
  },

  preferences: {
    type: String,
    enum: [
      "Bodybuilding",
      "Power building",
      "Hiit",
      "Functional Training",
      "Cardio",
      "General Fitness",
    ],
    default: "General Fitness",
  },
});

const workoutPreferencesModel =
  mongoose.models.workoutPreferences ||
  mongoose.model("workoutPreferences", workoutPreferencesSchema);

export default workoutPreferencesModel;
