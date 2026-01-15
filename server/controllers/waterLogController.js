import dailyWaterLogModel from "../models/dailyWaterLogModel.js";
import userModel from "../models/userModel.js";

//@desc Gets/Creates instance of water log today
//Route GET api/water/init-water
//@access private
export const initTodayWaterLog = async (req, res) => {
  try {
    const userId = req.userId;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    let todayWaterLog = await dailyWaterLogModel.findOne({
      user: userId,
      date: { $gte: startOfToday, $lte: endOfToday },
    });

    if (!todayWaterLog) {
      todayWaterLog = await dailyWaterLogModel.create({
        user: userId,
        date: new Date(),
      });
    }

    todayWaterLog = await todayWaterLog.populate("user", "dailyWaterGoal");
    return res.status(200).json({ success: true, todayWaterLog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Adds water intake entry to log
//Route POST api/water/add-water
//@access private
export const addWaterEntry = async (req, res) => {
  try {
    const userId = req.userId;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const { waterAmount } = req.body;

    if (waterAmount == null || isNaN(waterAmount)) {
      return res.status(400).json({
        success: false,
        message: "Valid amount of water intake is required.",
      });
    }

    let todayWaterLog = await dailyWaterLogModel.findOne({
      user: userId,
      date: { $gte: startOfToday, $lte: endOfToday },
    });

    if (!todayWaterLog) {
      todayWaterLog = await dailyWaterLogModel.create({
        user: userId,
        date: new Date(),
      });
    }

    todayWaterLog.entries.push({
      waterAmount,
    });
    todayWaterLog.waterConsumed =
      Number(todayWaterLog.waterConsumed) + Number(waterAmount);

    await todayWaterLog.save();

    todayWaterLog = await todayWaterLog.populate("user", "dailyWaterGoal");
    return res.status(200).json({
      success: true,
      todayWaterLog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Deletes a water entry from daily water log
//Route DELETE api/water/delete-water/:entryId
//@access private
export const deleteWaterEntry = async (req, res) => {
  try {
    const userId = req.userId;
    const { entryId } = req.params;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todayWaterLog = await dailyWaterLogModel.findOne({
      user: userId,
      date: { $gte: startOfToday, $lte: endOfToday },
    });

    if (!todayWaterLog) {
      return res.status(404).json({ success: false, message: "No Log Found" });
    }

    const waterEntry = todayWaterLog.entries.id(entryId);
    if (!waterEntry) {
      return res
        .status(404)
        .json({ success: false, message: "Entry not found" });
    }

    // Remove deleted water amount from total water consumed log
    todayWaterLog.waterConsumed -= waterEntry.waterAmount;

    // Remove water intake entry
    todayWaterLog.entries.pull(entryId);
    await todayWaterLog.save();

    return res.status(200).json({ success: true, todayWaterLog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Updates a water entry from daily water log
//Route PUT api/water/update-water/:entryId
//@access private
export const updateWaterEntry = async (req, res) => {
  try {
    const userId = req.userId;
    const { entryId } = req.params;
    const { waterAmount } = req.body;

    if (waterAmount == null || isNaN(waterAmount)) {
      return res.status(400).json({
        success: false,
        message: "Valid amount of water intake is required",
      });
    }

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const todayWaterLog = await dailyWaterLogModel.findOne({
      user: userId,
      date: { $gte: startOfToday, $lte: endOfToday },
    });

    if (!todayWaterLog) {
      return res.status(404).json({ success: false, message: "No log found" });
    }

    const waterEntry = todayWaterLog.entries.id(entryId);
    if (!waterEntry) {
      return res
        .status(404)
        .json({ success: false, message: "Water entry not found" });
    }

    //Remove old water intake amount from total water consumed log
    todayWaterLog.waterConsumed -= waterEntry.waterAmount;

    //Update water intake entry
    waterEntry.waterAmount = waterAmount;

    //Add new water amount to total water consumed log
    todayWaterLog.waterConsumed += waterEntry.waterAmount;
    await todayWaterLog.save();

    todayWaterLog = await todayWaterLog.populate("user", "dailyWaterGoal");

    return res.status(200).json({ success: true, todayWaterLog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Get today's water log for the user
//Route GET api/water/water-day-log
//@access Private
export const getWaterTodayLog = async (req, res) => {
  try {
    const userId = req.userId;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    let todayWaterLog = await dailyWaterLogModel.findOne({
      user: userId,
      date: { $gte: startOfToday, $lte: endOfToday },
    });

    if (!todayWaterLog) {
      const user = await userModel
        .findById(userId)
        .select("_id dailyWaterGoal");
      return res.status(200).json({
        success: true,
        todayWaterLog: {
          user,
          date: startOfToday,
          waterConsumed: 0,
          entries: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      todayWaterLog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Get last 7 days of water logs
//Route GET api/water/water-week-log
//@access Private
export const getWaterWeeklyLogs = async (req, res) => {
  try {
    const userId = req.userId;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const sevenDaysAgo = new Date(startOfToday);
    sevenDaysAgo.setDate(startOfToday.getDate() - 6);

    const logs = await dailyWaterLogModel
      .find({
        user: userId,
        date: { $gte: sevenDaysAgo, $lte: endOfToday },
      })
      .sort({ date: 1 })
      .populate("user", "dailyWaterGoal");

    const chartData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfToday);
      date.setDate(date.getDate() - i);
      const log = logs.find(
        (entry) => entry.date.toDateString() === date.toDateString()
      );
      chartData.unshift({
        date: date.toDateString(),
        waterConsumed: log ? log.waterConsumed : 0,
      });
    }

    return res.status(200).json({ success: true, chartData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
