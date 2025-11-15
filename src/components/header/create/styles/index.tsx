import { useEffect, useContext } from "react";
import { Dialog } from "radix-ui";
import Form from "./form";
import Context from "../context";

const Index = () => {
  const context = useContext(Context);
  const { style, setIsActive } = context || {};

  const handleChange = () => {
    if (setIsActive) setIsActive((prev) => ({ ...prev, style: !prev.style }));
  };


  useEffect(() => {
    if (style) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [style]);

  return (
    <Dialog.Root open={style} onOpenChange={handleChange}>
      <Dialog.Trigger className="hover:underline transition-all ease-in-out duration-200">
        Style
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2  w-[90vw] max-w-[350px] -translate-x-1/2 -translate-y-1/2 bg-gray1 focus:outline-none data-[state=open]:animate-contentShow border border-gray-900 px-5 py-8 bg-white">
          <Dialog.Title className="sr-only">Login</Dialog.Title>
          <Dialog.Description className="sr-only">
            Login to your account
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Index;
