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

    // Register route (auth)
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),

    // Logout route (auth)
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),

    // Update Profile route (auth)
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    // Send Verify OTP route (auth)
    sendVerifyOtp: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/send-verify-otp`,
        method: "POST",
        body: data,
      }),
    }),

    // Verify email address OTP (auth)
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/verify-account`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserDataQuery,
  useLazyGetUserDataQuery,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useSendVerifyOtpMutation,
  useVerifyEmailMutation,
} = usersApiSlice;
