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

// import { forwardRef, type ButtonHTMLAttributes } from "react";
// import clsx from "clsx";

// export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

// const Button = forwardRef<HTMLButtonElement, ButtonProps>(
//   ({ className, children, ...props }, ref) => {
//     return (
//       <button
//         ref={ref}
//         className={clsx("px-4 py-2 rounded bg-blue-600 text-white", className)}
//         {...props}
//       >
//         {children}
//       </button>
//     );
//   }
// );

// Button.displayName = "Button";
// export default Button;
