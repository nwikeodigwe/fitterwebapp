import { Dialog } from "radix-ui";
import Form from "./form";
import Context, {initialState} from "../context";
import { useContext } from "react";

const Index = () => {
  const context = useContext(Context);
  const { reset, setIsActive } = context || {};

  const handleChange = () => {
    if (setIsActive) setIsActive({ ...initialState, reset: !reset });
  };

  const handleOpen = () => {
    if (setIsActive) setIsActive({ ...initialState, login: true });
  };
  return (
    <Dialog.Root open={reset} onOpenChange={handleChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2  w-[90vw] max-w-[350px] -translate-x-1/2 -translate-y-1/2 bg-gray1 focus:outline-none data-[state=open]:animate-contentShow border border-gray-900 px-5 py-8 bg-white">
          <Dialog.Title className="sr-only">Reset password</Dialog.Title>
          <Dialog.Description className="sr-only">
            Reset account password
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
          <button
            onClick={handleOpen}
            className="text-center mt-5 hover:underline duration-200 transition-all w-full"
          >
            Back to login
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Index;
