import Panel from "@/components/panel";
import { useState } from "react";
import { PiShareFatThin } from "react-icons/pi";
import Search from "./search";
import Content from "./content";
import clsx from "clsx";

const Index = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen((prev) => !prev)} className="p-2 border">
        <PiShareFatThin size={20} />
      </button>
      <Panel.Root
        open={isOpen}
        isClosable
        isDraggable
        handleClose={() => setIsOpen(false)}
        className={clsx(
          "absolute top-1/6 right-1/3 w-[90vw] max-w-[400px] mr-10 bg-gray1 focus:outline-none data-[state=open]:animate-contentShow max-h-[83%] overflow-y-scroll no-scrollbar z-10 bg-white border border-gray-900"
        )}
      >
        <Panel.Header>
          <h2>Share with your friends</h2>
        </Panel.Header>
        <Panel.Content className="">
          <div className="relative  ">
            <Panel.Title className="sr-only">Share</Panel.Title>
            <Panel.Description className="sr-only">Share</Panel.Description>
            <Search />
            <Content />
          </div>
        </Panel.Content>
      </Panel.Root>
    </div>
  );
};

export default Index;
