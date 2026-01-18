import mongoose from "mongoose";

const workoutPreferencesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  daysPerWeek: { type: Number, min: 2, max: 6, required: true },
  sessionLength: { type: Number, min: 30, max: 120, required: true },
  fitnessLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  primaryGoal: {
    type: String,
    enum: ["strength", "hypertrophy", "endurance"],
    required: true,
  },
  equipment: {
    type: [String],
    enum: ["bodyweight", "dumbbells", "barbell", "full gym"],
    required: true,
  },
  splitPreference: {
    type: String,
    enum: ["push/pull/legs", "upper/lower", "full body", "no preference"],
    required: true,
  },
});

const workoutPreferencesModel =
  mongoose.models.workoutPreferences ||
  mongoose.model("workoutPreferences", workoutPreferencesSchema);

export default workoutPreferencesModel;
