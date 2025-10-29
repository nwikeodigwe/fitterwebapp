import { Outlet } from "react-router";
import Header from "@/components/header";
import Footer from "@/components/footer";

const Layout = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
