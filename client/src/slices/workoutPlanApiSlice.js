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
  }),
});

export const {
  useGetWorkoutProgramQuery,
  useInitWorkoutPreferencesMutation,
  useUpdateWorkoutPreferencesMutation,
} = workoutPlanApiSlice;
