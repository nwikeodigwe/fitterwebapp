import Login from "./login";
import Register from "./register";
import Location from "./preference";
import { useState } from "react";
import Context from "./context";
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
    <Context.Provider value={{ ...active, setIsActive }}>
      <div className="p-4 space-y-2 flex flex-col items-end z-50">
        <Login />
        <Register />
        <Location />
        <Reset />
      </div>
    </Context.Provider>
  );
};

export default Index;
