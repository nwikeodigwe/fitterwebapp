import type { RootState } from "@/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { clearTokens, setTokens } from "../auth/slice";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/user",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const { dispatch } = api;
    try {
      const refreshResult = await baseQuery(
        {
          url: "refresh/token",
          method: "POST",
          credentials: "include",
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { accessToken } = refreshResult.data as { accessToken: string };
        dispatch(setTokens({ accessToken, refreshToken: "" }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        dispatch(clearTokens());
      }
    } catch (err) {
      console.error(err);
      dispatch(clearTokens());
    }
  }
  return result;
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/",
      keepUnusedDataFor: 60,
    }),
    subscribeToUser: builder.mutation({
      query: (data) => ({
        url: `${data.user}/subscribe`,
        method: "POST",
        body: data,
      }),
    }),
    unsubscribefromUser: builder.mutation({
      query: (data) => ({
        url: `${data.user}/unsubscribe`,
        method: "DELETE",
        body: data,
      }),
    }),
    getUserProfile: builder.query({
      query: () => "/me",
      keepUnusedDataFor: 60,
    }),
    getUserStyles: builder.query({
      query: (user) => `${user}/style`,
      keepUnusedDataFor: 60,
    }),
    getUserCollections: builder.query({
      query: (user) => `${user}/collection`,
      keepUnusedDataFor: 60,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/me`,
        method: "PATCH",
        body: data,
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `/profile`,
        method: "PATCH",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/password`,
        method: "PATCH",
        body: data,
      }),
    }),
    getUser: builder.query({
      query: (user) => user,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserCollectionsQuery,
  useGetUserQuery,
  useGetUserProfileQuery,
  useGetUserStylesQuery,
  useSubscribeToUserMutation,
  useUnsubscribefromUserMutation,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} = userApi;
