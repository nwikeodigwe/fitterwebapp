import Login from "./login";
import Register from "./register";
import Location from "./Location";

const Index = () => {
  return (
    <div className="p-4 space-y-2 flex flex-col items-end">
      <Login />
      <Register />
      <Location />
    </div>
  );
};

export default Index;
