import axios from "axios";
import featuredMealModel from "../models/featuredMealModel.js";

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL =
  "https://api.spoonacular.com/recipes/complexSearch";

export const fetchAndCacheMealsFromSpoonacular = async () => {
  try {
    const response = await axios.get(SPOONACULAR_BASE_URL, {
      params: {
        apiKey: SPOONACULAR_API_KEY,
        number: 20,
        addRecipeNutrition: true,
        minProtein: 20,
        sort: "random",
      },
    });

    const mealsFromSpoonacular = response.data.results;

    for (const meal of mealsFromSpoonacular) {
      const existsInFeaturedMealsCollection = await featuredMealModel.findOne({
        spoonacularId: meal.id,
      });

      if (existsInFeaturedMealsCollection) continue;

      await featuredMealModel.create({
        spoonacularId: meal.id,
        title: meal.title,
        image: meal.image,
        readyInMinutes: meal.readyInMinutes,
        servings: meal.servings,
        sourceUrl: meal.sourceUrl,
        nutrition: {
          calories: meal.nutrition?.nutrients.find((n) => n.name === "Calories")
            ?.amount,
          protein: meal.nutrition?.nutrients.find((n) => n.name === "Protein")
            ?.amount,
          carbs: meal.nutrition?.nutrients.find(
            (n) => n.name === "Carbohydrates",
          )?.amount,
          fat: meal.nutrition?.nutrients.find((n) => n.name === "Fat")?.amount,
        },
        tags: meal.diets || [],
      });
    }

    return mealsFromSpoonacular.length;
  } catch (error) {
    console.error("Spoonacular fetch failed:", error.message);
  }
};
