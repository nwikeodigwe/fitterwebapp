import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/collection/",
});

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: () => "",
      keepUnusedDataFor: 60,
    }),
    getCollection: builder.query({
      query: (collection) => collection,
      keepUnusedDataFor: 60,
    }),
    getCollectionStyles: builder.query({
      query: (collection) => `${collection}/styles`,
      keepUnusedDataFor: 60,
    }),
    createCollection: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    updateCollection: builder.mutation({
      query: (data) => ({
        url: data.collection,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    favoriteCollection: builder.mutation({
      query: (data) => ({
        url: `${data.collection}/favorite`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    unfavoriteCollection: builder.mutation({
      query: (data) => ({
        url: `${data.collection}/unfavorite`,
        method: "DELETE",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    upvoteCollection: builder.mutation({
      query: (data) => ({
        url: `${data.collection}/upvote`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    downvoteCollection: builder.mutation({
      query: (data) => ({
        url: `${data.collection}/downvote`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    unvoteCollection: builder.mutation({
      query: (data) => ({
        url: `${data.collection}/unvote`,
        method: "DELETE",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    deleteCollection: builder.mutation({
      query: (data) => ({
        url: `${data.collection}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useDownvoteCollectionMutation,
  useFavoriteCollectionMutation,
  useGetCollectionQuery,
  useGetCollectionStylesQuery,
  useGetCollectionsQuery,
  useUnfavoriteCollectionMutation,
  useUnvoteCollectionMutation,
  useUpdateCollectionMutation,
  useUpvoteCollectionMutation,
} = collectionApi;
