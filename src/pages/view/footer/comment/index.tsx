import Panel from "@/components/panel";
import { useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import Card from "./card";
import Form from "./form";

const Index = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 border-r border-b flex items-center gap-1"
      >
        <CiCircleMore size={20} />
        <span className="opacity-50 text-[10px]">1.4k</span>
      </button>
      <Panel.Root
        open={isOpen}
        isClosable
        isDraggable
        handleClose={() => setIsOpen(false)}
        className="absolute top-0 left-0 w-[90vw] max-w-[350px] mr-10 bg-gray1 focus:outline-none data-[state=open]:animate-contentShow border border-gray-900 bg-white max-h-[83%] overflow-y-scroll no-scrollbar ml-5"
      >
        <Panel.Header>
          <h2 className="text-[10px]">Comments</h2>
        </Panel.Header>
        <Panel.Content className="p-3 space-y-3">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </Panel.Content>
        <Panel.Footer>
          <Form />
        </Panel.Footer>
      </Panel.Root>
    </>
  );
};

export default Index;
