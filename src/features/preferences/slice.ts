/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type PreferenceState = {
  country?: string;
  currency?: string;
};

const initialState: PreferenceState = {
  country: "Netherlands",
  currency: "EUR",
};

const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    setPreference: (state, action: PayloadAction<PreferenceState>) => {
      state.country = action.payload.country;
      state.currency = action.payload.currency;
    },
    clearPreference: (_state) => {
      return initialState;
    },
  },
});

export const { setPreference, clearPreference } = preferenceSlice.actions;
export default preferenceSlice.reducer;
