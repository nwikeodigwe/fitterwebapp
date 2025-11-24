import { Dialog } from "radix-ui";
import { useState } from "react";
import { PiShareFatThin } from "react-icons/pi";
import Search from "./search";
import Content from "./content";
import { IoCloseOutline } from "react-icons/io5";

const Index = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
      <Dialog.Trigger className="p-2 border">
        <PiShareFatThin size={20} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2  w-[90vw] max-w-[350px] -translate-x-1/2 -translate-y-1/2 bg-gray1 focus:outline-none data-[state=open]:animate-contentShow border border-gray-900 bg-white">
          <div className="relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 bg-white rounded-full border p-1 hover:cursor-pointer duration-150 transition z-10"
            >
              <IoCloseOutline size={10} />
            </button>
            <Dialog.Title className="sr-only">Share</Dialog.Title>
            <Dialog.Description className="sr-only">Share</Dialog.Description>
            <Search />
            <Content />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Index;
