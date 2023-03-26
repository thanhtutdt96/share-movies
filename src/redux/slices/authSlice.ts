import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "types/Auth";

interface InitialStateType {
  token: string | null;
  user: User | null;
}

const initialState: InitialStateType = {
  token: localStorage.getItem("token") || null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;

      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setToken, setUser, logout } = authSlice.actions;
