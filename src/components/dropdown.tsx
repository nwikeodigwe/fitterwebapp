import clsx from "clsx";
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type HTMLAttributes,
  type SetStateAction,
} from "react";

interface DropdownProp {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext<DropdownProp | null>(null);
interface Root extends HTMLAttributes<HTMLDivElement> {
  open?: boolean;
}

type Trigger = HTMLAttributes<HTMLDivElement>;
type Content = HTMLAttributes<HTMLDivElement>;

const DropdownRoot: React.FC<Root> = ({ children, className, open }) => {
  const [isOpen, setIsOpen] = useState<boolean>(open!);
  return (
    <Context.Provider value={{ isOpen, setIsOpen }}>
      <div className={clsx(className)}>{children}</div>
    </Context.Provider>
  );
};

const DropdownTrigger: React.FC<Trigger> = ({ className, children }) => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "DropdownTrigger component must be used with the dropdown context provider"
    );
  const { setIsOpen } = context || {};
  return (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className={clsx(className)}
    >
      {children}
    </button>
  );
};

const DropdownContent: React.FC<Content> = ({ className, children }) => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "DropdownContent component must be used with the Dropdown context provider"
    );
  const { isOpen } = context || {};
  return <div className={clsx(!isOpen && "hidden", className)}>{children}</div>;
};

DropdownRoot.displayName = "DropdownRoot";
DropdownTrigger.displayName = "DropdownTrigger";
DropdownContent.displayName = "DropdownContent";

const Dropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
};
export default Dropdown;
