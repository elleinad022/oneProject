import mongoose from "mongoose";

const dailyWaterLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },

    date: { type: Date, required: true, unique: false },
    waterConsumed: { type: Number, default: 0 },
    entries: [
      {
        waterAmount: Number,
        time: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// One log per user per day
dailyWaterLogSchema.index({ user: 1, date: 1 }, { unique: true });

const dailyWaterLogModel =
  mongoose.models.dailyWaterLog ||
  mongoose.model("dailyWaterLog", dailyWaterLogSchema);

export default dailyWaterLogModel;
