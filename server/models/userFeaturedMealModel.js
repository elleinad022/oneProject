import mongoose from "mongoose";

const userFeaturedMealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      index: true,
    },
    date: { type: Date, required: true },
    meals: [
      {
        meal: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "featuredMeal",
          required: true,
        },
        mealType: {
          type: String,
          enum: ["breakfast", "lunch", "dinner"],
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userFeaturedMealSchema.index({ user: 1, date: 1 }, { unique: true });

const userFeaturedMealModel =
  mongoose.models.userFeaturedMeal ||
  mongoose.model("userFeaturedMeal", userFeaturedMealSchema);

export default userFeaturedMealModel;
