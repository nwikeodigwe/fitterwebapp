import { createContext, useContext, type ReactNode } from "react";
import Textarea, { type TextareaProps } from "@/components/textarea";
import Input, { type InputProps } from "@/components/input";
import Button, { type ButtonProps } from "@/components/button";
import clsx from "clsx";
import Checkbox, { type CheckboxProps } from "./checkbox";
import Autocomplete, { type AutocompleteProps } from "./autocomplete";
import type { MultiselectProps } from "./multiselect";
import Multiselect from "./multiselect";
import FileUpload, { type FileUploadProps } from "./fileupload";
import Select, { type SelectProps } from "@/components/select";

interface FieldsetProps {
  className?: string;
  children?: ReactNode;
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
  children: ReactNode;
  className?: string;
}) => <p className={clsx(className)}>{children}</p>;

const FieldsetInput = ({ ...props }: InputProps) => <Input {...props} />;

const FieldsetSelect = ({ ...props }: SelectProps) => <Select {...props} />;

const FieldsetAutocomplete = ({ ...props }: AutocompleteProps) => (
  <Autocomplete {...props} />
);

const FieldsetMultiselect = ({ ...props }: MultiselectProps) => (
  <Multiselect {...props} />
);

const FieldsetTextarea = ({ ...props }: TextareaProps) => (
  <Textarea {...props} />
);

const FieldsetFileupload = ({ ...props }: FileUploadProps) => (
  <FileUpload {...props} />
);

const FieldsetError = ({
  children,
  className,
}: {
  children?: ReactNode;
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
  children: ReactNode;
  className?: string;
}) => <div className={clsx(className)}>{children}</div>;

const FieldsetButton = ({ children, ...props }: ButtonProps) => {
  return <Button {...props}>{children}</Button>;
};

FieldsetRoot.displayName = "FieldsetRoot";
FieldsetLabel.displayName = "FieldsetLabel";
FieldsetDescription.displayName = "FieldsetDescription";
FieldsetRadio.displayName = "FieldsetRadio";
FieldsetInput.displayName = "FieldsetInput";
FieldsetSelect.displayName = "FieldsetSelect";
FieldsetAutocomplete.displayName = "FieldsetAutocomplete";
FieldsetMultiselect.displayName = "FieldsetMultiselect";
FieldsetFileupload.displayName = "FieldsetFileupload";
FieldsetCheckbox.displayName = "FieldsetCheckbox";
FieldsetTextarea.displayName = "FieldsetTextArea";
FieldsetButton.displayName = "FieldsetButton";
FieldsetError.displayName = "FieldsetError";

const Fieldset = {
  Root: FieldsetRoot,
  Label: FieldsetLabel,
  Description: FieldsetDescription,
  Radio: FieldsetRadio,
  Input: FieldsetInput,
  Select: FieldsetSelect,
  Autocomplete: FieldsetAutocomplete,
  Multiselect: FieldsetMultiselect,
  Fileupload: FieldsetFileupload,
  Checkbox: FieldsetCheckbox,
  Textarea: FieldsetTextarea,
  Button: FieldsetButton,
  Error: FieldsetError,
};
export default Fieldset;
