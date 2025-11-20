import { createContext } from "react";
import type { Data } from "./reducer";

export interface List {
  name?: string;
  count?: number;
  description?: string;
  data: Data[] | null;
  isLoading: boolean;
  error: boolean;
}

const ListContext = createContext<List | null>(null);
ListContext.displayName = "ListContex";
export default ListContext;
