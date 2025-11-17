import React, { useState, type Dispatch, type SetStateAction } from "react";
import type { Toast } from "./context";
import ComponentContext from "./context";

export const ComponentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  return (
    <ComponentContext.Provider
      value={{
        toasts,
        setToasts: setToasts as Dispatch<SetStateAction<Toast[]>>,
      }}
    >
      {children}
    </ComponentContext.Provider>
  );
};
