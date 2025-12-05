import { apiSlice } from "./apiSlice";

const CAL_URL = "/api/calories";

export const caloriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get weekly calories route (calories)
    getWeeklyCalories: builder.query({
      query: () => ({
        url: `${CAL_URL}/calorie-week-log`,
      }),
    }),
  }),
});

export const { useGetWeeklyCaloriesQuery } = caloriesApiSlice;
