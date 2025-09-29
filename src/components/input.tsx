import clsx from "clsx";
import { IoAlertCircleOutline } from "react-icons/io5";
import { type InputHTMLAttributes, type ReactNode, type Ref } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

const Input = ({ className, icon, error, ref, ...props }: InputProps) => {
  return (
    <div>
      <div
        className={clsx(className, "relative flex items-center gap-2", {
          "border border-red-400": error,
        })}
      >
        {icon}
        <input
          ref={ref}
          className="border-none outline-none focus:outline-none"
          {...props}
        />

        <IoAlertCircleOutline
          className={clsx(
            "absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-red-400",
            !error && "hidden"
          )}
        />
      </div>
      <p className="text-red-500 text-[10px]">{error}</p>
    </div>
  );
};

Input.displayName = "Input";
export default Input;
