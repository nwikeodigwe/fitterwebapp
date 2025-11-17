import { Outlet } from "react-router";
import Side from "./side";

const Index = () => {
  return (
    <div className="p-5 view-grid h-svh">
      <Side />
      <Outlet />
    </div>
  );
};

export default Index;
