import { createContext, type Dispatch, type SetStateAction } from "react";

export type ToastType = "error" | "success" | "info";

export interface Toast {
  type: ToastType;
  message: string;
  id?: string;
}

export interface ComponentContextValue {
  toasts: Toast[];
  setToasts: Dispatch<SetStateAction<Toast[]>>;
}

const ComponentContext = createContext<ComponentContextValue | undefined>(undefined);
ComponentContext.displayName = "ComponentContext";
export default ComponentContext;