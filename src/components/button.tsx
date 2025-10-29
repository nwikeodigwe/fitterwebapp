import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = React.memo(({ className, children, ...props }: ButtonProps) => {
  return (
    <button className={clsx(className)} {...props}>
      {children}
    </button>
  );
});

export default Button;
