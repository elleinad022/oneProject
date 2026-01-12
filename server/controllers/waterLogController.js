import dailyWaterLogModel from "../models/dailyWaterLogModel.js";

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
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
