import Fieldset from "@/components/fieldset";
import Panel from "@/components/panel";
import { useState } from "react";
import { CiCircleMore } from "react-icons/ci";
import { FaArrowUp } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import Card from "./card";

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
          <form>
            <div className="flex items-start gap-2">
              <span className="text-black bg-black/5 size-8 flex items-center justify-center flex-shrink-0">
                <IoPersonOutline size={20} />
              </span>
              <Fieldset.Root className="grid grid-cols-[1fr_auto]  min-h-[32px] items-end gap-2 w-full p-2 border">
                <Fieldset.Textarea
                  className="w-full resize-none"
                  placeholder="Type your comment..."
                  onInput={(e) => {
                    e.currentTarget.style.height = "auto";
                    e.currentTarget.style.height =
                      e.currentTarget.scrollHeight + "px";
                  }}
                />
                <Fieldset.Button
                  type="submit"
                  className="bg-black text-white p-2 hover:bg-gray-800 transition-colors"
                >
                  <FaArrowUp size={12} />
                </Fieldset.Button>
              </Fieldset.Root>
            </div>
          </form>
        </Panel.Footer>
      </Panel.Root>
    </>
  );
};

export default Index;
