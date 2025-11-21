import Dropdown from "@/components/dropdown";
import Context from "./context";
import { useContext } from "react";

type Color = "red" | "blue" | "green" | "yellow" | "amber" | "purple" | "cyan";
const colors = ["red", "green", "blue", "yellow", "amber", "purple", "cyan"];

const colorMap: Record<Color, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  amber: "bg-amber-500",
  purple: "bg-purple-500",
  cyan: "bg-cyan-500",
};

const Colors = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "Colors component must be used with a Filter context provider"
    );
  const { toggleFilter } = context;
  return (
    <Dropdown.Root open>
      <Dropdown.Trigger className="hover:underline">Color</Dropdown.Trigger>
      <Dropdown.Content className="max-h-[300px] overflow-scroll no-scrollbar">
        <ul className="">
          {colors.map((color) => (
            <li
              key={color}
              className="flex gap-2 justify-end items-center group"
            >
              <p className="capitalize hidden group-hover:inline-block duration-150 transition-all">
                {color}
              </p>
              <div>
                <button
                  onClick={() => toggleFilter({ color })}
                  className={`size-4 ${colorMap[color as Color]}`}
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default Colors;
