import { Outlet } from "react-router";
import Side from "./side";
import Header from "./header";

const Index = () => {
  return (
    <div className="p-5 view-grid min-h-svh">
      <Header
        title="Items"
        description="New releases from Nike, Air Jordan, adidas, New Balance, ASICS and more. Discover all of the latest sneaker drops with our curated collection."
        count={10000}
        className="header"
      />
      <div className="left"></div>
      <Side />
      <Outlet />
    </div>
  );
};

export default Index;
