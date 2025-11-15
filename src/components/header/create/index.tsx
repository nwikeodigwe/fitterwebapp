import Item from "./items";
import Style from "./styles";
import Brand from "./brand";
import Collection from "./collection";
import { useState } from "react";
import Context, { initialState } from "./context";
import { DropdownMenu } from "radix-ui";
import { IoIosAdd } from "react-icons/io";

type Active = {
  item: boolean;
  style: boolean;
  brand: boolean;
  collection: boolean;
};

const Index = () => {
  const [active, setIsActive] = useState<Active>(initialState);

  return (
    <Context.Provider value={{ ...active, setIsActive }}>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="hover:underline transition-all ease-in-out duration-200 bg-black text-white size-7 flex items-center justify-center" aria-labelledby="Create">
            <IoIosAdd size={20} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="bg-white border p-2 mt-2 w-40 flex flex-col items-end gap-2 mr-5">
            <Item />
            <Style />
            <Brand />
            <Collection />
          </DropdownMenu.Content>
        </DropdownMenu.Root>
    </Context.Provider>
  );
};

export default Index;
