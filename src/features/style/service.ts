import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/style/",
});

export const styleApi = createApi({
  reducerPath: "styleApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getStyles: builder.query({
      query: () => "",
      keepUnusedDataFor: 60,
    }),
    getStyle: builder.query({
      query: (style) => style,
      keepUnusedDataFor: 60,
    }),
    getUserStyle: builder.query({
      query: () => "me",
      keepUnusedDataFor: 60,
    }),
    createStyle: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    commentOnStyle: builder.mutation({
      query: (data) => ({
        url: `${data.style}/comment`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    commentOnComment: builder.mutation({
      query: (data) => ({
        url: `${data.style}/comment/${data.comment}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    getStyleComment: builder.query({
      query: (style) => `${style}/comments`,
      keepUnusedDataFor: 60,
    }),
    updateStyle: builder.mutation({
      query: (data) => ({
        url: data.style,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    deleteStyleComment: builder.mutation({
      query: (data) => ({
        url: `comment/${data.comment}`,
        method: "DELETE",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    favoriteStyle: builder.mutation({
      query: (data) => ({
        url: `${data.style}/favorite`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    unfavoriteStyle: builder.mutation({
      query: (data) => ({
        url: `${data.style}/unfavorite`,
        method: "DELETE",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    upvoteCollection: builder.mutation({
      query: (data) => ({
        url: `${data.style}/upvote`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    downvoteCollection: builder.mutation({
      query: (data) => ({
        url: `${data.style}/downvote`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    unvoteCollection: builder.mutation({
      query: (data) => ({
        url: `${data.style}/unvote`,
        method: "DELETE",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    publishStyle: builder.mutation({
      query: (data) => ({
        url: `${data.style}/publish`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    unpublishStyle: builder.mutation({
      query: (data) => ({
        url: `${data.style}/unpublish`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    deleteStyle: builder.mutation({
      query: (data) => ({
        url: `${data.style}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useCommentOnCommentMutation,
  useCommentOnStyleMutation,
  useCreateStyleMutation,
  useDeleteStyleCommentMutation,
  useDeleteStyleMutation,
  useDownvoteCollectionMutation,
  useFavoriteStyleMutation,
  useGetStyleCommentQuery,
  useGetStyleQuery,
  useGetStylesQuery,
  useGetUserStyleQuery,
} = styleApi;
