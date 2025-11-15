import clsx from "clsx";
import { IoAlertCircleOutline } from "react-icons/io5";
import { type ReactNode, type Ref, type TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  icon?: ReactNode;
  ref?: Ref<HTMLTextAreaElement>;
}

const Textarea = ({ error, className, ...props }: TextareaProps) => {
  return (
    <div>
      <div
        className={clsx(
          "flex flex-col gap-2 border relative",
          className,
          error && "border-red-400"
        )}
      >
        <textarea
          {...props}
          className="border-none outline-none h-full"
        ></textarea>
        <div className={clsx("absolute right-0 top-0", !error && "hidden")}>
          <IoAlertCircleOutline className="absolute right-4 top-1/2 translate-y-1/2 text-2xl text-red-400" />
        </div>
      </div>
      {error && <p className="text-red-500 text-[10px]">{error}</p>}
    </div>
  );
};

export default Textarea;
