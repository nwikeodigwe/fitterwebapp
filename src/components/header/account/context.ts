import { createContext, type Dispatch, type SetStateAction } from "react";

export const initialState = {
  reset: false,
  login: false,
  register: false,
  location: false,
};

export interface Context {
  reset: boolean;
  login: boolean;
  register: boolean;
  location: boolean;
  setIsActive: Dispatch<
    SetStateAction<{
      reset: boolean;
      login: boolean;
      register: boolean;
      location: boolean;
    }>
  >;
}

const HeaderAccountContext = createContext<Context | null>(null);
HeaderAccountContext.displayName = "HeaderAccountContext";
export default HeaderAccountContext;
