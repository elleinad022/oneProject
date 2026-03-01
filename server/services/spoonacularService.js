import axios from "axios";
import featuredMealModel from "../models/featuredMealModel.js";

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const SPOONACULAR_BASE_URL = "https://api.spoonacular.com/";

export const fetchAndCacheMealsFromSpoonacular = async () => {
  try {
    const searchResponse = await axios.get(
      `${SPOONACULAR_BASE_URL}recipes/complexSearch`,
      {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          number: 20,
          addRecipeInstructions: true,
          addRecipeNutrition: true,
          instructionsRequired: true,
          minProtein: 20,
          sort: "random",
        },
      },
    );

    const mealsFromSearch = searchResponse.data.results;

    if (!mealsFromSearch.length) return 0;

    const ids = mealsFromSearch.map((meal) => meal.id).join(",");

    const infoResponse = await axios.get(
      `${SPOONACULAR_BASE_URL}recipes/informationBulk`,
      {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          ids,
          includeNutrition: true,
        },
      },
    );

    const detailedMeals = infoResponse.data;

    const existingMeals = await featuredMealModel
      .find({
        spoonacularId: { $in: detailedMeals.map((m) => m.id) },
      })
      .select("spoonacularId");

    const existingIds = new Set(existingMeals.map((m) => m.spoonacularId));
    const mealsToInsert = detailedMeals
      .filter((meal) => !existingIds.has(meal.id))
      .map((meal) => ({
        spoonacularId: meal.id,
        title: meal.title,
        image: meal.image,
        readyInMinutes: meal.readyInMinutes,
        servings: meal.servings,
        sourceUrl: meal.sourceUrl,
        instructions: meal.instructions,
        analyzedInstructions: meal.analyzedInstructions,
        extendedIngredients: meal.extendedIngredients,
        nutrition: {
          calories: meal.nutrition?.nutrients?.find(
            (n) => n.name === "Calories",
          )?.amount,
          protein: meal.nutrition?.nutrients?.find((n) => n.name === "Protein")
            ?.amount,
          carbs: meal.nutrition?.nutrients?.find(
            (n) => n.name === "Carbohydrates",
          )?.amount,
          fat: meal.nutrition?.nutrients?.find((n) => n.name === "Fat")?.amount,
        },
        tags: meal.diets || [],
      }));

    if (mealsToInsert.length > 0) {
      await featuredMealModel.insertMany(mealsToInsert);
    }

    return mealsToInsert.length;
  } catch (error) {
    console.error("Spoonacular fetch failed:", error.message);
  }
};
