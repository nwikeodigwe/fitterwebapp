import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Model = "items" | "brands" | "styles" | "collections";

interface QueryParams {
  orderBy?: string;
  sort?: "asc" | "desc";
  limit?: number;
  page?: number;
  search?: string;
  [key: string]: string | number | undefined;
}

const getQueries = ({
  url,
  ...queries
}: {
  url: string;
  queries?: QueryParams;
}) => {
  const searchParams = new URLSearchParams();

  if (queries) {
    Object.entries(queries).forEach(([key, value]) => {
      if (value) searchParams.append(key, value.toString());
    });
  }

  const urlQueryString = searchParams.toString();
  return `/${url}${urlQueryString ? `?${urlQueryString}` : ""}`;
};

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_API_URL}`,
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: baseQuery,
  tagTypes: ["Items", "Brands", "Styles", "Collection"],
  endpoints: (builder) => ({
    getModelTags: builder.query({
      query: ({ model, ...queries }: { model: Model; queries?: QueryParams }) =>
        getQueries({ url: model + "/tags", ...queries }),
      keepUnusedDataFor: 0,
    }),
    getListByFilter: builder.query({
      query: ({ model, ...queries }: { model: Model; queries?: QueryParams }) =>
        getQueries({ url: model, ...queries }),
      keepUnusedDataFor: 60,
    }),
    getListing: builder.query({
      query: ({ model, slug }) => `${model}/${slug}`,
      keepUnusedDataFor: 60,
    }),
    favorite: builder.mutation({
      query: ({ model, id }: { model: Model; id: string }) => ({
        url: `/favorite/${model}/${id}`,
        method: "POST",
        headers: {
          //   Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    unfavorite: builder.mutation({
      query: ({ model, id }: { model: Model; id: string }) => ({
        url: `/${model}/${id}`,
        method: "DELETE",
        headers: {
          //   Authorization: `Bearer ${token}`,
        },
      }),
    }),
    isFavorited: builder.query({
      query: ({ model, id }: { model: Model; id: string }) => ({
        url: `/${model}/${id}/favorited`,
        headers: {
          //   Authorization: `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 60,
    }),
    getCommentCount: builder.query({
      query: ({ model, id }) => `/comment/${model}/${id}/count`,
      keepUnusedDataFor: 60,
    }),
    getComments: builder.query({
      query: ({ model, id }: { model: Model; id: string }) =>
        `/comments/${model}/${id}`,
      keepUnusedDataFor: 0,
    }),
    upvote: builder.mutation({
      query: ({ model, id }: { model: Model; id: string }) => ({
        url: `/vote/${model}/${id}/upvote`,
        method: "POST",
        headers: {
          //   Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    getUpvoteCount: builder.query({
      query: ({ model, id }: { model: Model; id: string }) =>
        `/vote/${model}/${id}/upvote`,
      keepUnusedDataFor: 60,
    }),
    downvote: builder.mutation({
      query: ({ model, id }: { model: Model; id: string }) => ({
        url: `/vote/${model}/${id}/downvote`,
        method: "POST",
        // headers: {
        //   Authorization: `Bearer ${data.token}`,
        // },
      }),
    }),
    getDownvoteCount: builder.query({
      query: ({ model, id }: { model: Model; id: string }) =>
        `/vote/${model}/${id}/downvote`,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useGetListingQuery,
  useGetModelTagsQuery,
  useGetListByFilterQuery,
  useDownvoteMutation,
  useUpvoteMutation,
  useGetCommentsQuery,
  useGetUpvoteCountQuery,
  useGetDownvoteCountQuery,
  useFavoriteMutation,
  useIsFavoritedQuery,
  useUnfavoriteMutation,
} = mainApi;
