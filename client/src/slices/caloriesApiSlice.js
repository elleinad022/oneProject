import { apiSlice } from "./apiSlice";

const CAL_URL = "/api/calories";

export const caloriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get weekly calories route (calories)
    getWeeklyCalories: builder.query({
      query: () => ({
        url: `${CAL_URL}/calorie-week-log`,
      }),
      providesTags: ["Logs"],
    }),
    // Get daily calories route (calories)
    getTodayCalories: builder.query({
      query: () => ({
        url: `${CAL_URL}/calorie-day-log`,
      }),
      providesTags: ["Logs"],
    }),
  }),
});

export const { useGetWeeklyCaloriesQuery, useGetTodayCaloriesQuery } =
  caloriesApiSlice;
