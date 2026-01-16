import featuredMealModel from "../models/featuredMealModel";
import userMealHistoryModel from "../models/userMealHistoryModel";

// @desc Get today's featured meals for user
// Route GET api/featured-meals/today
// @access private
export const getFeaturedMealsToday = async (req, res) => {
  try {
    const userId = req.userId;

    const cooldownDate = new Date();
    cooldownDate.setHours(cooldownDate.getHours() - 48);

    const recentMeals = await userMealHistoryModel
      .find({
        user: userId,
        seenAt: { $gte: cooldownDate },
      })
      .select("meal");

    // Extract meal ids to exclude to avoid repetitive meal suggestions
    const excludedMealIds = recentMeals.map((entry) => entry.meal.toString());

    // Get new meals excluding the ones recently seen for past 48 hrs
    const availableMeals = await featuredMealModel.find({
      _id: { $nin: excludedMealIds },
    });

    if (!availableMeals.length) {
      return res
        .status(404)
        .json({ success: false, message: "No available meals to feature" });
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
