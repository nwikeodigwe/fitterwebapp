import { Outlet } from "react-router";
import Header from "@/components/header";
// import Footer from "@/components/footer";
import Toast from "@/components/toast";

const Layout = () => {
  return (
    <div className="max-h-[95vh] relative">
      <Header />
      <Outlet />
      {/* <Footer /> */}
      <Toast />
    </div>
  );
};

export default Layout;
