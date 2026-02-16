import { apiSlice } from "./apiSlice";

const BODY_WEIGHT_URL = "/api/bodyweight";

export const bodyWeightApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get body weight goal (bodyweight)
    getBodyWeightGoal: builder.query({
      query: () => ({
        url: `${BODY_WEIGHT_URL}/goal`,
      }),
      providesTags: ["User"],
    }),
    // Set body weight goal (bodyweight)
    setBodyWeightGoal: builder.mutation({
      query: (weightGoal) => ({
        url: `${BODY_WEIGHT_URL}/set-goal`,
        method: "POST",
        body: { weightGoal },
      }),
      invalidatesTags: ["User"],
    }),
    // Get latest body weight log (bodyweight)
    getBodyWeightLatest: builder.query({
      query: () => ({
        url: `${BODY_WEIGHT_URL}/latest`,
      }),
      providesTags: ["User"],
    }),
    // Get body weight log history (bodyweight)
    getBodyWeightHistory: builder.query({
      query: () => ({
        url: `${BODY_WEIGHT_URL}/history`,
      }),
      providesTags: ["User"],
    }),
    // Add log body weight  (bodyweight)
    logBodyWeight: builder.mutation({
      query: (weightLog, loggedAt) => ({
        url: `${BODY_WEIGHT_URL}/log`,
        method: "POST",
        body: { weightLog, loggedAt },
      }),
      invalidatesTags: ["Logs", "User"],
    }),
    // Delete log body weight  (bodyweight)
    logBodyWeight: builder.mutation({
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
} = bodyWeightApiSlice;
