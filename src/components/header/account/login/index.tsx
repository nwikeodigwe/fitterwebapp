import { useEffect, useContext } from "react";
import { Dialog } from "radix-ui";
import { Link } from "react-router";
import Form from "./form";
import Context from "../context";

const Index = () => {
  const context = useContext(Context);
  const { login, setIsActive } = context || {};

  const handleChange = () => {
    if (setIsActive) setIsActive((prev) => ({ ...prev, login: !prev.login }));
  };

  const handleRegisterOpen = () => {
    if (setIsActive)
      setIsActive({
        login: false,
        register: true,
        reset: false,
        location: false,
      });
  };

  useEffect(() => {
    if (login) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [login]);

  return (
    <Dialog.Root open={login} onOpenChange={handleChange}>
      <Dialog.Trigger className="hover:underline transition-all ease-in-out duration-200 p-1">
        Login
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
            onClick={handleRegisterOpen}
            className="text-center mt-5 hover:underline duration-200 transition-all w-full"
          >
            Register
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
