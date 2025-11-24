import clsx from "clsx";
import { useState } from "react";
import Panel from "./panel";

interface Props {
  material: string;
}
const Index: React.FC<Props> = ({ material }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div
      className={clsx(
        "border-b px-3 py-4 flex items-center justify-between",
        !material && "hidden"
      )}
    >
      <h2 className="text-[10px]">Material</h2>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        onPointerDown={(e) => e.stopPropagation()}
        className="hover:underline duration-150 transition cursor-pointer capitalize"
      >
        {material}
      </button>
      <Panel material={material} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Index;
