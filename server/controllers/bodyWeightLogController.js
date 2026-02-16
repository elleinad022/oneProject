import bodyWeightLogModel from "../models/bodyWeightLogModel.js";
import userModel from "../models/userModel.js";

//@desc Gets all bodyweight history
//Route GET api/bodyweight/history
//@access private
export const getBodyWeightHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const bodyWeightLogs = await bodyWeightLogModel
      .find({ user: userId })
      .sort({
        loggedAt: -1,
      });

    return res.status(200).json({ success: true, bodyWeightLogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Gets latest bodyweight from history
//Route GET api/bodyweight/latest
//@access private
export const getBodyWeightLatest = async (req, res) => {
  try {
    const userId = req.userId;

    const latestBodyWeightLog = await bodyWeightLogModel
      .findOne({
        user: userId,
      })
      .sort({ loggedAt: -1 });

    return res.status(200).json({ success: true, latestBodyWeightLog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Gets bodyweight goal
//Route GET api/bodyweight/goal
//@access private
export const getBodyWeightGoal = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    res
      .status(200)
      .json({ success: true, goalWeight: user.goalWeight || null });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Sets bodyweight goal
//Route PATCH api/bodyweight/set-goal
//@access private
export const setBodyWeightGoal = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const { weightGoal, startWeight } = req.body;
    if (weightGoal != null && isNaN(weightGoal)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid weight goal" });
    }
    if (startWeight != null && isNaN(startWeight)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid starting weight" });
    }

    //Update only fields provided by user
    if (weightGoal != null) user.weightGoal = weightGoal;
    if (startWeight != null) user.startWeight = startWeight;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Body weight goal updated successfully",
      user: {
        weightGoal: user.weightGoal,
        startWeight: user.startWeight,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Posts a bodyweight log
//Route POST api/bodyweight/log
//@access private
export const logBodyWeight = async (req, res) => {
  try {
    const userId = req.userId;
    const { weight, loggedAt } = req.body;

    if (weight == null || isNaN(weight)) {
      return res.status(400).json({
        success: false,
        message: "Valid weight log is required.",
      });
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    let todayLog = await bodyWeightLogModel.findOne({
      user: userId,
      loggedAt: { $gte: startOfToday, $lte: endOfToday },
    });

    if (todayLog) {
      //Update if existing
      todayLog.weight = weight;
      await todayLog.save();
    } else {
      //Create if no log today
      todayLog = await bodyWeightLogModel.create({
        user: userId,
        weight,
        loggedAt: loggedAt || Date.now(),
      });
    }

    //Update latest data on user
    const user = await userModel.findById(userId);
    user.currentWeight = weight;
    await user.save();

    return res.status(201).json({ success: true, todayLog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Delete today's bodyweight log
//Route DELETE /api/bodyweight/delete-log
//@access Private
export const deleteBodyWeightLog = async (req, res) => {
  try {
    const userId = req.userId;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(0, 0, 0, 0);

    const todayLog = await bodyWeightLogModel.findOneAndDelete({
      user: userId,
      loggedAt: { $gte: startOfToday, $lte: endOfToday },
    });

    if (!todayLog) {
      return res.status(404).json({
        success: false,
        message: "No bodyweight log found for today",
      });
    }

    const latestLog = await bodyWeightLogModel
      .findOne({ user: userId })
      .sort({ loggedAt: -1 });

    const user = await userModel.findById(userId);

    user.currentWeight = latestLog ? latestLog : null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Bodyweight log deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
