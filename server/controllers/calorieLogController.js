import dailyCalorieLogModel from "../models/dailyCalorieLogModel.js";

//@desc Gets/Creates instance of calorie log today
//Route GET api/calories/init-calorie
//@access private
export const initTodayLog = async (req, res) => {
  try {
    const userId = req.userId;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    let todayLog = await dailyCalorieLogModel.findOne({
      user: userId,
      date: { $gte: startOfToday, $lte: endOfToday },
    });

    if (!todayLog) {
      todayLog = await dailyCalorieLogModel.create({
        user: userId,
        date: new Date(),
      });
    }

    todayLog = await todayLog.populate("user", "dailyCalorieGoal macros");

    return res.status(200).json({
      success: true,
      todayLog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Adds a meal entry into daily calorie log
//Route POST api/calories/add-meal
//@access private
export const addMealEntry = async (req, res) => {
  try {
    const userId = req.userId;
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);
    const { description, calories } = req.body;

    if (!description || calories == null || isNaN(calories)) {
      return res.status(400).json({
        success: false,
        message: "Valid Description and calories are required",
      });
    }

    let todayLog = await dailyCalorieLogModel.findOne({
      user: userId,
      date: { $gte: startOfToday, $lte: endOfToday },
    });

    if (!todayLog) {
      todayLog = await dailyCalorieLogModel.create({
        user: userId,
        date: new Date(),
      });
    }

    todayLog.entries.push({
      description,
      calories: Number(calories),
    });
    todayLog.caloriesConsumed =
      Number(todayLog.caloriesConsumed) + Number(calories);
    await todayLog.save();

    todayLog = await todayLog.populate("user", "dailyCalorieGoal macros");
    return res.status(200).json({
      success: true,
      todayLog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Get today's calorie log for the user
//Route GET api/calories/calorie-day-log
//@access Private
export const getTodayLog = async (req, res) => {
  try {
    const userId = req.userId;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    let todayLog = await dailyCalorieLogModel
      .findOne({
        user: userId,
        date: { $gte: startOfToday, $lte: endOfToday },
      })
      .populate("user", "dailyCalorieGoal macros");

    if (!todayLog) {
      return res.status(200).json({
        success: true,
        todayLog: {
          user: {
            _id: userId,
            dailyCalorieGoal: null,
            macros: null,
          },
          date: new Date(),
          caloriesConsumed: 0,
          entries: [],
        },
      });
    }

    return res.status(200).json({
      success: true,
      todayLog,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Get last 7 days of calorie logs
//Route GET api/calories/calorie-week-log
//@access Private
export const getWeeklyLogs = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999); // end of today

    const userId = req.userId;

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);

    const logs = await dailyCalorieLogModel
      .find({
        user: userId,
        date: { $gte: sevenDaysAgo, $lte: endOfToday },
      })
      .sort({ date: 1 }) //ascending by date
      .populate("user", "dailyCalorieGoal macros");

    const chartData = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const log = logs.find(
        (entry) => entry.date.toDateString() === date.toDateString()
      );
      chartData.unshift({
        date: date.toDateString(),
        calories: log ? log.caloriesConsumed : 0,
      });
    }

    return res.status(200).json({ success: true, chartData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
