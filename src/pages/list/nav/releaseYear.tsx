import Dropdown from "@/components/dropdown";
import { useContext } from "react";
import Context from "./context";

const ReleaseYear = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "Gender component must be use with a Filter Context Provider"
    );
  const { toggleFilter } = context;
  const releaseYear = ["2021", "2022", "2023", "2024", "2025"];
  return (
    <Dropdown.Root open>
      <Dropdown.Trigger className="hover:underline">
        Release Year
      </Dropdown.Trigger>
      <Dropdown.Content className="max-h-[300px] overflow-scroll no-scrollbar">
        <ul className="grid grid-cols-4 gap-3 justify-end items-end mt-1">
          {releaseYear.map((year) => (
            <li key={year}>
              <div>
                <button
                  onClick={() => toggleFilter({ releaseYear: year })}
                  className="hover:underline"
                >
                  {year}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default ReleaseYear;
