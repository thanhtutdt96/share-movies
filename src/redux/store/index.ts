import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import { authApi } from "redux/services/authApi";
import { coreApi } from "redux/services/coreApi";
import { authSlice } from "redux/slices/authSlice";

const rootReducer = combineReducers({
  [coreApi.reducerPath]: coreApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  auth: authSlice.reducer,
});

export const store = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      [coreApi.reducerPath]: coreApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      auth: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(coreApi.middleware, authApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>; // A global type to access reducers types
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore["dispatch"];
