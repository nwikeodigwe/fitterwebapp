import { createBrowserRouter } from "react-router";
import Layout from "@/pages";
import Home from "@/pages/home";
import Logout from "./pages/logout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "/logout", Component: Logout },
    ],
  },
]);

export default router;
