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
        {error && (
          <IoAlertCircleOutline className="absolute right-4 top-1/3 text-2xl text-red-400" />
        )}
      </div>
    </div>
  );
};

Input.displayName = "Input";
export default Input;
