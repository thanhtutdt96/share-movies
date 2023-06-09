import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "redux/store";
import { API_PATH } from "assets/constants";
import { ApiTagType, MovieItem, MovieSubmitData } from "types/Common";

const baseQuery = fetchBaseQuery({
  baseUrl: API_PATH,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    headers.set("Accept", "application/json");
    headers.set("Content-Type", "application/json");

    return headers;
  },
});

export const coreApi = createApi({
  reducerPath: "coreApi",
  baseQuery,
  tagTypes: [ApiTagType.CORE],
  endpoints: (builder) => ({
    createSharedMovie: builder.mutation<MovieItem, MovieSubmitData>({
      query: ({ title, description, embedId, email }) => ({
        url: "/shared-movies",
        method: "POST",
        body: { title, description, embedId, email },
      }),
      invalidatesTags: [ApiTagType.CORE],
    }),
    getSharedMovies: builder.query<MovieItem[], void>({
      query: () => "/shared-movies",
      providesTags: [ApiTagType.CORE],
    }),
  }),
});

export const { useCreateSharedMovieMutation, useGetSharedMoviesQuery } = coreApi;
