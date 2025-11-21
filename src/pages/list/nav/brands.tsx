import Dropdown from "@/components/dropdown";
import Context from "./context";
import { useContext } from "react";
const brands = ["gucci", "tommy", "louis vuitton", "polo ralph"];
const Brands = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error(
      "Brand component must be used within the Filter Context Provider"
    );
  const { toggleFilter } = context || {};
  return (
    <Dropdown.Root open>
      <Dropdown.Trigger className="hover:underline">Brands</Dropdown.Trigger>
      <Dropdown.Content className="max-h-[300px] overflow-scroll no-scrollbar">
        <ul>
          {brands.map((brand) => (
            <li key={brand}>
              <button
                onClick={() => toggleFilter({ brand })}
                className="hover:underline capitalize"
              >
                {brand}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};

export default Brands;
