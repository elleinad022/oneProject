import featuredMealModel from "../models/featuredMealModel.js";
import userMealHistoryModel from "../models/userMealHistoryModel.js";
import { fetchAndCacheMealsFromSpoonacular } from "../services/spoonacularService.js";

// @desc Get today's featured meals for user
// Route GET api/featured-meals/today
// @access private
export const getFeaturedMealsToday = async (req, res) => {
  try {
    const userId = req.userId;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    let todayMealsHistory = await userMealHistoryModel
      .find({
        user: userId,
        seenAt: { $gte: startOfToday },
      })
      .populate("meal");

    if (todayMealsHistory.length > 0) {
      const mealsForToday = todayMealsHistory
        .slice(0, 3)
        .map((entry) => entry.meal);
      return res.status(200).json({ success: true, meals: mealsForToday });
    }

    const cooldownDate = new Date();
    cooldownDate.setHours(cooldownDate.getHours() - 48);

    const mealCount = await featuredMealModel.countDocuments();
    const MIN_MEALS = 120;

    if (mealCount < MIN_MEALS) {
      await fetchAndCacheMealsFromSpoonacular();
    }

    const recentMeals = await userMealHistoryModel
      .find({
        user: userId,
        seenAt: { $gte: cooldownDate },
      })
      .select("meal");

    // Extract meal ids to exclude to avoid repetitive meal suggestions
    const excludedMealIds = recentMeals.map((entry) => entry.meal.toString());

    // Get new meals excluding the ones recently seen for past 48 hrs
    let availableMeals = await featuredMealModel.find({
      _id: { $nin: excludedMealIds },
    });

    if (availableMeals.length < 3) {
      //Ignore 48hr cooldown if not enough meals are present to exclude recent meals
      availableMeals = await featuredMealModel.find();
    }

    const shuffledMeals = availableMeals.sort(() => 0.5 - Math.random());
    const mealsForToday = shuffledMeals.slice(0, 3);

    const historyEntries = mealsForToday.map((meal) => ({
      user: userId,
      meal: meal._id,
    }));

    await userMealHistoryModel.insertMany(historyEntries);

    return res.status(200).json({ success: true, meals: mealsForToday });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
