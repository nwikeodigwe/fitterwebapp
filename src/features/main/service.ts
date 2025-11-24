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
    getListByFilter: builder.query({
      query: ({ model, ...queries }: { model: Model; queries?: QueryParams }) => {
        const searchParams = new URLSearchParams();

        if (queries) {
          Object.entries(queries).forEach(([key, value]) => {
            if (value) searchParams.append(key, value.toString());
          });
        }

        const urlQueryString = searchParams.toString();
        return `/${model}${urlQueryString ? `?${urlQueryString}` : ""}`;
      },
      keepUnusedDataFor: 60,
    }),
    getListing: builder.query({
      query: ({ model, slug }) => `${model}/${slug}`,
      keepUnusedDataFor: 60,
    }),
    favorite: builder.mutation({
      query: (data) => ({
        url: `/${data.type}/${data.id}`,
        method: "POST",
        body: data,
        // Should add to baseQuery
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    unfavorite: builder.mutation({
      query: ({ type, id, token }) => ({
        url: `/${type}/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    isFavorited: builder.query({
      query: ({ type, id, token }) => ({
        url: `/${type}/${id}/favorited`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      keepUnusedDataFor: 60,
    }),
    getUpvoteCount: builder.query({
      query: ({ model, id }) => `/vote/${model}/${id}/upvote`,
      keepUnusedDataFor: 60,
    }),
    getDownvoteCount: builder.query({
      query: ({ model, id }) => `/vote/${model}/${id}/downvote`,
      keepUnusedDataFor: 60,
    }),
    getCommentCount: builder.query({
      query: ({ model, id }) => `/comment/${model}/${id}/count`,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useGetListingQuery,
  useGetListByFilterQuery,
  useGetUpvoteCountQuery,
  useGetDownvoteCountQuery,
  useFavoriteMutation,
  useIsFavoritedQuery,
  useUnfavoriteMutation,
} = mainApi;
