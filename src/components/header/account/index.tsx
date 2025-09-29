import Login from "./login";
import Register from "./register";
import Location from "./preference";
import { useState } from "react";
import { AccountContext } from "./context";
import Reset from "./reset";

type Active = {
  login: boolean;
  register: boolean;
  reset: boolean;
  location: boolean;
};
const Index = () => {
  const [active, setIsActive] = useState<Active>({
    login: false,
    register: false,
    reset: false,
    location: false,
  });

  return (
    <AccountContext.Provider value={{ ...active, setIsActive }}>
      <div className="p-4 space-y-2 flex flex-col items-end">
        <Login />
        <Register />
        <Location />
        <Reset />
      </div>
    </AccountContext.Provider>
  );
};

export default Index;
