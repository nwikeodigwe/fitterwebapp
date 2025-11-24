import Dropdown from "@/components/dropdown";
import Context from "./context";
import { useContext } from "react";

const Tags = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "Tags component must be use with a Filter Context Provider"
    );
  const { toggleFilter } = context;
  const tags = [
    "home",
    "style",
    "luxury",
    "dinner",
    "lunch",
    "repair",
    "spicy",
  ];
  return (
    <Dropdown.Root>
      <Dropdown.Trigger className="hover:underline">Tags</Dropdown.Trigger>
      <Dropdown.Content className="max-h-[300px] overflow-scroll no-scrollbar">
        <ul className="grid grid-cols-4 justify-between mt-1">
          {tags.map((tag) => (
            <li key={tag}>
              <button onClick={() => toggleFilter({tags: tag})} className="hover:underline">{tag}</button>
            </li>
          ))}
        </ul>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default Tags;
