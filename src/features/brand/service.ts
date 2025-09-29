import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_API_URL}/brand`,
});

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => "/",
      keepUnusedDataFor: 60,
    }),
    getBrand: builder.query({
      query: (brand) => `/${brand}`,
      keepUnusedDataFor: 60,
    }),
    getBrandTags: builder.query({
      query: () => "/tags",
      keepUnusedDataFor: 60,
    }),
    createBrand: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    updateBrand: builder.mutation({
      query: (data) => ({
        url: `${data.brand}`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    favoriteBrand: builder.mutation({
      query: (data) => ({
        url: `/${data.brand}/favorite`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    unfavoriteBrand: builder.mutation({
      query: (data) => ({
        url: `/${data.brand}/unfavorite`,
        method: "DELETE",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    upvoteBrand: builder.mutation({
      query: (data) => ({
        url: `/${data.brand}/upvote`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    downvoteBrand: builder.mutation({
      query: (data) => ({
        url: `/${data.brand}/downvote`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    unvoteBrand: builder.mutation({
      query: (data) => ({
        url: `/${data.brand}/unvote`,
        method: "PUT",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    subscribeToBrand: builder.mutation({
      query: (data) => ({
        url: `/${data.brand}/subscribe`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    unsubscribefromBrand: builder.mutation({
      query: (data) => ({
        url: `/${data.brand}/unsubscribe`,
        method: "DELETE",
        body: data,
      }),
    }),
    commentOnBrand: builder.mutation({
      query: (data) => ({
        url: `/${data.brand}/comment`,
        method: "POST",
        body: data,
      }),
    }),
    commentOnComment: builder.mutation({
      query: (data) => ({
        url: `/${data.brand}/comment/${data.comment}`,
        method: "POST",
        body: data,
      }),
    }),
    getBrandComments: builder.query({
      query: (brand) => `/${brand}/comments`,
      keepUnusedDataFor: 60,
    }),
    deleteComment: builder.mutation({
      query: (data) => ({
        url: `/comment/${data.comment}`,
        method: "DELETE",
        body: data,
      }),
    }),
    deleteBrand: builder.mutation({
      query: (data) => ({
        url: `/${data.brand}`,
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandQuery,
  useGetBrandTagsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useFavoriteBrandMutation,
  useUnfavoriteBrandMutation,
  useUpvoteBrandMutation,
  useDownvoteBrandMutation,
  useUnvoteBrandMutation,
  useSubscribeToBrandMutation,
  useUnsubscribefromBrandMutation,
  useCommentOnBrandMutation,
  useCommentOnCommentMutation,
  useGetBrandCommentsQuery,
  useDeleteCommentMutation,
  useDeleteBrandMutation,
} = brandApi;
