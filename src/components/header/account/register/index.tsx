import { useEffect, useContext } from "react";
import { Dialog } from "radix-ui";
import { Link } from "react-router";
import Form from "./form";
import Context, {initialState} from "../context";

const Index = () => {
  const context = useContext(Context);
  const { register, setIsActive } = context || {};

  const handleChange = () => {
    if (!setIsActive) return;
    setIsActive((prev) => ({ ...prev, register: !prev.register }));
  };

  const handleOpen = () => {
    if (setIsActive)
      setIsActive(() => ({
        ...initialState,
        login: true,
      }));
  };

  useEffect(() => {
    if (register) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [register]);

  return (
    <Dialog.Root open={register} onOpenChange={handleChange}>
      <Dialog.Trigger className="hover:underline transition-all ease-in-out duration-200">
        Create account
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0" />
        <Dialog.Content className="fixed left-1/2 top-1/2  w-[90vw] max-w-[350px] -translate-x-1/2 -translate-y-1/2 bg-gray1 focus:outline-none data-[state=open]:animate-contentShow border border-gray-900 px-5 py-8 bg-white">
          <Dialog.Title className="sr-only">Create Account</Dialog.Title>
          <Dialog.Description className="sr-only">
            Create your account
          </Dialog.Description>
          <Form />
          <button
            onClick={handleOpen}
            className="text-center mt-5 hover:underline transition-all duration-200 block w-full"
          >
            Login
          </button>
          <p className="text-center text-[10px] text-gray-700 mt-5">
            By proceeding, you agree to the{" "}
            <Link to="/privacy">privacy policy</Link> and{" "}
            <Link to="/terms">terms of use</Link>
          </p>
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
