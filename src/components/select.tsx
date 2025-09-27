import clsx from "clsx";
import { Select } from "radix-ui";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type FieldsetSelectProps = React.ComponentProps<typeof Select.Root>;

interface Props extends FieldsetSelectProps {
  className?: string;
  placeholder?: string;
  options: string[];
}

const SelectRoot = ({ options, className, placeholder, ...props }: Props) => {
  return (
    <Select.Root {...props}>
      <Select.Trigger
        className={clsx(
          "p-3 flex items-center justify-between border border-gray-900 w-full",
          className
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <IoIosArrowDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="absolute top-0 right-0 left-0 overflow-hidden bg-white p-3 border border-gray-900">
          <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <IoIosArrowUp />
          </Select.ScrollUpButton>
          <Select.Viewport>
            <Select.Group className="space-y-2">
              {options.map((option, i) => (
                <Select.Item
                  key={i}
                  value={option
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^a-z0-9-]/g, "")}
                  className="cursor-pointer"
                >
                  <Select.ItemText>{option}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectRoot;
