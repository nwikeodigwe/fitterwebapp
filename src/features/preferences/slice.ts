import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type preferenceState = {
  country?: string;
  currency?: string;
};

const initialState: preferenceState = {
  country: undefined,
  currency: undefined,
};

const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    setPreference: (state, action: PayloadAction<preferenceState>) => {
      state.country = action.payload.country;
      state.currency = action.payload.currency;
    },
    clearPreference: (state) => {
      state.country = undefined;
      state.currency = undefined;
    },
  },
});

export const { setPreference, clearPreference } = preferenceSlice.actions;

export default preferenceSlice.reducer;
