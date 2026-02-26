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
    // Initialize calories today route (calories)
    initTodayCalories: builder.query({
      query: () => ({
        url: `${CAL_URL}/init-calorie`,
      }),
      providesTags: ["Logs"],
    }),
    // Add meal entry route (calories)
    addMealEntry: builder.mutation({
      query: (meal) => ({
        url: `${CAL_URL}/add-meal`,
        method: "POST",
        body: meal,
      }),
      invalidatesTags: ["Logs"],
    }),
    // Delete meal entry route (calories)
    deleteMealEntry: builder.mutation({
      query: ({ entryId }) => ({
        url: `${CAL_URL}/delete-meal/${entryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Logs"],
    }),
    // Update meal entry route (calories)
    updateMealEntry: builder.mutation({
      query: ({ entryId, ...meal }) => ({
        url: `${CAL_URL}/update-meal/${entryId}`,
        method: "PUT",
        body: meal,
      }),
      invalidatesTags: ["Logs"],
    }),
  }),
});

export const {
  useGetWeeklyCaloriesQuery,
  useGetTodayCaloriesQuery,
  useInitTodayCaloriesQuery,
  useAddMealEntryMutation,
  useDeleteMealEntryMutation,
  useUpdateMealEntryMutation,
} = caloriesApiSlice;
