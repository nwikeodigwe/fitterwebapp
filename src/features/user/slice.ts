import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type userStateType = {
  id?: string;
  email?: string;
  prefix?: string;
  firstname?: string;
  lastname?: string;
  suffix?: string;
  home_phone?: string;
  phone?: string;
  job_title?: string;
  company?: string;
  website?: string;
  blog?: string;
  image?: string;
  created_at?: string;
  role?: string;
  authenticated: boolean;
};

const initialState: userStateType = {
  id: undefined,
  email: undefined,
  prefix: undefined,
  firstname: undefined,
  lastname: undefined,
  suffix: undefined,
  home_phone: undefined,
  phone: undefined,
  job_title: undefined,
  company: undefined,
  website: undefined,
  blog: undefined,
  image: undefined,
  created_at: undefined,
  role: "user",
  authenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      Object.assign(state, action.payload);
    },
    clearUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
