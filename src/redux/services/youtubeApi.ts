import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { YOUTUBE_API_KEY, YOUTUBE_API_PATH } from "assets/constants";
import { YoutubeMovieResponse } from "types/Common";

const baseQuery = fetchBaseQuery({
  baseUrl: YOUTUBE_API_PATH,
});

export const youtubeApi = createApi({
  reducerPath: "youtubeApi",
  baseQuery,
  endpoints: (builder) => ({
    getYoutubeMovieInfo: builder.query<YoutubeMovieResponse, string>({
      query: (videoId: string) => `/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`,
    }),
  }),
});

export const { useLazyGetYoutubeMovieInfoQuery } = youtubeApi;
