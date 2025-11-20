import clsx from "clsx";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type RefObject,
} from "react";

interface PopoverContext {
  triggerRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  isOpen: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

const Context = createContext<PopoverContext | null>(null);

interface Root extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  openDelay?: number;
  closeDelay?: number;
}

interface Trigger extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  asChild?: boolean;
}

interface Content extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PopoverRoot: React.FC<Root> = ({
  className,
  children,
  openDelay = 0,
  closeDelay = 0,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (openDelay > 0) {
      timeoutRef.current = window.setTimeout(() => {
        setIsOpen(true);
      }, openDelay);
    } else {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (closeDelay > 0) {
      timeoutRef.current = window.setTimeout(() => {
        setIsOpen(false);
      }, closeDelay);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Context.Provider
      value={{
        isOpen,
        handleMouseEnter,
        handleMouseLeave,
        triggerRef,
        contentRef,
      }}
    >
      <div className={clsx("relative", className)} {...props}>
        {children}
      </div>
    </Context.Provider>
  );
};

const PopoverTrigger: React.FC<Trigger> = ({
  className,
  children,
  ...props
}) => {
  const context = useContext(Context);
  if (!context) throw new Error("PopoverTrigger must be used within a Popover");

  const { isOpen, handleMouseEnter, handleMouseLeave, triggerRef } = context;

  return (
    <div
      ref={triggerRef as RefObject<HTMLDivElement>}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-expanded={isOpen}
      className={clsx("cursor-pointer", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const PopoverContent: React.FC<Content> = ({
  className,
  children,
  ...props
}) => {
  const context = useContext(Context);
  if (!context) throw new Error("PopoverContent must be used within a Popover");

  const { isOpen, handleMouseEnter, handleMouseLeave, contentRef, triggerRef } =
    context;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleMouseLeave();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, contentRef, triggerRef, handleMouseLeave]);

  if (!isOpen) return null;

  return (
    <div
      ref={contentRef as RefObject<HTMLDivElement>}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx("absolute z-50", className)}
      {...props}
    >
      {children}
    </div>
  );
};

PopoverRoot.displayName = "PopoverRoot";
PopoverTrigger.displayName = "PopoverTrigger";
PopoverContent.displayName = "PopoverContent";

const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};

export default Popover;
