import mongoose from "mongoose";

const userMealHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true,
  },
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "featuredMeal",
    required: true,
  },
  seenAt: { type: Date, default: Date.now },
});

const userMealHistoryModel =
  mongoose.models.userMealHistory ||
  mongoose.model("userMealHistory", userMealHistorySchema);

export default userMealHistoryModel;
