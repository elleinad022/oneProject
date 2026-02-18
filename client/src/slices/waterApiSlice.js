import { apiSlice } from "./apiSlice";

const WATER_URL = "/api/water";

export const waterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Initialize water log route (water)
    initTodayWaterLog: builder.query({
      query: () => ({
        url: `${WATER_URL}/init-water`,
      }),
      providesTags: ["Logs"],
    }),
    // Log water entry route (water)
    addWaterEntry: builder.mutation({
      query: (waterAmount) => ({
        url: `${WATER_URL}/add-water`,
        method: "POST",
        body: waterAmount,
      }),
      invalidatesTags: ["Logs"],
    }),
    // Get water log today route (water)
    getWaterTodayLog: builder.query({
      query: () => ({
        url: `${WATER_URL}/water-day-log`,
      }),
      providesTags: ["Logs"],
    }),
    // Get water log week route (water)
    getWaterWeekLog: builder.query({
      query: () => ({
        url: `${WATER_URL}/water-week-log`,
      }),
      providesTags: ["Logs"],
    }),
    // Delete water log entry route (water)
    deleteWaterEntry: builder.mutation({
      query: ({ entryId }) => ({
        url: `${WATER_URL}/delete-water/${entryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Logs"],
    }),
    // Update or edit water log entry route (water)
    updateWaterEntry: builder.mutation({
      query: ({ entryId, waterAmount }) => ({
        url: `${WATER_URL}/update-water/${entryId}`,
        method: "PUT",
        body: { waterAmount },
      }),
      invalidatesTags: ["Logs"],
    }),
  }),
});

export const {
  useAddWaterEntryMutation,
  useDeleteWaterEntryMutation,
  useGetWaterTodayLogQuery,
  useGetWaterWeekLogQuery,
  useInitTodayWaterLogQuery,
  useUpdateWaterEntryMutation,
} = waterApiSlice;
