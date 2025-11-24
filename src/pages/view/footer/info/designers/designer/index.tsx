import { useState } from "react";
import Panel from "./panel";

interface Props {
  designer: string;
}

const Index: React.FC<Props> = ({ designer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        onPointerDown={(e) => e.stopPropagation()}
        className="hover:underline duration-150 transition cursor-pointer capitalize"
      >
        {designer}
      </button>
      <Panel designer={designer} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Index;
