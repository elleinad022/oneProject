import { apiSlice } from "./apiSlice";

const BODY_WEIGHT_URL = "/api/bodyweight";

export const bodyWeightApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get body weight goal (bodyweight)
    getBodyWeightGoal: builder.query({
      query: () => ({
        url: `${BODY_WEIGHT_URL}/goal`,
      }),
      providesTags: ["Logs", "User"],
    }),
    // Set body weight goal (bodyweight)
    setBodyWeightGoal: builder.mutation({
      query: ({ goalWeight, startWeight }) => ({
        url: `${BODY_WEIGHT_URL}/set-goal`,
        method: "PATCH",
        body: { goalWeight, startWeight },
      }),
      invalidatesTags: ["User"],
    }),
    // Get latest body weight log (bodyweight)
    getBodyWeightLatest: builder.query({
      query: () => ({
        url: `${BODY_WEIGHT_URL}/latest`,
      }),
      providesTags: ["Logs", "User"],
    }),
    // Get body weight log history (bodyweight)
    getBodyWeightHistory: builder.query({
      query: () => ({
        url: `${BODY_WEIGHT_URL}/history`,
      }),
      providesTags: ["Logs", "User"],
    }),
    // Add log body weight  (bodyweight)
    logBodyWeight: builder.mutation({
      query: (weightLog) => ({
        url: `${BODY_WEIGHT_URL}/log`,
        method: "POST",
        body: weightLog,
      }),
      invalidatesTags: ["Logs", "User"],
    }),
    // Delete log body weight  (bodyweight)
    deleteBodyWeight: builder.mutation({
      query: () => ({
        url: `${BODY_WEIGHT_URL}/delete-log`,
        method: "DELETE",
      }),
      invalidatesTags: ["Logs", "User"],
    }),
  }),
});

export const {
  useGetBodyWeightGoalQuery,
  useSetBodyWeightGoalMutation,
  useGetBodyWeightLatestQuery,
  useGetBodyWeightHistoryQuery,
  useLogBodyWeightMutation,
  useDeleteBodyWeightMutation,
} = bodyWeightApiSlice;
