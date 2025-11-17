import React from "react";
import useToast from "../hooks/useToast";
import { IoIosClose } from "react-icons/io";

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed w-[300px] top-20 right-3 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-2 flex items-center justify-between w-full border ${toast.type}`}
          onClick={() => removeToast(toast.id!)}
        >
          <span>{toast.message}</span>
          <button onClick={() => removeToast(toast.id!)}>
            <IoIosClose size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
