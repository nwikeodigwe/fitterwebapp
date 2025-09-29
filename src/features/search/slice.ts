import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SearchState = string[];

const initialState: SearchState = ["Gucci"];

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearch: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    removeSearch: (state, action: PayloadAction<string>) => {
      state = state.filter((s) => s !== action.payload);
    },
    clearSearch: () => {
      return initialState;
    },
  },
});

export const { addSearch, removeSearch, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
