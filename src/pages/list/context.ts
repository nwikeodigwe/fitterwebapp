import { createContext, type ActionDispatch } from "react";
import type { Action, Data, Filter } from "./reducer";
import type { mainApi } from "@/features/main/service";
import type { Model } from ".";

export interface List {
  name?: Model;
  count: number;
  description?: string;
  data: Data[] | null;
  isLoading: boolean;
  error: boolean;
  filters: Filter;
  dispatch: ActionDispatch<[action: Action]>;
  favorite: ReturnType<typeof mainApi.useFavoriteMutation>[0];
  unfavorite: ReturnType<typeof mainApi.useUnfavoriteMutation>[0];
}

const ListContext = createContext<List | null>(null);
ListContext.displayName = "ListContex";
export default ListContext;
