
import Form from "./form";
import Context from "../context";
import { Dialog } from "radix-ui";
import { useContext, useEffect } from "react";
// import  Input from "@/components/input";
const Index = () => {
  const context = useContext(Context);
  const { item, setIsActive } = context || {};

  const handleChange = () => {
    if (setIsActive) setIsActive((prev) => ({ ...prev, item: !prev.item }));
  };

  useEffect(() => {
    if (item)
      document.body.style.overflow = "hidden";
  }, [item]);
  
  return (
    <Dialog.Root open={item} onOpenChange={handleChange}>
      <Dialog.Trigger className="hover:underline transition-all ease-in-out duration-200">
        Item
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="focus:outline-none data-[state=open]:animate-contentShow scrollbar border border-red-400 ">
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[400px] max-h-[80vh] overflow-y-auto border border-gray-900 px-5 py-8 bg-white z-50">
            <Dialog.Title className="sr-only">Create Brand</Dialog.Title>
          <Dialog.Description className="sr-only">
            Create Item
          </Dialog.Description>
          <Form />

          <button
            onClick={handleChange}
            aria-labelledby="Close button"
            className="absolute top-3 right-3 p-0"
            aria-label="Close"
          >
            Close
          </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Index;
