import clsx from "clsx";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

interface RootProps {
  handleNavigate?: (direction: "right" | "left" | undefined) => void;
  isDraggable?: boolean;
  className?: string;
  children: ReactNode;
  itemCount: number;
}

interface ContentProps {
  className?: string;
  children: ReactNode;
}

interface ItemProps {
  className?: string;
  children: ReactNode;
}

interface NavigationProps {
  className?: string;
  children: ReactNode;
}

interface NavigationLeftProps {
  className?: string;
  children: ReactNode;
}

interface NavigationRightProps {
  className?: string;
  children: ReactNode;
}

interface IndicatorProps {
  className?: string;
}

interface CarouselContextType {
  ref: RefObject<HTMLDivElement | null>;
  active: number;
  isAnimating: boolean;
  isDragging: boolean;
  isDraggable?: boolean;
  itemCount: number;
  currentTranslate: number;
  handleClick: (direction: "right" | "left") => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  handleMouseLeave: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
  handleTransitionEnd: () => void;
  setActive: (index: number) => void;
}

const CarouselContext = createContext<CarouselContextType | undefined>(
  undefined
);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (context === undefined) {
    throw new Error("useCarousel must be used within a CarouselRoot");
  }
  return context;
};

const CarouselRoot: React.FC<RootProps> = ({
  className,
  handleNavigate,
  isDraggable,
  itemCount,
  children,
}) => {
  const [active, setActive] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | undefined>();
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (direction: "left" | "right") => {
      handleNavigate?.(direction);
      setIsAnimating(true);

      if (direction === "left" && active !== 0) {
        setActive(active - 1);
      } else if (direction === "right" && active !== itemCount - 1) {
        setActive(active + 1);
      } else {
        setIsAnimating(false);
      }
    },
    [active, itemCount, handleNavigate]
  );

  const handleTransitionEnd = () => {
    setIsAnimating(false);
    setCurrentTranslate(-active * 100);
    setPrevTranslate(-active * 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isAnimating || !isDraggable) return;

    setIsDragging(true);
    setStartX(e.clientX);
    setPrevTranslate(currentTranslate);

    if (carouselRef.current) {
      carouselRef.current.style.transition = "none";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !isDraggable) return;

    const currentX = e.clientX;
    const diffX = currentX - startX;

    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const dragPercentage = (diffX / containerWidth) * 100;
      const newTranslate = prevTranslate + dragPercentage;

      const maxDrag = 30;
      const constrainedTranslate = Math.max(
        -((itemCount - 1) * 100 + maxDrag),
        Math.min(maxDrag, newTranslate)
      );

      const dragDistance = constrainedTranslate - prevTranslate;

      setDirection(() => {
        return handleNavigate && dragDistance < -10 ? "left" : "right";
      });
      setCurrentTranslate(constrainedTranslate);
      carouselRef.current.style.transform = `translateX(${constrainedTranslate}%)`;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging || !isDraggable) return;

    setIsDragging(false);

    if (carouselRef.current) {
      carouselRef.current.style.transition = "transform 0.5s ease-in-out";

      const dragDistance = currentTranslate - prevTranslate;
      const dragThreshold = 15;

      if (dragDistance < -dragThreshold && active < itemCount - 1) {
        setActive(active + 1);
      } else if (dragDistance > dragThreshold && active > 0) {
        setActive(active - 1);
      } else {
        setCurrentTranslate(-active * 100);
        carouselRef.current.style.transform = `translateX(${-active * 100}%)`;
      }
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    if (handleNavigate) handleNavigate(direction);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimating || !isDraggable) return;

    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setPrevTranslate(currentTranslate);

    if (carouselRef.current) {
      carouselRef.current.style.transition = "none";
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isDraggable) return;

    const currentX = e.touches[0].clientX;
    const diffX = currentX - startX;

    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const dragPercentage = (diffX / containerWidth) * 100;
      const newTranslate = prevTranslate + dragPercentage;

      const maxDrag = 30;
      const constrainedTranslate = Math.max(
        -((itemCount - 1) * 100 + maxDrag),
        Math.min(maxDrag, newTranslate)
      );

      const dragDistance = constrainedTranslate - prevTranslate;

      setDirection(() => {
        return handleNavigate && dragDistance < -10 ? "left" : "right";
      });

      setCurrentTranslate(constrainedTranslate);
      carouselRef.current.style.transform = `translateX(${constrainedTranslate}%)`;
    }
  };

  const handleTouchEnd = () => {
    handleMouseUp();
    if (handleNavigate) handleNavigate(direction);
  };

  useEffect(() => {
    if (!isDragging) {
      setCurrentTranslate(-active * 100);
      setPrevTranslate(-active * 100);
    }
  }, [active, isDragging]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleClick("left");
      if (e.key === "ArrowRight") handleClick("right");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClick]);

  const contextValue: CarouselContextType = {
    ref: carouselRef,
    active,
    isAnimating,
    isDragging,
    isDraggable,
    itemCount,
    currentTranslate,
    handleClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTransitionEnd,
    setActive,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        className={clsx(
          "h-full relative flex items-center justify-center overflow-hidden",
          className
        )}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

const CarouselContent: React.FC<ContentProps> = ({ className, children }) => {
  const context = useCarousel();
  return (
    <div className={clsx("relative w-full h-full", className)}>
      <div
        ref={context.ref}
        className={clsx("flex h-full select-none")}
        style={{
          transform: `translateX(${context.currentTranslate}%)`,
          transition: context.isDragging
            ? "none"
            : "transform 0.5s ease-in-out",
        }}
        onMouseDown={context.handleMouseDown}
        onMouseMove={context.handleMouseMove}
        onMouseUp={context.handleMouseUp}
        onMouseLeave={context.handleMouseLeave}
        onTouchStart={context.handleTouchStart}
        onTouchMove={context.handleTouchMove}
        onTouchEnd={context.handleTouchEnd}
        onTransitionEnd={context.handleTransitionEnd}
      >
        {children}
      </div>
    </div>
  );
};

const CarouselItem: React.FC<ItemProps> = ({ className, children }) => {
  return (
    <div
      className={clsx(
        "w-full h-full flex-shrink-0 flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
};

const CarouselNavigation: React.FC<NavigationProps> = ({
  className,
  children,
}) => {
  return <div className={clsx(className)}>{children}</div>;
};

const CarouselNavigationLeft: React.FC<NavigationLeftProps> = ({
  className,
  children,
}) => {
  const { active, handleClick } = useCarousel();

  return (
    <button
      disabled={active === 0}
      onClick={() => handleClick("left")}
      className={clsx(
        "absolute top-1/2 -translate-y-1/2 left-0 p-5 opacity-0 hover:opacity-100 h-full duration-300 transition z-10 disabled:opacity-0 disabled:hidden group",
        className
      )}
    >
      {children}
    </button>
  );
};

const CarouselNavigationRight: React.FC<NavigationRightProps> = ({
  className,
  children,
}) => {
  const { active, handleClick, itemCount } = useCarousel();

  return (
    <button
      disabled={active === itemCount - 1}
      onClick={() => handleClick("right")}
      className={clsx(
        "absolute top-1/2 -translate-y-1/2 right-0 p-5 opacity-0 hover:opacity-100 h-full duration-300 transition z-10 disabled:opacity-0 disabled:hidden group",
        className
      )}
    >
      {children}
    </button>
  );
};

const CarouselIndicator: React.FC<IndicatorProps> = ({ className }) => {
  const context = useCarousel();

  return (
    <div
      className={clsx(
        "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10",
        className
      )}
    >
      {Array.from({ length: context.itemCount }).map((_, index) => (
        <button
          key={index}
          onClick={() => !context.isAnimating && context.setActive(index)}
          className={clsx(
            "w-2 h-2 rounded-full transition-all duration-300",
            index === context.active
              ? "bg-white scale-125"
              : "bg-white/50 hover:bg-white/80",
            context.isAnimating && "pointer-events-none"
          )}
        />
      ))}
    </div>
  );
};

CarouselRoot.displayName = "CarouselRoot";
CarouselContent.displayName = "CarouselContent";
CarouselItem.displayName = "CarouselItem";
CarouselNavigation.displayName = "CarouselNavigation";
CarouselNavigationLeft.displayName = "CarouselNavigationLeft";
CarouselNavigationRight.displayName = "CarouselNavigationRight";
CarouselIndicator.displayName = "CarouselIndicator";

const Carousel = {
  Root: CarouselRoot,
  Content: CarouselContent,
  Item: CarouselItem,
  Navigation: CarouselNavigation,
  NavigationLeft: CarouselNavigationLeft,
  NavigationRight: CarouselNavigationRight,
  Indicator: CarouselIndicator,
};

export default Carousel;
