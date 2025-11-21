import { createContext } from "react";

type Filter = {
  toggleFilter: (data: Record<string, string>) => void;
};

const Context = createContext<Filter | null>(null);
export default Context;
