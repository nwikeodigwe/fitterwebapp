import clsx from "clsx";
import { useState, type PointerEventHandler } from "react";

const Info = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState({
    x: 0,
    y: 0,
  });

  const handleDrag: PointerEventHandler<HTMLDivElement> = (e) => {
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY,
    });
  };

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    const target = e.currentTarget;
    target.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handlePointerUp: PointerEventHandler<HTMLDivElement> = (e) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }

    const target = e.currentTarget;
    target.releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
    if (isDragging) handleDrag(e);
  };

  const toggleOpen = () => {
    console.log("Clicked!!!");
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={toggleOpen}
        className="cursor-pointer hover:underline duration-150 transition"
      >
        Info
      </button>
      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{
          transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
        }}
        className={clsx(
          "absolute top-0 right-0 w-[90vw] max-w-[350px] mr-10 bg-gray1 focus:outline-none data-[state=open]:animate-contentShow border border-gray-900 bg-white h-full p-2",
          !isOpen && "hidden"
        )}
      >
        <div className="flex items-center justify-between">
          <h1>Information</h1>
          <button
            onClick={toggleOpen}
            onPointerDown={(e) => e.stopPropagation()}
            aria-labelledby="Close button"
            className="cursor-pointer z-20"
            aria-label="Close"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Info;
