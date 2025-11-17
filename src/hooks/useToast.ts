import { useContext } from "react";
import ToastContext, { type Toast } from "../components/context";

const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { toasts, setToasts } = context;

  const showToast = (
    type: Toast["type"],
    message: string,
    duration: number = 3000
  ) => {
    const id = Math.random()
      .toString(36)
      .slice(2, 2 + 9);
    const newToast = { id, type, message };

    setToasts((prev) => [...prev, newToast]);
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  return {
    toasts,
    showToast,
    removeToast,
    clearAllToasts,
  };
};

export default useToast;
