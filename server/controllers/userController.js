import userModel from "../models/userModel.js";

//@desc Gets user data
//Route GET /api/user/data
//@access private
export const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      userData: {
        _id: user._id,
        email: user.email,
        name: user.name,
        isVerified: user.isVerified,
        verifyOtpExpireAt: user.verifyOtpExpireAt,
        resetOtpExpireAt: user.resetOtpExpireAt,
        otpCooldown: user.otpCooldown,
        dailyCalorieGoal: user.dailyCalorieGoal,
        macros: user.macros,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Sets user calorie goals
//Route POST /api/user/calorie-goals
//@access private
export const addCaloricGoals = async (req, res) => {
  const user = await userModel.findById(req.userId);
  const { dailyCalorieGoal, protein, carbohydrates, fats } = req.body;

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  if (
    dailyCalorieGoal == null ||
    protein == null ||
    carbohydrates == null ||
    fats == null
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide your caloric goals and macros",
    });
  }
  try {
    user.dailyCalorieGoal = dailyCalorieGoal;
    user.macros.protein = protein;
    user.macros.carbohydrates = carbohydrates;
    user.macros.fats = fats;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Calorie goals updated successfully",
      userData: {
        dailyCalorieGoal: user.dailyCalorieGoal,
        macros: user.macros,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
