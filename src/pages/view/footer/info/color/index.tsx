import clsx from "clsx";
import Panel from "./panel";
import { useState } from "react";

interface Props {
  color: string;
}

const Color: React.FC<Props> = ({ color }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className={clsx(
        "border-b px-3 py-4 flex items-center justify-between",
        !color && "hidden"
      )}
    >
      <h2 className="text-[10px]">Main Color</h2>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        onPointerDown={(e) => e.stopPropagation()}
        className="hover:underline duration-150 transition cursor-pointer capitalize"
      >
        {color}
      </button>
      <Panel color={color} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Color;
