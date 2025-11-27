import type { Reducer } from "react";
import type { Model } from ".";

export type Data = {
  id: string;
  name: string;
  releaseYear: number;
  image: string;
};

export type Filter = Record<string, string>;

export type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "SET_NAME"; payload: Model }
  | { type: "SET_COUNT"; payload: number }
  | { type: "SET_DATA"; payload: Data[] }
  | { type: "SET_FILTER"; payload: Filter }
  | { type: "ADD_FILTER"; payload: Filter }
  | { type: "REMOVE_FILTER"; payload: string }
  | { type: "CLEAR_FILTER" }
  | { type: "SET_DESCRIPTION"; payload: string };

export interface State {
  isLoading: boolean;
  error: boolean;
  name?: Model;
  description?: string;
  count: number;
  data: Data[] | null;
  filters: Filter;
}

export const initialState: State = {
  isLoading: false,
  error: false,
  name: undefined,
  description: undefined,
  count: 0,
  data: null,
  filters: {},
};

const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "SET_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case "SET_ERROR": {
      return {
        ...state,
        error: action.payload,
      };
    }
    case "SET_NAME": {
      return {
        ...state,
        name: action.payload,
      };
    }
    case "SET_COUNT": {
      return {
        ...state,
        count: action.payload,
      };
    }
    case "SET_DATA": {
      return {
        ...state,
        data: action.payload,
      };
    }
    case "SET_FILTER": {
      return {
        ...state,
        filters: action.payload,
      };
    }
    case "ADD_FILTER": {
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    }
    case "REMOVE_FILTER": {
      return {
        ...state,
        filters: Object.fromEntries(
          Object.entries(state.filters).filter(
            ([key]) => key !== action.payload
          )
        ),
      };
    }
    case "CLEAR_FILTER": {
      return {
        ...state,
        filters: {},
      };
    }
    case "SET_DESCRIPTION": {
      return {
        ...state,
        description: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
