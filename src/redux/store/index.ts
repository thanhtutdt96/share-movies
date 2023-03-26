import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "redux/services/authApi";
import { coreApi } from "redux/services/coreApi";
import { authSlice } from "redux/slices/authSlice";
import { toastSlice } from "redux/slices/toastSlice";

export const store = configureStore({
  reducer: {
    [coreApi.reducerPath]: coreApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    toast: toastSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coreApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch
