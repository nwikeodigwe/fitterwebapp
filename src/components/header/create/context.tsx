import { createContext, type Dispatch, type SetStateAction } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const initialState = {
  item: false,
  style: false,
  brand: false,
  collection: false,
};

export interface Context {
  item: boolean;
  style: boolean;
  brand: boolean;
  collection: boolean;
  setIsActive: Dispatch<
    SetStateAction<{
      item: boolean;
      style: boolean;
      brand: boolean;
      collection: boolean;
    }>
  >;
}

const HeaderCreateContext = createContext<Context | null>(null);
HeaderCreateContext.displayName = "HeaderCreateContext";
export default HeaderCreateContext;
