import mongoose from "mongoose";

const dailyCalorieLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    date: { type: Date, required: true, unique: false },
    caloriesConsumed: { type: Number, default: 0 },
    proteinConsumed: { type: Number, default: 0 },
    carbsConsumed: { type: Number, default: 0 },
    fatsConsumed: { type: Number, default: 0 },
    entries: [
      {
        description: String,
        calories: Number,
        protein: Number,
        carbs: Number,
        fats: Number,
        time: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const dailyCalorieLogModel =
  mongoose.models.dailyCalorieLog ||
  mongoose.model("dailyCalorieLog", dailyCalorieLogSchema);

export default dailyCalorieLogModel;
