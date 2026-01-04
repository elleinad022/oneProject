import mongoose from "mongoose";

const bodyWeightLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    weight: { type: Number, min: 0, required: true },
    loggedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

bodyWeightLogSchema.index({ user: 1, loggedAt: -1 });

const bodyWeightLogModel =
  mongoose.models.bodyWeightLog ||
  mongoose.model("bodyWeightLog", bodyWeightLogSchema);

export default bodyWeightLogModel;
