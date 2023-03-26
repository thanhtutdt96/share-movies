import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "redux/store";
import { API_PATH } from "assets/constants";
import { AuthResponse, AuthSubmitData, User } from "types/Auth";

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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, AuthSubmitData>({
      query: ({ email, password }) => ({
        url: "/signin",
        method: "POST",
        body: { email, password },
      }),
    }),
    register: builder.mutation<AuthResponse, AuthSubmitData>({
      query: ({ email, password }) => ({
        url: "/register",
        method: "POST",
        body: { email, password },
      }),
    }),
    getUserInfo: builder.query<User, void>({
      query: () => "/me",
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserInfoQuery } = authApi;
