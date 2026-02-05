import mongoose from "mongoose";

const progressEntrySchema = new mongoose.Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    loggedAt: { type: Date, default: Date.now },
    note: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const progressTrackerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },

    exercise: {
      type: String,
      required: true,
    },

    normalizedExercise: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      enum: ["kg", "lbs", "reps", "minutes"],
      required: true,
    },
    entries: [progressEntrySchema],
  },
  { timestamps: true },
);

progressTrackerSchema.index(
  { user: 1, normalizedExercise: 1 },
  { unique: true },
);

const progressTrackerModel =
  mongoose.models.progressTracker ||
  mongoose.model("progressTracker", progressTrackerSchema);

export default progressTrackerModel;
