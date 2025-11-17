import Login from "./login";
import Register from "./register";
import Location from "./preference";
import { useState } from "react";
import Context from "./context";
import Reset from "./reset";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import clsx from "clsx";
import { Link } from "react-router";
import { DropdownMenu } from "radix-ui";
import { IoPersonOutline } from "react-icons/io5";

type Active = {
  login: boolean;
  register: boolean;
  reset: boolean;
  location: boolean;
};
const Index = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [active, setIsActive] = useState<Active>({
    login: false,
    register: false,
    reset: false,
    location: false,
  });

  return (
    <Context.Provider value={{ ...active, setIsActive }}>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          className="hover:underline transition-all ease-in-out duration-200 flex items-center justify-center"
          aria-labelledby="Create"
        >
          {isAuthenticated ? <IoPersonOutline size={20} /> : "Account"}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="bg-white border mt-2 w-40  gap-2 mr-5">
          <div
            className={clsx("flex flex-col items-end p-2", {
              hidden: isAuthenticated,
            })}
          >
            <Login />
            <Register />
            <Location />
            <Reset />
          </div>
          <div className={clsx("flex flex-col", { hidden: !isAuthenticated })}>
            <Link className="p-1 text-right" to="/dashboard">
              Dashboard
            </Link>
            <Link className="p-1 text-right" to="/dashboard/settings">
              Settings
            </Link>
            <Link className="p-1 text-right" to="/logout">
              Logout
            </Link>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Context.Provider>
  );
};

export default Index;
