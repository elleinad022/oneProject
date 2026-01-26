import { apiSlice } from "./apiSlice";

const FEATURED_MEAL_URL = "/api/featured-meals";

export const featuredMealApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get featured meals route (featuredMeals)
    getFeaturedMealsToday: builder.query({
      query: () => ({
        url: `${FEATURED_MEAL_URL}/today`,
      }),
      providesTags: ["featuredMeals"],
    }),
  }),
});

export const { useGetFeaturedMealsTodayQuery } = featuredMealApiSlice;
