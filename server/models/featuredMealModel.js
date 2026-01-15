import mongoose from "mongoose";

const featuredMealSchema = new mongoose.Schema({
  spoonacularId: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  readyInMinutes: { type: Number },
  servings: { type: Number },
  sourceUrl: { type: String },
  nutrition: {
    calories: { type: Number },
    protein: { type: Number },
    carbs: { type: Number },
    fat: { type: Number },
  },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const featuredMealModel =
  mongoose.models.featuredMeal ||
  mongoose.model("featuredMeal", featuredMealSchema);

export default featuredMealModel;
