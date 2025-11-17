import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type authState = {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
};

const initialState: authState = {
  token: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens(
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    updateAccessToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    clearTokens(state) {
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setTokens, updateAccessToken, clearTokens } = authSlice.actions;
export default authSlice.reducer;
