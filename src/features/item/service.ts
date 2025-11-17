import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_API_URL}/item`,
});

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ limit = 10, offset = 0 }) =>
        `/?limit=${limit}&offset=${offset}`,
      keepUnusedDataFor: 60,
    }),
    getItem: builder.query({
      query: (item) => item,
      keepUnusedDataFor: 60,
    }),
    getUserItem: builder.query({
      query: () => "/me",
      keepUnusedDataFor: 60,
    }),
    getItemCount: builder.query({
      query: () => `/count`,
      keepUnusedDataFor: 60,
    }),
    getItemTags: builder.query({
      query: () => "/tags",
      keepUnusedDataFor: 60,
    }),
    createItem: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    updateItem: builder.mutation({
      query: (data) => ({
        url: `/${data.item}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    favoriteItem: builder.mutation({
      query: (data) => ({
        url: `/${data.item}/favorite`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    unfavoriteItem: builder.mutation({
      query: (data) => ({
        url: `/${data.item}/unfavorite`,
        method: "DELETE",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    upvoteItem: builder.mutation({
      query: (data) => ({
        url: `/${data.item}/upvote`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    downvoteItem: builder.mutation({
      query: (data) => ({
        url: `/${data.item}/downvote`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    unvoteCollection: builder.mutation({
      query: (data) => ({
        url: `/${data.item}/unvote`,
        method: "DELETE",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    deleteItem: builder.mutation({
      query: (data) => ({
        url: `/${data.item}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetItemQuery,
  useGetItemsQuery,
  useGetItemCountQuery,
  useGetItemTagsQuery,
  useGetUserItemQuery,
  useUpvoteItemMutation,
  useCreateItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useDownvoteItemMutation,
  useFavoriteItemMutation,
  useUnfavoriteItemMutation,
} = itemApi;
