import { useState, useEffect, useContext } from "react";
import { Dialog } from "radix-ui";
import Form from "./form";
import Context from "../context";

const Index = () => {
  const [open, setOpen] = useState(false);
  const context = useContext(Context);

  const handleChange = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (context?.location) setOpen(context?.location);
  }, [context]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={handleChange}>
      <Dialog.Trigger className="hover:underline transition-all ease-in-out duration-200 p-1">
        Location preferences
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2  w-[90vw] max-w-[350px] -translate-x-1/2 -translate-y-1/2 bg-gray1 focus:outline-none data-[state=open]:animate-contentShow border border-gray-900 px-5 py-8 bg-white">
          <Dialog.Title className="sr-only">Location preferences</Dialog.Title>
          <Dialog.Description className="sr-only">
            Set location for accurate recommendations
          </Dialog.Description>
          <p>Set location for accurate recommendations</p>
          <Form />
          <Dialog.Close asChild>
            <button
              aria-labelledby="Close button"
              className="absolute top-3 right-3 p-0"
              aria-label="Close"
            >
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Index;
