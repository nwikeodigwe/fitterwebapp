import { createBrowserRouter } from "react-router";
import Layout from "@/pages";
import Home from "@/pages/home";
import Items from "@/pages/views/items";
import Views from "@/pages/views";
import Logout from "./pages/logout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      {
        Component: Views,
        children: [
          {
            path: "items",
            Component: Items,
          },
        ],
      },
      { path: "/logout", Component: Logout },
    ],
  },
]);

export default router;
