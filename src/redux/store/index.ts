import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "redux/services/authApi";
import { coreApi } from "redux/services/coreApi";
import { youtubeApi } from "redux/services/youtubeApi";
import { authSlice } from "redux/slices/authSlice";

export const store = configureStore({
  reducer: {
    [coreApi.reducerPath]: coreApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coreApi.middleware, authApi.middleware, youtubeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch