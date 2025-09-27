import { createContext, useContext } from "react";
import Textarea, { type TextareaProps } from "@/components/textarea";
import Input, { type InputProps } from "@/components/input";
import Button, { type ButtonProps } from "@/components/button";
import clsx from "clsx";
import Checkbox, { type CheckboxProps } from "./checkbox";

interface FieldsetProps {
  className?: string;
  children?: React.ReactNode;
  required?: boolean;
}

interface FieldsetContextType {
  required?: boolean;
}

const context = createContext<FieldsetContextType>({ required: false });

const FieldsetRoot = ({ className, children, required }: FieldsetProps) => {
  return (
    <context.Provider value={{ required }}>
      <fieldset className={clsx("relative group w-full", className)}>
        {children}
      </fieldset>
    </context.Provider>
  );
};

const FieldsetLabel = ({
  children,
  htmlFor,
  className,
}: {
  children: React.ReactNode;
  htmlFor: string;
  className?: string;
}) => {
  const { required } = useContext(context);

  return (
    <label htmlFor={htmlFor} className={clsx(className)}>
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
};

const FieldsetDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={clsx(className)}>{children}</p>;

const FieldsetInput = ({ className, ...props }: InputProps) => (
  <Input className={className} {...props} />
);

const FieldsetTextarea = ({ className, ...props }: TextareaProps) => (
  <Textarea className={clsx(className)} {...props} />
);

const FieldsetError = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <div
    role="alert"
    className={clsx("text-red-500 text-xs -translate-y-2", className, {
      hidden: !children,
    })}
  >
    {children}
  </div>
);

const FieldsetCheckbox = ({ ...props }: CheckboxProps) => (
  <Checkbox {...props} />
);

const FieldsetRadio = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={clsx(className)}>{children}</div>;

const FieldsetButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <Button className={className} {...props}>
      {children}
    </Button>
  );
};

const Fieldset = {
  Root: FieldsetRoot,
  Label: FieldsetLabel,
  Description: FieldsetDescription,
  Radio: FieldsetRadio,
  Input: FieldsetInput,
  Checkbox: FieldsetCheckbox,
  Textarea: FieldsetTextarea,
  Button: FieldsetButton,
  Error: FieldsetError,
};

export default Fieldset;
