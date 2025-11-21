import { createContext, type ActionDispatch } from "react";
import type { Action, Data, Filter } from "./reducer";
import type { mainApi } from "@/features/main/service";

export interface List {
  name?: string;
  count?: number;
  description?: string;
  data: Data[] | null;
  isLoading: boolean;
  error: boolean;
  filters: Filter;
  dispatch: ActionDispatch<[action: Action]>;
  handleFavorite: ReturnType<typeof mainApi.useFavoriteMutation>[0];
  handleUnfavorite: ReturnType<typeof mainApi.useUnfavoriteMutation>[0];
}

const ListContext = createContext<List | null>(null);
ListContext.displayName = "ListContex";
export default ListContext;
