import axios from "axios";
import crypto from "crypto";

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST =
  "ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com";

const API_URL = `https://${RAPID_API_HOST}/generateWorkoutPlan`;

// Hash preferences for deterministic cache lookup
export const hashWorkoutPreferences = (preferences) => {
  const sortedPreferences = JSON.stringify(preferences);
  return crypto.createHash("md5").update(sortedPreferences).digest("hex");
};

export const callRapidApiAndParse = async (preferences) => {
  const body = {
    goal: preferences.primaryGoal,
    fitness_level: preferences.fitnessLevel,
    schedule: {
      days_per_week: preferences.daysPerWeek,
      session_duration: preferences.sessionDuration,
    },
    plan_duration_weeks: 4,
    lang: "en",
  };

  if (preferences.preferences) {
    body.preferences = [preferences.preferences];
  }

  const response = await axios.post(API_URL, body, {
    headers: {
      "Content-Type": "application/json",
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": RAPID_API_HOST,
    },
  });

  const result = response.data.result;

  const plan = (result.exercises || []).map((day) => ({
    day: day.day,
    exercises: (day.exercises || []).map((ex) => ({
      name: ex.name,
      durationMinutes: ex.duration,
      repetitions: ex.repetitions,
      sets: ex.sets,
      equipment: ex.equipment,
    })),
  }));

  return {
    goal: result.goal,
    fitnessLevel: result.fitness_level,
    schedule: {
      daysPerWeek: result.schedule.days_per_week,
      sessionDuration: result.schedule.session_duration,
    },
    totalWeeks: result.total_weeks,
    plan,
    seo_title: result.seo_title,
    seo_content: result.seo_content,
  };
};
