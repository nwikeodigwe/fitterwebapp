import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_API_URL}/auth/`,
  }),
  endpoints: (builder) => ({
    signInUser: builder.mutation({
      query: (data) => ({
        url: "signin",
        method: "POST",
        body: data,
      }),
    }),
    signUpUser: builder.mutation({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: data,
      }),
    }),
    resetUser: builder.mutation({
      query: (data) => ({
        url: "reset",
        method: "POST",
        body: data,
      }),
    }),
    resetUserToken: builder.mutation({
      query: (data) => ({
        url: `reset/${data.token}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignInUserMutation,
  useSignUpUserMutation,
  useResetUserMutation,
  useResetUserTokenMutation,
} = authApi;
