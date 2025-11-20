import type { Reducer } from "react";

export type Data = {
  id: string;
  name: string;
  releaseYear: number;
  image: string;
};

type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_COUNT"; payload: number }
  | { type: "SET_DATA"; payload: Data[] }
  | { type: "SET_DESCRIPTION"; payload: string };

export interface State {
  isLoading: boolean;
  error: boolean;
  name?: string;
  description?: string;
  count: number;
  data: Data[] | null;
}

export const initialState: State = {
  isLoading: false,
  error: false,
  name: undefined,
  description: undefined,
  count: 0,
  data: null,
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
    case "SET_DESCRIPTION": {
      return {
        ...state,
        description: action.payload,
      };
    }
  }
};

export default reducer;
