import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Param = "items" | "brands" | "styles" | "collections";

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
      query: ({ param, ...query }: { param: Param; params?: QueryParams }) => {
        const searchParams = new URLSearchParams();
        console.log(query);

        if (query) {
          Object.entries(query).forEach(([key, value]) => {
            searchParams.append(key, value.toString());
          });
        }

        const queryString = searchParams.toString();
        return `/${param}${queryString ? `?${queryString}` : ""}`;
      },
      keepUnusedDataFor: 60,
      providesTags: (_result, _error, { param }) => [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        { type: param.toUpperCase() as any, id: "LIST" },
      ],
    }),
    favorite: builder.mutation({
      query: (data) => ({
        url: `/action/favorite/${data.type}/${data.id}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    unfavorite: builder.mutation({
      query: (data) => ({
        url: `/action/unfavorite/${data.type}/${data.id}`,
        method: "DELETE",
        body: data,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
    }),
    isFavorited: builder.query({
      query: (param) => `/action/favorited/${param.type}/${param.id}`,
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useIsFavoritedQuery,
  useGetListByFilterQuery,
  useFavoriteMutation,
  useUnfavoriteMutation,
} = mainApi;
