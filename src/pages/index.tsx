import { Outlet } from "react-router";
import Header from "@/components/header";
// import Footer from "@/components/footer";
import Toast from "@/components/toast";

const Layout = () => {
  return (
    <div className="min-h-screen relative">
      <Header />
      <Outlet />
      {/* <Footer /> */}
      <Toast />
    </div>
  );
};

export default Layout;
