import { apiSlice } from "./apiSlice";

const WORKOUT_PLAN_URL = "/api/workout";

export const workoutPlanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get workout program route (workout)
    getWorkoutProgram: builder.query({
      query: () => ({
        url: `${WORKOUT_PLAN_URL}/program`,
      }),
      providesTags: ["workoutProgram"],
    }),
    // Initialize workout program preferences route (workout)
    initWorkoutPreferences: builder.mutation({
      query: () => ({
        url: `${WORKOUT_PLAN_URL}/init-preferences`,
        method: "POST",
      }),
      invalidatesTags: ["workoutProgram"],
    }),
    // Update workout program preferences route (workout)
    updateWorkoutPreferences: builder.mutation({
      query: (preferred) => ({
        url: `${WORKOUT_PLAN_URL}/update-preferences`,
        method: "PUT",
        body: preferred,
      }),
      invalidatesTags: ["workoutProgram"],
    }),
    // Advance workout progress index route (workout)
    advanceWorkoutIndex: builder.mutation({
      query: () => ({
        url: `${WORKOUT_PLAN_URL}/advance-index`,
        method: "POST",
      }),
      invalidatesTags: ["workoutProgram"],
    }),
    // Reset workout progress index route (workout)
    resetWorkoutIndexes: builder.mutation({
      query: () => ({
        url: `${WORKOUT_PLAN_URL}/reset-program`,
        method: "POST",
      }),
      invalidatesTags: ["workoutProgram"],
    }),
  }),
});

export const {
  useGetWorkoutProgramQuery,
  useInitWorkoutPreferencesMutation,
  useUpdateWorkoutPreferencesMutation,
  useAdvanceWorkoutIndexMutation,
  useResetWorkoutIndexesMutation,
} = workoutPlanApiSlice;
