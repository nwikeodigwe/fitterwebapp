import Dropdown from "@/components/dropdown";
import { useContext } from "react";
import Context from "./context";

const Gender = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "Gender component must be use with a Filter Context Provider"
    );
  const { toggleFilter } = context;
  const gender = ["man", "woman"];
  return (
    <Dropdown.Root>
      <Dropdown.Trigger className="hover:underline">Gender</Dropdown.Trigger>
      <Dropdown.Content className="max-h-[300px] overflow-scroll no-scrollbar">
        <ul>
          {gender.map((gen) => (
            <li key={gen}>
              <button
                onClick={() => toggleFilter({ gender: gen })}
                className="hover:underline capitalize"
              >
                {gen}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default Gender;
