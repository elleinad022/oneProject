import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, default: null },
  verifyOtp: { type: String, default: "" },
  verifyOtpExpireAt: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
  otpCooldown: { type: Number, default: 0 },

  googleId: {
    type: String,
    default: null,
  },

  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },

  dailyCalorieGoal: { type: Number, default: 2000 },
  macros: {
    protein: { type: Number, default: 0 },
    carbohydrates: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
  },

  dailyWaterGoal: { type: Number, default: 3000 },

  startWeight: {
    type: Number,
    min: 0,
    default: null,
  },

  currentWeight: {
    type: Number,
    min: 0,
    default: null,
  },

  goalWeight: {
    type: Number,
    min: 0,
    default: null,
  },

  weightGoalStartedAt: {
    type: Date,
    default: null,
  },

  workoutTrackingIndex: {
    type: Number,
    min: 0,
    default: 0,
  },

  workoutWeekIndex: {
    type: Number,
    min: 0,
    default: 0,
  },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
