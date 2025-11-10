import { apiSlice } from "./apiSlice";

const AUTH_URL = "/api/auth";
const USERS_URL = "/api/user";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login route (auth)
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    // Get user data route (user)
    getUserData: builder.query({
      query: () => ({
        url: `${USERS_URL}/data`,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserDataQuery,
  useLazyGetUserDataQuery,
} = usersApiSlice;
