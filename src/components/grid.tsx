import clsx from "clsx";
import {
  createContext,
  useContext,
  type HTMLAttributes,
  type ReactNode,
} from "react";

interface Root extends HTMLAttributes<HTMLDivElement> {
  border?: boolean;
  gap?: number;
  grid?: number;
  sm?: number;
  md: number;
  lg: number;
}

interface Item extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface GridContextType {
  border?: boolean;
}

const Context = createContext<GridContextType | null>(null);

const GridRoot: React.FC<Root> = ({
  className,
  border,
  children,
  grid,
  sm,
  md,
  lg,
}) => {
  return (
    <Context.Provider value={{ border }}>
      <div
        className={clsx(
          `grid grid-cols-${grid} sm:grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg}`,
          { "border-l border-t": border },
          className
        )}
      >
        {children}
      </div>
    </Context.Provider>
  );
};

const GridItem: React.FC<Item> = ({ className, children }) => {
  const context = useContext(Context);
  const { border } = context || {};
  return (
    <div className={clsx("border-r border-b", { border: border }, className)}>
      {children}
    </div>
  );
};

GridRoot.displayName = "GridRoot";
GridItem.displayName = "GridItem";
const Grid = {
  Root: GridRoot,
  Item: GridItem,
};
export default Grid;
