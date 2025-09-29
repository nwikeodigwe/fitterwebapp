import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { createContext } from "react";

export const initialState = {
  query: null,
  result: null,
  data: null,
  isLoading: false,
  error: null,
};

export interface Context {
  query: string | null;
  result: unknown[] | null;
  data: unknown[] | null;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

export const SearchContext = createContext<Context | null>(null);
