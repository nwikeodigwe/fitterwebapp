import { useContext } from "react";
import ListContext from "./context";

const useList = () => {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error("useCarousel must be used within a List Component");
  }

  return { ...context };
};

export default useList;
