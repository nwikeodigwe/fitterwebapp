import { createBrowserRouter } from "react-router";
import Layout from "@/pages";
import Home from "@/pages/home";
import Items from "@/pages/views/items";
import Brands from "@/pages/views/brands";
import Styles from "@/pages/views/styles";
import Collections from "@/pages/views/collections";
import Views from "@/pages/views";
import Logout from "./pages/logout";
import NotFound from "./pages/notfound";

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
          {
            path: "brands",
            Component: Brands,
          },
          {
            path: "styles",
            Component: Styles,
          },
          {
            path: "collections",
            Component: Collections,
          },
        ],
      },
      { path: "/logout", Component: Logout },
    ],
  },
  { path: "*", Component: NotFound },
]);

export default router;
