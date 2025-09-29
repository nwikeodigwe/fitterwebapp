import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_API_URL}/search`,
});

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    search: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
    addSearch: builder.mutation({
      query: (data) => ({
        url: "/add",
        method: "POST",
        body: data,
      }),
    }),
    getLatestSearches: builder.query({
      query: ({ limit = 10, offset = 0 }) =>
        `/latest?limit=${limit}&offset=${offset}`,
      keepUnusedDataFor: 60,
    }),
    getFeaturedSearches: builder.query({
      query: ({ limit = 10, offset = 0 }) =>
        `/latest?limit=${limit}&offset=${offset}`,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useGetLatestSearchesQuery,
  useGetFeaturedSearchesQuery,
  useSearchMutation,
  useAddSearchMutation,
} = searchApi;
