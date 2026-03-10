import { apiSlice } from "./apiSlice";

const PR_URL = "/api/progress";

export const personalRecordApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //Create exercise tracker route (progress)
    createProgressTracker: builder.mutation({
      query: (exerciseAndUnit) => ({
        url: `${PR_URL}/create-tracker`,
        method: "POST",
        body: exerciseAndUnit,
      }),
      invalidatesTags: ["Records"],
    }),
    //Delete exercise tracker route (progress)
    deleteProgressTracker: builder.mutation({
      query: (trackerId) => ({
        url: `${PR_URL}/delete-tracker/${trackerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Records"],
    }),
    //Add progress entry inside exercise tracker route (progress)
    addProgressEntry: builder.mutation({
      query: ({ entry, trackerId }) => ({
        url: `${PR_URL}/add-entry/${trackerId}`,
        method: "POST",
        body: entry,
      }),
      invalidatesTags: ["Records"],
    }),
    //Get all exercise progress tracker route (progress)
    getTrackers: builder.query({
      query: () => ({
        url: `${PR_URL}/all-trackers`,
      }),
      providesTags: ["Records"],
    }),
    //Edit progress entry route (progress)
    updateProgressEntry: builder.mutation({
      query: ({ entry, trackerId, entryId }) => ({
        url: `${PR_URL}/edit-progress/${trackerId}/${entryId}`,
        method: "PUT",
        body: entry,
      }),
      invalidatesTags: ["Records"],
    }),
    //Delete progress entry route (progress)
    deleteProgressEntry: builder.mutation({
      query: ({ trackerId, entryId }) => ({
        url: `${PR_URL}/delete-entry/${trackerId}/${entryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Records"],
    }),
  }),
});

export const {
  useCreateProgressTrackerMutation,
  useDeleteProgressTrackerMutation,
  useAddProgressEntryMutation,
  useDeleteProgressEntryMutation,
  useGetTrackersQuery,
  useUpdateProgressEntryMutation,
} = personalRecordApiSlice;
