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
    <div
      className={clsx(
        "flex flex-col gap-2 border",
        className,
        error && "border-red-400"
      )}
    >
      <textarea
        {...props}
        className="border-none outline-none h-full text-sm"
      ></textarea>
      {error && (
        <>
          <div className="absolute right-0 top-0">
            <IoAlertCircleOutline className="text-red-400" />
          </div>
          <p className="text-red-400 text-sm">{error}</p>
        </>
      )}
    </div>
  );
};

export default Textarea;
