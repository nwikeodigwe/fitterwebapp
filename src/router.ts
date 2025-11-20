import { createBrowserRouter } from "react-router";
import Layout from "@/pages";
import Home from "@/pages/home";
import Logout from "@/pages/logout";
import NotFound from "@/pages/notfound";
import List from "@/pages/list";
import View from "@/pages/view";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: ":entity", Component: List },
      { path: ":entity/:slug", Component: View },
      { path: "logout", Component: Logout },
    ],
  },
  { path: "not-found", Component: NotFound },
  { path: "*", Component: NotFound },
]);

export default router;
