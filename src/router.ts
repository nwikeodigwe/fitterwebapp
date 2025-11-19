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
import Item from "./pages/views/view";
import Brand from "./pages/views/brands/view";
import Style from "./pages/views/styles/view";
import Collection from "./pages/views/collections/view";

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
            children: [{ index: true, Component: Items }],
          },
          {
            path: "brands",
            children: [{ index: true, Component: Brands }],
          },
          {
            path: "styles",
            children: [{ index: true, Component: Styles }],
          },
          {
            path: "collections",
            children: [{ index: true, Component: Collections }],
          },
        ],
      },
      { path: "items", children: [{ path: ":slug", Component: Item }] },
      { path: "brands", children: [{ path: ":slug", Component: Brand }] },
      { path: "styles", children: [{ path: ":slug", Component: Style }] },
      {
        path: "collection",
        children: [{ path: ":slug", Component: Collection }],
      },

      { path: "/logout", Component: Logout },
    ],
  },
  { path: "*", Component: NotFound },
]);

export default router;
