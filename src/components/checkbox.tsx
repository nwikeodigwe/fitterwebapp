import clsx from "clsx";
import { Checkbox as Chkbox } from "radix-ui";
import React, { type ReactNode, type Ref } from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: ReactNode;
  ref?: Ref<HTMLTextAreaElement>;
}

const Checkbox = ({ className, error, icon }: CheckboxProps) => {
  return (
    <Chkbox.Root
      className={clsx("place-content-center", className, {
        "border border-red-500": error,
      })}
    >
      <Chkbox.Indicator className={clsx({ "text-red-500": error })}>
        {icon}
      </Chkbox.Indicator>
    </Chkbox.Root>
  );
};

Checkbox.displayName = "Checkbox";
export default Checkbox;
