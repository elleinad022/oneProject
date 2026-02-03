import progressTrackerModel from "../models/personalRecordModel";

//@desc Create a progress tracker
//Route POST api/progress/create-tracker
//@access Private
export const createProgressTracker = async (req, res) => {
  try {
    const userId = req.userId;
    const { exercise, unit } = req.body;

    if (!exercise || !unit) {
      return res.status(400).json({
        success: false,
        message: "Valid exercise and unit are required",
      });
    }

    const tracker = await progressTrackerModel.create({
      user: userId,
      exercise,
      unit,
      entries: [],
    });

    return res.status(201).json({
      success: true,
      tracker,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Tracker for this exercise already exists",
      });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Add tracker entry
//Route POST api/progress/add-entry
//@access Private
export const addProgressEntry = async (req, res) => {
  try {
    const userId = req.userId;
    const { trackerId } = req.params;
    const { value, note } = req.body;

    if (value == null) {
      return res.status(400).json({
        success: false,
        message: "Value is required",
      });
    }

    const tracker = await progressTrackerModel.findOne({
      _id: trackerId,
      user: userId,
    });

    if (!tracker) {
      return res.status(404).json({
        success: false,
        message: "Tracker not found",
      });
    }

    tracker.entries.push({ value, note });
    await tracker.save();

    return res.status(200).json({
      success: true,
      tracker,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Gets/shows all trackers
//Route GET api/progress/all-trackers
//@access Private
export const getTrackers = async (req, res) => {
  try {
    const userId = req.userId;

    const trackers = await progressTrackerModel
      .find({ user: userId })
      .sort({ updatedAt: -1 });

    res.status(200).json({ success: true, trackers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Updates/edits an entry from a tracker
//Route PUT api/progress/edit-progress/:trackerId/:entryId
//@access Private
export const updateProgressEntry = async (req, res) => {
  try {
    const userId = req.userId;
    const { trackerId, entryId } = req.params;
    const { value, note } = req.body;

    const tracker = await progressTrackerModel.findOne({
      _id: tracker,
      user: userId,
    });

    if (!tracker) {
      return res.status(404).json({
        success: false,
        message: "Tracker not found",
      });
    }

    const entry = tracker.entries.id(entryId);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    if (value != null) entry.value = value;
    if (note != null) entry.note = note;

    await tracker.save();

    return res.status(200).json({
      success: true,
      tracker,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//@desc Deletes an entry from a tracker
//Route DELETE api/progress/delete-entry/:trackerId/:entryId
//@access Private
export const deleteProgressEntry = async (req, res) => {
  try {
    const userId = req.userId;
    const { trackerId, entryId } = req.params;

    const tracker = await progressTrackerModel.findOne({
      _id: trackerId,
      user: userId,
    });

    if (!tracker) {
      return res.status(404).json({
        success: false,
        message: "Tracker not found",
      });
    }

    const entry = tracker.entries.id(entryId);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    entry.deleteOne();
    await tracker.save();

    return res.status(200).json({
      success: true,
      message: "Entry deleted",
      entries: tracker.entries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
