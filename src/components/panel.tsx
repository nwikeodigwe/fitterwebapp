import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type MouseEventHandler,
  type PointerEventHandler,
} from "react";
import clsx from "clsx";

interface PanelContext {
  isDraggable?: boolean;
  isClosable?: boolean;
  handleClose?: MouseEventHandler<HTMLButtonElement>;
}

const Context = createContext<PanelContext>({
  isDraggable: false,
  isClosable: false,
  handleClose: () => {},
});

interface Root {
  open: boolean;
  isDraggable?: boolean;
  className?: string;
  children: ReactNode;
  isClosable?: boolean;
  handleClose?: () => void;
}

interface Header {
  className?: string;
  children?: ReactNode;
}

interface Content {
  className?: string;
  children: ReactNode;
}

interface Footer {
  className?: string;
  children: ReactNode;
}

const PanelRoot: React.FC<Root> = ({
  open,
  className,
  children,
  isDraggable,
  isClosable,
  handleClose,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });

  const constrainPosition = useCallback((newX: number, newY: number) => {
    const element = elementRef.current;
    if (!element) return { x: newX, y: newY };

    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const padding = 8;
    const minX = padding;
    const maxX = viewportWidth - rect.width - padding;
    const minY = padding;
    const maxY = viewportHeight - rect.height - padding;

    return {
      x: Math.max(minX, Math.min(maxX, newX)),
      y: Math.max(minY, Math.min(maxY, newY)),
    };
  }, []);

  const handleDrag = useCallback(
    (movementX: number, movementY: number) => {
      setTranslate((prev) => {
        const newX = prev.x + movementX;
        const newY = prev.y + movementY;
        return constrainPosition(newX, newY);
      });
    },
    [constrainPosition]
  );

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    target.classList.add("z-20");
    setIsDragging(true);
  };

  const handlePointerUp: PointerEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    // e.currentTarget.classList.remove("z-30");
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }

    const target = e.currentTarget;
    target.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (isDragging) handleDrag(e.movementX, e.movementY);
  };

  return (
    <>
      <Context.Provider value={{ isDraggable, isClosable, handleClose }}>
        <div
          ref={panelRef}
          onPointerDown={isDraggable ? handlePointerDown : undefined}
          onPointerUp={isDraggable ? handlePointerUp : undefined}
          onPointerMove={isDraggable ? handlePointerMove : undefined}
          style={{
            transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
          }}
          className={clsx(className, !open && "hidden")}
        >
          {children}
        </div>
      </Context.Provider>
    </>
  );
};

const PanelHeader: React.FC<Header> = ({ className, children }) => {
  const { isClosable, handleClose } = useContext(Context);
  return (
    <div
      className={clsx(
        "flex items-center justify-between sticky bg-white top-0 left-0 right-0 p-3 z-20",
        className
      )}
    >
      {children}
      <button
        onClick={handleClose}
        onPointerDown={(e) => e.stopPropagation()}
        className={clsx("text-[10px] cursor-pointer", !isClosable && "hidden")}
      >
        Close
      </button>
    </div>
  );
};

const PanelContent: React.FC<Content> = ({ className, children }) => {
  return <div className={clsx("relative", className)}>{children}</div>;
};

const PanelFooter: React.FC<Footer> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        "sticky bg-white bottom-0 left-0 right-0 p-3 z-20",
        className
      )}
    >
      {children}
    </div>
  );
};

PanelRoot.displayName = "Panel";
PanelHeader.displayName = "Header";
PanelContent.displayName = "Content";
PanelFooter.displayName = "Footer";
const Panel = {
  Root: PanelRoot,
  Header: PanelHeader,
  Content: PanelContent,
  Footer: PanelFooter,
};

export default Panel;
