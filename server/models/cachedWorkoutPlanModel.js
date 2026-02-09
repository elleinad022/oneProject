import mongoose from "mongoose";

const exerciseDetailSchema = new mongoose.Schema({
  name: String,
  durationMinutes: String,
  repetitions: String,
  sets: String,
  equipment: String,
});

const workoutDaySchema = new mongoose.Schema({
  day: String,
  exercises: [exerciseDetailSchema],
});

const programStepSchema = new mongoose.Schema({
  indexType: {
    type: String,
    enum: ["workout", "rest"],
    required: true,
  },
  label: String,
  exercises: [exerciseDetailSchema],
});

const cachedWorkoutPlanSchema = new mongoose.Schema({
  preferencesHash: { type: String, required: true, unique: true },
  preferences: { type: String },
  goal: String,
  fitnessLevel: String,
  schedule: {
    daysPerWeek: { type: Number, required: true },
    sessionDuration: { type: Number, required: true },
  },
  totalWeeks: Number,
  plan: {
    type: [workoutDaySchema],
    required: true,
  },
  programSteps: {
    type: [programStepSchema],
    required: true,
  },
  seo_title: { type: String },
  seo_content: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const cachedWorkoutPlanModel =
  mongoose.models.cachedWorkoutPlan ||
  mongoose.model("cachedWorkoutPlan", cachedWorkoutPlanSchema);

export default cachedWorkoutPlanModel;
