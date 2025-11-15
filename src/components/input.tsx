import clsx from "clsx";
import { IoAlertCircleOutline } from "react-icons/io5";
import {
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  options?: string[];
  value?: string;
  error?: string;
  icon?: ReactNode;
  ref?: Ref<HTMLInputElement>;
}

const CustomInput = ({
  icon,
  error,
  ref,
  className,
  ...props
}: InputProps) => {

  return (
    <div className="relative">
      <div
        className={clsx("relative items-center gap-2", className, {
          "border border-red-400": error,
        })}
      >
        {icon}
        <input
          ref={ref}
          className="border-none outline-none focus:outline-none capitalize border"
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

CustomInput.displayName = "Input";
export default CustomInput;
