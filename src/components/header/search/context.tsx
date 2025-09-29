import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { createContext } from "react";
import type { Result } from "./result.types";

export const initialState = {
  query: null,
  result: null,
  isLoading: false,
  error: null,
};

export interface Context {
  query: string | null;
  result: Result | null;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

export const SearchContext = createContext<Context | null>(null);
