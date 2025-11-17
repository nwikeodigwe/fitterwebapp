import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_API_URL}/location`,
});

export const locationApi = createApi({
  reducerPath: "locationApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCountry: builder.query({
      query: () => "/country",
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetCountryQuery } = locationApi;
